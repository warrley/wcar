import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyClzxHnL-AUqqUVXunyhNDZbvG3Zh2u8GU",
  authDomain: "wcar-e54f8.firebaseapp.com",
  projectId: "wcar-e54f8",
  storageBucket: "wcar-e54f8.firebasestorage.app",
  messagingSenderId: "275429376353",
  appId: "1:275429376353:web:ebc4b87f82131fa7a40520"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { auth, db, storage };