import 'package:firebase_auth/firebase_auth.dart';

class AuthService {
  final FirebaseAuth _auth = FirebaseAuth.instance;

  // Registre amb email i contrasenya
  Future<UserCredential> registrar(String email, String contrasenya) async {
    return await _auth.createUserWithEmailAndPassword(
      email: email,
      password: contrasenya,
    );
  }

  // Login amb email i contrasenya
  Future<UserCredential> login(String email, String contrasenya) async {
    return await _auth.signInWithEmailAndPassword(
      email: email,
      password: contrasenya,
    );
  }

  // Tancar sessió
  Future<void> logout() async {
    await _auth.signOut();
  }
}
