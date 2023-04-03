// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{getAuth, GoogleAuthProvider} from 'firebase/auth';
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCD8ZJgmwqIkI2wuLGkjX_EKztxPAYeG_I",
  authDomain: "solo-b530a.firebaseapp.com",
  projectId: "solo-b530a",
  storageBucket: "solo-b530a.appspot.com",
  messagingSenderId: "653927440769",
  appId: "1:653927440769:web:c9d7b7d54701b942264880",
  measurementId: "G-3SZ2X3ET5E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const database = getFirestore(app);
