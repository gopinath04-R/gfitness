import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC-uOFzqB2u_luAy8e8iXaNUTYb3ibjrwM",
  authDomain: "gfitness-ec728.firebaseapp.com",
  projectId: "gfitness-ec728",
  storageBucket: "gfitness-ec728.firebasestorage.app",
  messagingSenderId: "410084236771",
  appId: "1:410084236771:web:914de3ba4e18b58b71d4d6",
  measurementId: "G-C03L3H1CY4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;