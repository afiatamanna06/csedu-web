import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAL4SJWboQXPyDncxZCEaBIdH4vGiyeQ8",
  authDomain: "csedu-f9f28.firebaseapp.com",
  projectId: "csedu-f9f28",
  storageBucket: "csedu-f9f28.firebasestorage.app",
  messagingSenderId: "167030333935",
  appId: "1:167030333935:web:925224da94b2988ed3561a",
  measurementId: "G-W7MFGBX96T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(); 