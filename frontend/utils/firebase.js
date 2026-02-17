//c Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, GoogleAuthProvider} from"firebase/auth"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY ,
  authDomain: "lms-website-3a667.firebaseapp.com",
  projectId: "lms-website-3a667",
  storageBucket:  "lms-website-3a667.firebasestorage.app",
  messagingSenderId: "23547911501",
  appId: "1:23547911501:web:c4b73d7b2bc23869ad2b04"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

 const auth = getAuth(app)
 const provider = new GoogleAuthProvider()

 export {auth,provider}