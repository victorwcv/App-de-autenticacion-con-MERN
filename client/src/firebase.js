// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-b89f5.firebaseapp.com",
  projectId: "mern-auth-b89f5",
  storageBucket: "mern-auth-b89f5.appspot.com",
  messagingSenderId: "242507215528",
  appId: "1:242507215528:web:d455c524ae16695055089d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);