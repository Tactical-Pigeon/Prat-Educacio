import 'package:flutter/material.dart';
import 'screens/start_screen.dart';

void main() => runApp(const PokemonBattleApp());

class PokemonBattleApp extends StatelessWidget {
  const PokemonBattleApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Pokémon Battle',
      theme: ThemeData.dark(),
      home: const StartScreen(),
      debugShowCheckedModeBanner: false,
    );
  }
}