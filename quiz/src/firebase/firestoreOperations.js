// firestoreOperations.js

import { db } from './firebase-config'; // Correct path based on your project structure
import { 
    collection, 
    addDoc, 
    getDocs, 
    query, 
    orderBy, 
    limit 
} from "firebase/firestore";

const addScoreToFirestore = async (userName, score, date) => {
  try {
    const docRef = await addDoc(collection(db, "scoreboard"), {
      userName,
      score,
      date: date || new Date().toISOString()
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const getTopScoresFromFirestore = async () => {
  const scoresRef = collection(db, "scoreboard");
  const q = query(scoresRef, orderBy("score", "desc"), limit(10));
  const querySnapshot = await getDocs(q);
  const scores = [];
  querySnapshot.forEach((doc) => {
    // Ensure the data structure here matches how you're using it when displaying scores
	const data = doc.data();
    // Convert the timestamp to a JavaScript Date object
    const date = data.date ? new Date(data.date.seconds * 1000) : new Date();
    // Or, convert to a readable string format, e.g., "YYYY-MM-DD"
    const dateString = date.toISOString().split('T')[0];
    scores.push({ ...data, date: dateString });
  });
  return scores;
};

export { addScoreToFirestore, getTopScoresFromFirestore };
