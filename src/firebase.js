// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIdvMOb3mTWxlbPRhHgXNsRSRRHsqKoOA",
  authDomain: "catering-8fc58.firebaseapp.com",
  projectId: "catering-8fc58",
  storageBucket: "catering-8fc58.appspot.com",
  messagingSenderId: "423794831983",
  appId: "1:423794831983:web:451d2df9c15791a278539a",
  measurementId: "G-NFR2HHQ9X3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
