import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCAf3x6vDym4ykGFBRGgAcmGRRoz7DCvYM",
  authDomain: "hadikus-enterpise.firebaseapp.com",
  databaseURL: "https://hadikus-enterpise-default-rtdb.firebaseio.com",
  projectId: "hadikus-enterpise",
  storageBucket: "hadikus-enterpise.firebasestorage.app",
  messagingSenderId: "331698720524",
  appId: "1:331698720524:web:6f509e69b3153757b20329",
};

export const app = initializeApp(firebaseConfig);

export const database = getDatabase(
  app,
  "https://hadikus-enterpise-default-rtdb.firebaseio.com"
);

const auth = getAuth(app);
export { auth };
