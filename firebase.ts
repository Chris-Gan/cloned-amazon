import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDODJ567sQPiLY78F61iR7BjJ6lmN1eKoA",
  authDomain: "amzon-cloned.firebaseapp.com",
  projectId: "amzon-cloned",
  storageBucket: "amzon-cloned.appspot.com",
  messagingSenderId: "585383306871",
  appId: "1:585383306871:web:837e45856718bf0df9c872",
  measurementId: "G-XYSZEG2VXQ",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
