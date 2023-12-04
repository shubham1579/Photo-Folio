import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBMg1P7epg7gE_zq2E7BYTRnn2uzlYZsjM",
  authDomain: "photo-folio-61d38.firebaseapp.com",
  projectId: "photo-folio-61d38",
  storageBucket: "photo-folio-61d38.appspot.com",
  messagingSenderId: "507684377852",
  appId: "1:507684377852:web:c30d11d9f57dd4cd823379"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

export { db, auth }