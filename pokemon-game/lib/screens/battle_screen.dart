// lib/screens/battle_screen.dart
import 'dart:math';
import 'package:flutter/material.dart';
import '../models/pokemon.dart';
import 'end_screen.dart';

class BattleScreen extends StatefulWidget {
  final Pokemon playerPokemon;
  final Pokemon opponentPokemon;

  const BattleScreen({
    required this.playerPokemon,
    required this.opponentPokemon,
    Key? key,
  }) : super(key: key);

  @override
  State<BattleScreen> createState() => _BattleScreenState();
}

class _BattleScreenState extends State<BattleScreen> {
  late Pokemon player;
  late Pokemon opponent;
  late bool isPlayerTurn;
  late int totalAttacks;

  // Statistics for the end screen
  int playerDamageDealt = 0;
  int opponentDamageDealt = 0;
  int playerPPUsed = 0;
  int opponentPPUsed = 0;
  Map<String, int> moveUsageCount = {
    'Quick Attack': 0,
    'Normal Attack': 0,
    'Strong Attack': 0,
    'Heal': 0,
  };

  // Move history (last 5)
  List<String> moveHistory = [];

  // Flash effect
  bool playerFlash = false;
  bool opponentFlash = false;

  late DateTime battleStartTime;
  final Random rng = Random();

  @override
  void initState() {
    super.initState();
    player = widget.playerPokemon;
    opponent = widget.opponentPokemon;
    isPlayerTurn = true;
    totalAttacks = 0;
    battleStartTime = DateTime.now();
  }

  void showBattleMessage(String msg) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(msg), duration: const Duration(seconds: 1)),
    );
  }

  void addToHistory(String entry) {
    setState(() {
      moveHistory.insert(0, entry);
      if (moveHistory.length > 5) moveHistory.removeLast();
    });
  }

  void triggerFlash(bool isPlayer) {
    setState(() {
      if (isPlayer)
        playerFlash = true;
      else
        opponentFlash = true;
    });
    Future.delayed(const Duration(milliseconds: 150), () {
      setState(() {
        if (isPlayer)
          playerFlash = false;
        else
          opponentFlash = false;
      });
    });
  }

  void performAttack({
    required Pokemon attacker,
    required Pokemon defender,
    required String moveName,
    required int ppCost,
    required int minDamage,
    required int maxDamage,
    bool isHeal = false,
    int healAmount = 0,
  }) {
    if (!attacker.canUseMove(ppCost)) {
      showBattleMessage('${attacker.name} has no PP for $moveName!');
      return;
    }

    // Miss chance (5%)
    bool isMiss = rng.nextDouble() < 0.05;
    if (isMiss) {
      addToHistory('${attacker.name} tried $moveName but missed!');
      showBattleMessage('Attack missed! No PP consumed.');
      if (attacker == player && !opponent.isFainted) {
        _switchToOpponentTurn();
      } else if (attacker == opponent && !player.isFainted) {
        _switchToPlayerTurn();
      }
      return;
    }

    // Consume PP
    attacker.usePp(ppCost);
    if (attacker == player) {
      playerPPUsed += ppCost;
    } else {
      opponentPPUsed += ppCost;
    }

    // Healing move
    if (isHeal) {
      int oldHp = attacker.hp;
      attacker.heal(healAmount);
      int healed = attacker.hp - oldHp;
      addToHistory('${attacker.name} used $moveName and healed $healed HP!');
      showBattleMessage('${attacker.name} healed $healed HP!');
      moveUsageCount[moveName] = (moveUsageCount[moveName] ?? 0) + 1;
      setState(() {});
      if (attacker == player && !opponent.isFainted) {
        _switchToOpponentTurn();
      } else if (attacker == opponent && !player.isFainted) {
        _switchToPlayerTurn();
      }
      return;
    }

    // Normal attack
    int baseDamage = minDamage + rng.nextInt(maxDamage - minDamage + 1);
    bool isCritical = rng.nextDouble() < 0.1;
    int finalDamage = isCritical ? baseDamage * 2 : baseDamage;

    defender.takeDamage(finalDamage);
    if (attacker == player) {
      playerDamageDealt += finalDamage;
    } else {
      opponentDamageDealt += finalDamage;
    }

    totalAttacks++;
    moveUsageCount[moveName] = (moveUsageCount[moveName] ?? 0) + 1;
    triggerFlash(defender == player);

    String criticalText = isCritical ? ' Critical hit!' : '';
    addToHistory(
        '${attacker.name} used $moveName and dealt $finalDamage damage.$criticalText');
    showBattleMessage(
        '${attacker.name} used $moveName! Damage: $finalDamage$criticalText');

    setState(() {});

    if (defender.isFainted) {
      checkBattleEnd();
      return;
    }

    if (attacker == player && !opponent.isFainted) {
      _switchToOpponentTurn();
    } else if (attacker == opponent && !player.isFainted) {
      _switchToPlayerTurn();
    }
  }

  void _switchToOpponentTurn() {
    isPlayerTurn = false;
    setState(() {});
    Future.delayed(const Duration(seconds: 1), () {
      if (!player.isFainted && !opponent.isFainted && !isPlayerTurn) {
        opponentAI();
      }
    });
  }

  void _switchToPlayerTurn() {
    isPlayerTurn = true;
    setState(() {});
  }

  void opponentAI() {
    if (isPlayerTurn) return;
    if (player.isFainted || opponent.isFainted) return;

    List<Map<String, dynamic>> moves = [
      {'name': 'Quick Attack', 'cost': 5, 'minDmg': 10, 'maxDmg': 15, 'heal': false},
      {'name': 'Normal Attack', 'cost': 10, 'minDmg': 20, 'maxDmg': 25, 'heal': false},
      {'name': 'Strong Attack', 'cost': 20, 'minDmg': 35, 'maxDmg': 45, 'heal': false},
    ];

    bool shouldHeal = opponent.hp < opponent.maxHp * 0.5 && opponent.canUseMove(15);
    if (shouldHeal) {
      moves.add({'name': 'Heal', 'cost': 15, 'heal': true, 'amount': 25});
    }

    List<Map<String, dynamic>> affordableMoves =
        moves.where((move) => opponent.canUseMove(move['cost'])).toList();

    if (affordableMoves.isEmpty) {
      showBattleMessage('${opponent.name} has no usable moves!');
      _switchToPlayerTurn();
      return;
    }

    var chosen = affordableMoves[rng.nextInt(affordableMoves.length)];

    if (chosen['heal'] == true) {
      performAttack(
        attacker: opponent,
        defender: player,
        moveName: chosen['name'],
        ppCost: chosen['cost'],
        minDamage: 0,
        maxDamage: 0,
        isHeal: true,
        healAmount: chosen['amount'],
      );
    } else {
      performAttack(
        attacker: opponent,
        defender: player,
        moveName: chosen['name'],
        ppCost: chosen['cost'],
        minDamage: chosen['minDmg'],
        maxDamage: chosen['maxDmg'],
      );
    }
  }

  void playerQuickAttack() {
    if (!isPlayerTurn) return;
    performAttack(
      attacker: player,
      defender: opponent,
      moveName: 'Quick Attack',
      ppCost: 5,
      minDamage: 10,
      maxDamage: 15,
    );
  }

  void playerNormalAttack() {
    if (!isPlayerTurn) return;
    performAttack(
      attacker: player,
      defender: opponent,
      moveName: 'Normal Attack',
      ppCost: 10,
      minDamage: 20,
      maxDamage: 25,
    );
  }

  void playerStrongAttack() {
    if (!isPlayerTurn) return;
    performAttack(
      attacker: player,
      defender: opponent,
      moveName: 'Strong Attack',
      ppCost: 20,
      minDamage: 35,
      maxDamage: 45,
    );
  }

  void playerHeal() {
    if (!isPlayerTurn) return;
    performAttack(
      attacker: player,
      defender: opponent,
      moveName: 'Heal',
      ppCost: 15,
      minDamage: 0,
      maxDamage: 0,
      isHeal: true,
      healAmount: 25,
    );
  }

  void checkBattleEnd() {
    if (player.isFainted) {
      _endBattle(winner: opponent.name);
    } else if (opponent.isFainted) {
      _endBattle(winner: player.name);
    }
  }

  void _endBattle({required String winner}) {
    final duration = DateTime.now().difference(battleStartTime);
    Navigator.pushReplacement(
      context,
      MaterialPageRoute(
        builder: (context) => EndScreen(
          winnerName: winner,
          totalAttacks: totalAttacks,
          duration: duration,
          playerDamage: playerDamageDealt,
          opponentDamage: opponentDamageDealt,
          playerPPUsed: playerPPUsed,
          opponentPPUsed: opponentPPUsed,
          moveUsage: moveUsageCount,
        ),
      ),
    );
  }

  // Helper to get image path for a Pokémon (player or enemy)
  String _getImagePath(Pokemon pokemon, bool isPlayer) {
    final folder = isPlayer ? 'player' : 'enemy';
    return 'assets/images/$folder/${pokemon.name}.gif';
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Pokémon Battle'),
        backgroundColor: Colors.redAccent,
      ),
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [Colors.white, Colors.grey],
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
          ),
        ),
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            children: [
              // Opponent card
              AnimatedOpacity(
                opacity: opponentFlash ? 0.5 : 1.0,
                duration: const Duration(milliseconds: 100),
                child: _buildPokemonCard(opponent, isPlayer: false),
              ),
              const SizedBox(height: 20),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 8),
                decoration: BoxDecoration(
                  color: isPlayerTurn ? Colors.green : Colors.orange,
                  borderRadius: BorderRadius.circular(30),
                ),
                child: Text(
                  isPlayerTurn ? 'YOUR TURN' : 'OPPONENT TURN',
                  style: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                ),
              ),
              const SizedBox(height: 20),
              AnimatedOpacity(
                opacity: playerFlash ? 0.5 : 1.0,
                duration: const Duration(milliseconds: 100),
                child: _buildPokemonCard(player, isPlayer: true),
              ),
              const SizedBox(height: 20),
              if (isPlayerTurn && !player.isFainted)
                _buildMoveButtons()
              else if (!isPlayerTurn && !player.isFainted)
                const Padding(
                  padding: EdgeInsets.all(16.0),
                  child: Text('Opponent is thinking...',
                      style: TextStyle(fontStyle: FontStyle.italic)),
                ),
              const SizedBox(height: 10),
              _buildMoveHistory(),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildPokemonCard(Pokemon pokemon, {required bool isPlayer}) {
    return Card(
      elevation: 8,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Row(
          children: [
            // Pokémon image from local assets
            Image.asset(
              _getImagePath(pokemon, isPlayer),
              width: 80,
              height: 80,
              errorBuilder: (context, error, stackTrace) =>
                  const Icon(Icons.catching_pokemon, size: 80),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    pokemon.name,
                    style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 8),
                  Text('HP: ${pokemon.hp}/${pokemon.maxHp}'),
                  LinearProgressIndicator(
                    value: pokemon.hp / pokemon.maxHp,
                    backgroundColor: Colors.grey[300],
                    color: pokemon.hp < pokemon.maxHp * 0.3 ? Colors.red : Colors.green,
                    minHeight: 10,
                  ),
                  const SizedBox(height: 8),
                  Text('PP: ${pokemon.pp}/${pokemon.maxPp}'),
                  LinearProgressIndicator(
                    value: pokemon.pp / pokemon.maxPp,
                    backgroundColor: Colors.grey[300],
                    color: Colors.blue,
                    minHeight: 10,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildMoveButtons() {
    return Column(
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            _moveButton('Quick Attack', 5, player.canUseMove(5)),
            _moveButton('Normal Attack', 10, player.canUseMove(10)),
          ],
        ),
        const SizedBox(height: 12),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            _moveButton('Strong Attack', 20, player.canUseMove(20)),
            _moveButton('Heal', 15, player.canUseMove(15)),
          ],
        ),
      ],
    );
  }

  Widget _moveButton(String text, int ppCost, bool canUse) {
    return ElevatedButton.icon(
      onPressed: canUse
          ? () {
              switch (text) {
                case 'Quick Attack':
                  playerQuickAttack();
                  break;
                case 'Normal Attack':
                  playerNormalAttack();
                  break;
                case 'Strong Attack':
                  playerStrongAttack();
                  break;
                case 'Heal':
                  playerHeal();
                  break;
              }
            }
          : null,
      icon: Icon(canUse ? Icons.flash_on : Icons.block),
      label: Column(
        children: [
          Text(text),
          Text('$ppCost PP', style: const TextStyle(fontSize: 10)),
        ],
      ),
      style: ElevatedButton.styleFrom(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      ),
    );
  }

  Widget _buildMoveHistory() {
    if (moveHistory.isEmpty) {
      return const SizedBox.shrink();
    }
    return Container(
      height: 140,
      decoration: BoxDecoration(
        color: Colors.black26,
        borderRadius: BorderRadius.circular(12),
      ),
      child: ListView.builder(
        itemCount: moveHistory.length,
        itemBuilder: (ctx, index) {
          return ListTile(
            title: Text(moveHistory[index]),
            leading: const Icon(Icons.history, size: 18),
            dense: true,
          );
        },
      ),
    );
  }
}