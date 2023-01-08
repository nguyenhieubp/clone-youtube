import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAfSezN-ex0h7Ey_d1wnBjo0JGjOlH-sZM",
  authDomain: "fileyoutobe.firebaseapp.com",
  projectId: "fileyoutobe",
  storageBucket: "fileyoutobe.appspot.com",
  messagingSenderId: "763656799708",
  appId: "1:763656799708:web:1c24a2fe7272c2efd07b19",
  measurementId: "G-131VFYZWYG",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
