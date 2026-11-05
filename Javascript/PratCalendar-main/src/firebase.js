import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// La teva configuració de Firebase (copia exactament de la consola)
const firebaseConfig = {
  apiKey: "AIzaSyAHox2QKRcgcIfX8sBUCi_i0bfKBGCn2jo",
  authDomain: "pratcalendar-7820f.firebaseapp.com",
  projectId: "pratcalendar-7820f",
  storageBucket: "pratcalendar-7820f.firebasestorage.app",
  messagingSenderId: "805437835761",
  appId: "1:805437835761:web:1a52f7aa7268a8f8ce9c50"
};

// Inicialitza Firebase
const app = initializeApp(firebaseConfig);

// Inicialitza els serveis i exporta'ls
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Opcional: per defecte, demana selecció de compte cada cop
googleProvider.setCustomParameters({ prompt: 'select_account' });