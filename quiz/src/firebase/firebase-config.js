// src/firebase/firebase-config.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyDJbDYcxuJZtZFR8HyJktspSxmD7P7ML9Y",
  authDomain: "quizdb-f291f.firebaseapp.com",
  projectId: "quizdb-f291f",
  storageBucket: "quizdb-f291f.appspot.com",
  messagingSenderId: "706870671617",
  appId: "1:706870671617:web:13ff39a4459d90615dc300",
  measurementId: "G-B5GMGMEV37"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };