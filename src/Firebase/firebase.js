// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCE5f36iGdk-V5X9RYjspE_vriRTUzf9Ac",
  authDomain: "jakiplantreningowynadzisiaj.firebaseapp.com",
  projectId: "jakiplantreningowynadzisiaj",
  storageBucket: "jakiplantreningowynadzisiaj.appspot.com",
  messagingSenderId: "166602837836",
  appId: "1:166602837836:web:96194c2f418fcb749c09e9",
  databaseURL:
    "https://jakiplantreningowynadzisiaj-default-rtdb.europe-west1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
export {app, db}