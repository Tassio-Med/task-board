import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAYFyS1VujDS1gWZSPqSApfY8sTGBcTYBE",
  authDomain: "tarefasplus-9ef86.firebaseapp.com",
  projectId: "tarefasplus-9ef86",
  storageBucket: "tarefasplus-9ef86.appspot.com",
  messagingSenderId: "355155019174",
  appId: "1:355155019174:web:073de7b5cc62261bf9bb67"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export { db };