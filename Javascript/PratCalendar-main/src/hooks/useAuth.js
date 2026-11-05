// src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

export const useAuth = () => {
  const [usuari, establirUsuari] = useState(null);
  const [carregant, establirCarregant] = useState(true);
  const [error, establirError] = useState(null);

  // Escuchar cambios en el estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Usuario autenticado
        establirUsuari({
          id: user.uid,
          nom: user.displayName,
          email: user.email,
          avatar: user.photoURL,
        });
      } else {
        // Usuario no autenticado
        establirUsuari(null);
      }
      establirCarregant(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  // Función para iniciar sesión con Google
  const accedirAmbGoogle = async () => {
    try {
      establirError(null);
      const result = await signInWithPopup(auth, googleProvider);
      // El estado del usuario se actualizará automáticamente por onAuthStateChanged
      return result.user;
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error);
      establirError(error.message);
      throw error;
    }
  };

  // Función para cerrar sesión
  const tancarSessio = async () => {
    try {
      establirError(null);
      await signOut(auth);
      // El estado del usuario se actualizará automáticamente por onAuthStateChanged
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      establirError(error.message);
      throw error;
    }
  };

  return {
    usuari,
    carregant,
    error,
    accedirAmbGoogle,
    tancarSessio,
  };
};
