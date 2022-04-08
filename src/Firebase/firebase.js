// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCE5f36iGdk-V5X9RYjspE_vriRTUzf9Ac",
    authDomain: "jakiplantreningowynadzisiaj.firebaseapp.com",
    projectId: "jakiplantreningowynadzisiaj",
    storageBucket: "jakiplantreningowynadzisiaj.appspot.com",
    messagingSenderId: "166602837836",
    appId: "1:166602837836:web:96194c2f418fcb749c09e9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
export {app, db}