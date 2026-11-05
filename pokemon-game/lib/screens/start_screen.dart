import 'dart:io';
import 'package:flutter/material.dart';
import '../models/pokemon.dart';
import 'battle_screen.dart';

class StartScreen extends StatefulWidget {
  const StartScreen({Key? key}) : super(key: key);

  @override
  State<StartScreen> createState() => _StartScreenState();
}

class _StartScreenState extends State<StartScreen> {
  // Predefined Pokémon list
  final List<Pokemon> availablePokemon = [
    Pokemon(name: 'Pikachu', maxHp: 120, maxPp: 35),
    Pokemon(name: 'Charmander', maxHp: 110, maxPp: 30),
    Pokemon(name: 'Bulbasaur', maxHp: 130, maxPp: 32),
    Pokemon(name: 'Squirtle', maxHp: 125, maxPp: 34),
    Pokemon(name: 'Eevee', maxHp: 115, maxPp: 40),
  ];

  Pokemon? selectedPlayerPokemon;
  Pokemon? selectedOpponentPokemon;

  @override
  void initState() {
    super.initState();
    // Set default selections
    selectedPlayerPokemon = availablePokemon[0];
    selectedOpponentPokemon = availablePokemon[1];
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
            colors: [Colors.orange, Colors.red],
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
          ),
        ),
        child: Center(
          child: Card(
            margin: const EdgeInsets.all(20),
            elevation: 8,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(20),
            ),
            child: Padding(
              padding: const EdgeInsets.all(24.0),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const Text(
                    'POKÉMON BATTLE',
                    style: TextStyle(
                      fontSize: 28,
                      fontWeight: FontWeight.bold,
                      letterSpacing: 2,
                    ),
                  ),
                  const SizedBox(height: 30),
                  // Player selection
                  const Text(
                    'Choose your Pokémon:',
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600),
                  ),
                  const SizedBox(height: 8),
                  DropdownButton<Pokemon>(
                    value: selectedPlayerPokemon,
                    items: availablePokemon.map((pokemon) {
                      return DropdownMenuItem<Pokemon>(
                        value: pokemon,
                        child: Text(
                          '${pokemon.name} (HP: ${pokemon.maxHp}, PP: ${pokemon.maxPp})',
                        ),
                      );
                    }).toList(),
                    onChanged: (Pokemon? newValue) {
                      setState(() {
                        selectedPlayerPokemon = newValue;
                      });
                    },
                  ),
                  const SizedBox(height: 20),
                  // Opponent selection
                  const Text(
                    'Choose opponent Pokémon:',
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600),
                  ),
                  const SizedBox(height: 8),
                  DropdownButton<Pokemon>(
                    value: selectedOpponentPokemon,
                    items: availablePokemon.map((pokemon) {
                      return DropdownMenuItem<Pokemon>(
                        value: pokemon,
                        child: Text(
                          '${pokemon.name} (HP: ${pokemon.maxHp}, PP: ${pokemon.maxPp})',
                        ),
                      );
                    }).toList(),
                    onChanged: (Pokemon? newValue) {
                      setState(() {
                        selectedOpponentPokemon = newValue;
                      });
                    },
                  ),
                  const SizedBox(height: 30),
                  ElevatedButton(
                    onPressed: () {
                      if (selectedPlayerPokemon != null &&
                          selectedOpponentPokemon != null) {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => BattleScreen(
                              playerPokemon: selectedPlayerPokemon!,
                              opponentPokemon: selectedOpponentPokemon!,
                            ),
                          ),
                        );
                      }
                    },
                    style: ElevatedButton.styleFrom(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 40,
                        vertical: 15,
                      ),
                    ),
                    child: const Text(
                      'Start Battle',
                      style: TextStyle(fontSize: 20),
                    ),
                  ),
                  const SizedBox(height: 20),
                  ElevatedButton(
                    onPressed: () => _showExitDialog(context),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.grey,
                    ),
                    child: const Text('Exit'),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  void _showExitDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Exit Game'),
        content: const Text('Do you really want to exit?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: const Text('No'),
          ),
          TextButton(
            onPressed: () {
              exit(0);
            },
            child: const Text('Yes'),
          ),
        ],
      ),
    );
  }
}