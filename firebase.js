// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDyjTYFGvcM7PM9D0O_IzEYG5bm2kgoGBY",
    authDomain: "stock-watchlist-pec.firebaseapp.com",
    projectId: "stock-watchlist-pec",
    storageBucket: "stock-watchlist-pec.appspot.com",
    messagingSenderId: "316148951749",
    appId: "1:316148951749:web:3fed8a95e649e78d605eac",
    measurementId: "G-BQMYPTRNNX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();

export { auth, db };