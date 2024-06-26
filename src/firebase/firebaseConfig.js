import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDA2aifEy-pzgAignAwkq6Hgu-mTxSo-Nw",
    authDomain: "book-finder-84f0c.firebaseapp.com",
    projectId: "book-finder-84f0c",
    storageBucket: "book-finder-84f0c.appspot.com",
    messagingSenderId: "819383606835",
    appId: "1:819383606835:web:e92d3ea9ec4af39c064d46"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };