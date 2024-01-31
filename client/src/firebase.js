// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-blog-533fe.firebaseapp.com",
    projectId: "mern-blog-533fe",
    storageBucket: "mern-blog-533fe.appspot.com",
    messagingSenderId: "528765572565",
    appId: "1:528765572565:web:abe7e7c926b914728c595c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);