import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDo1eLY9-qJheuYwrcvp7pnnul-P7zyBLs",
  authDomain: "todos-46a7e.firebaseapp.com",
  projectId: "todos-46a7e",
  storageBucket: "todos-46a7e.firebasestorage.app",
  messagingSenderId: "513156864328",
  appId: "1:513156864328:web:f68fb57764c59f84a2bb7d",
  measurementId: "G-RV3P3ZHL67"
};

  

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const tasksCollection = collection(db, "tasks");

export { db, tasksCollection, getDocs, addDoc, updateDoc, doc, deleteDoc };
