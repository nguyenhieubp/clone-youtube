import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAMXm74VL2577JXvJJfK9KiGPHZi0GFErQ",
  authDomain: "youtobeclo.firebaseapp.com",
  projectId: "youtobeclo",
  storageBucket: "youtobeclo.appspot.com",
  messagingSenderId: "1088650654341",
  appId: "1:1088650654341:web:e2fd3ce45cf728768cefec",
  measurementId: "G-C4DM011EC7",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
