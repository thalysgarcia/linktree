
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBBx9s7sUIw0EapTgymlUIhdZTSvlh9wt4",
  authDomain: "cursofullstack---firebase.firebaseapp.com",
  projectId: "cursofullstack---firebase",
  storageBucket: "cursofullstack---firebase.firebasestorage.app",
  messagingSenderId: "135928716831",
  appId: "1:135928716831:web:290dfca5933f7ee3f73f2a",
  measurementId: "G-7S26X8XK65",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth,db}