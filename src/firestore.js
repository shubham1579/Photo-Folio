// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMg1P7epg7gE_zq2E7BYTRnn2uzlYZsjM",
  authDomain: "photo-folio-61d38.firebaseapp.com",
  projectId: "photo-folio-61d38",
  storageBucket: "photo-folio-61d38.appspot.com",
  messagingSenderId: "507684377852",
  appId: "1:507684377852:web:c30d11d9f57dd4cd823379"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);