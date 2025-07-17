import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCwcai3aslS_HwpqHyX59j1NIrqoM-QHSc",
  authDomain: "mkurugenzi-ecf4a.firebaseapp.com",
  projectId: "mkurugenzi-ecf4a",
  storageBucket: "mkurugenzi-ecf4a.appspot.com",
  messagingSenderId: "545355813942",
  appId: "1:545355813942:web:ff48b769dcb7f533727497",
  measurementId: "G-LTLM3R8MV4",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
