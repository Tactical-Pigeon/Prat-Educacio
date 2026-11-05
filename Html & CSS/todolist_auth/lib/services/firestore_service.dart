import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';

class FirestoreService {
  final FirebaseFirestore _db = FirebaseFirestore.instance;

  // Obtenim la referència a la col·lecció de l'usuari actual
  CollectionReference get _colleccio {
    final uid = FirebaseAuth.instance.currentUser!.uid;
    return _db
      .collection('usuaris')
      .doc(uid)
      .collection('tasques');
  }

  // READ: Stream de tasques en temps real
  Stream<QuerySnapshot>? obtenirTasques() {
    return _colleccio
      .orderBy('dataCreacio', descending: true)
      .snapshots();
  }

  // CREATE: Afegir una tasca nova
  Future<void> afegirTasca(String titol) async {
    await _colleccio.add({
      'titol': titol,
      'estaCompletada': false,
      'dataCreacio': FieldValue.serverTimestamp(),
    });
  }

  // UPDATE: Canviar l'estat de completada
  Future<void> canviarEstat(
    String idDoc, bool estatActual) async {
    await _colleccio.doc(idDoc).update({
      'estaCompletada': !estatActual,
    });
  }

  // DELETE: Esborrar una tasca
  Future<void> esborrarTasca(String idDoc) async {
    await _colleccio.doc(idDoc).delete();
  }
}
