import 'package:flutter/material.dart';
import '../services/auth_service.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final AuthService _auth = AuthService();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  bool _isLoginMode = true; // true = login, false = registre
  String _errorMessage = '';

  void _submit() async {
    setState(() => _errorMessage = ''); // netejar error anterior

    final email = _emailController.text.trim();
    final password = _passwordController.text.trim();

    // Validació bàsica
    if (email.isEmpty || password.isEmpty) {
      setState(() => _errorMessage = 'Tots els camps són obligatoris');
      return;
    }
    if (!email.contains('@') || !email.contains('.')) {
      setState(() => _errorMessage = 'Introdueix un email vàlid');
      return;
    }
    if (password.length < 6) {
      setState(() => _errorMessage = 'La contrasenya ha de tenir mínim 6 caràcters');
      return;
    }

    try {
      if (_isLoginMode) {
        await _auth.login(email, password);
      } else {
        await _auth.registrar(email, password);
      }
    } catch (e) {
      String missatge = 'Error desconegut';
      if (e.toString().contains('email-already-in-use')) {
        missatge = 'Ja existeix un compte amb aquest email';
      } else if (e.toString().contains('user-not-found')) {
        missatge = 'No s\'ha trobat cap usuari amb aquest email';
      } else if (e.toString().contains('wrong-password')) {
        missatge = 'Contrasenya incorrecta';
      } else if (e.toString().contains('weak-password')) {
        missatge = 'La contrasenya és massa feble (mínim 6 caràcters)';
      } else if (e.toString().contains('network-request-failed')) {
        missatge = 'Sense connexió a Internet';
      }
      setState(() => _errorMessage = missatge);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('TodoFire Auth')),
      body: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            TextField(
              controller: _emailController,
              decoration: const InputDecoration(
                labelText: 'Correu electrònic',
                border: OutlineInputBorder(),
              ),
              keyboardType: TextInputType.emailAddress,
            ),
            const SizedBox(height: 16),
            TextField(
              controller: _passwordController,
              decoration: const InputDecoration(
                labelText: 'Contrasenya',
                border: OutlineInputBorder(),
              ),
              obscureText: true,
            ),
            const SizedBox(height: 24),
            if (_errorMessage.isNotEmpty)
              Padding(
                padding: const EdgeInsets.only(bottom: 12),
                child: Text(
                  _errorMessage,
                  style: const TextStyle(color: Colors.red),
                ),
              ),
            ElevatedButton(
              onPressed: _submit,
              child: Text(_isLoginMode ? 'Entrar' : 'Crear compte'),
            ),
            TextButton(
              onPressed: () {
                setState(() {
                  _isLoginMode = !_isLoginMode;
                  _errorMessage = '';
                });
              },
              child: Text(_isLoginMode
                  ? 'No tens compte? Crea\'n un'
                  : 'Ja tens compte? Inicia sessió'),
            ),
          ],
        ),
      ),
    );
  }
}