import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDKAv-xquPgLzbprx06WRirCf2MItmXQDM",
  authDomain: "mywheels-3b5cb.firebaseapp.com",
  projectId: "mywheels-3b5cb",
  storageBucket: "mywheels-3b5cb.firebasestorage.app",
  messagingSenderId: "292901501963",
  appId: "1:292901501963:web:69b94ec68348bbf496db0e"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export default app;
