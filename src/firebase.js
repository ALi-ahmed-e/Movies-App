import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDCIwrtOanS3wlWVeYflDhOx87S3tAVvVQ",
    authDomain: "messaging-9afce.firebaseapp.com",
    projectId: "messaging-9afce",
    storageBucket: "messaging-9afce.appspot.com",
    messagingSenderId: "370513243737",
    appId: "1:370513243737:web:a385662e51f7bcbefc0b48"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);