// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: import.meta.env.API_KEY,
  apiKey: "AIzaSyCCAh3BiEBPQ9swoRVbW3AeJbIZnLI5fd8",
  authDomain: "rehaish-e0db9.firebaseapp.com",
  projectId: "rehaish-e0db9",
  storageBucket: "rehaish-e0db9.appspot.com",
  messagingSenderId: "943952615944",
  appId: "1:943952615944:web:4a387aeacf7f02c82c8fbd"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);