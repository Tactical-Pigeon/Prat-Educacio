import 'package:flutter/material.dart';
import '../models/pokemon.dart';
import 'start_screen.dart';
import 'battle_screen.dart';

class EndScreen extends StatelessWidget {
  final String winnerName;
  final int totalAttacks;
  final Duration duration;
  // Advanced statistics (optional, for Extension 6)
  final int playerDamage;
  final int opponentDamage;
  final int playerPPUsed;
  final int opponentPPUsed;
  final Map<String, int> moveUsage;

  const EndScreen({
    required this.winnerName,
    required this.totalAttacks,
    required this.duration,
    this.playerDamage = 0,
    this.opponentDamage = 0,
    this.playerPPUsed = 0,
    this.opponentPPUsed = 0,
    this.moveUsage = const {},
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Battle Over')),
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                '$winnerName WINS!',
                style: const TextStyle(fontSize: 28, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 20),
              Text('Total attacks: $totalAttacks'),
              Text('Battle duration: ${duration.inSeconds} seconds'),
              const SizedBox(height: 20),
              // Advanced stats (only if provided)
              if (playerDamage > 0 || opponentDamage > 0) ...[
                const Text('--- Detailed Stats ---', style: TextStyle(fontWeight: FontWeight.bold)),
                Text('Player damage dealt: $playerDamage'),
                Text('Opponent damage dealt: $opponentDamage'),
                Text('Player PP used: $playerPPUsed'),
                Text('Opponent PP used: $opponentPPUsed'),
                if (moveUsage.isNotEmpty) ...[
                  const Text('Move usage:', style: TextStyle(fontWeight: FontWeight.bold)),
                  ...moveUsage.entries.map((e) => Text('  ${e.key}: ${e.value}')),
                ],
                const SizedBox(height: 20),
              ],
              ElevatedButton(
                onPressed: () {
                  Navigator.pushReplacement(
                    context,
                    MaterialPageRoute(
                      builder: (context) => BattleScreen(
                        playerPokemon: Pokemon(name: 'Pikachu', maxHp: 120, maxPp: 30),
                        opponentPokemon: Pokemon(name: 'Charmander', maxHp: 120, maxPp: 30),
                      ),
                    ),
                  );
                },
                child: const Text('New Battle'),
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: () {
                  Navigator.pushAndRemoveUntil(
                    context,
                    MaterialPageRoute(builder: (context) => const StartScreen()),
                    (route) => false,
                  );
                },
                child: const Text('Back to Start'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}