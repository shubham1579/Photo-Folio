// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzzMnzcvH7G6JjQHfqIeoRgdDSj9F7HmA",
  authDomain: "photofolio-a07a7.firebaseapp.com",
  projectId: "photofolio-a07a7",
  storageBucket: "photofolio-a07a7.appspot.com",
  messagingSenderId: "670197422152",
  appId: "1:670197422152:web:0a881d344f1b889297e07d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);