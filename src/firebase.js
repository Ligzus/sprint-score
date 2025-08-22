import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDEFWACzOP-qnI8vXZkUWMU088aRfs1tQ4",
  authDomain: "sprint-score.firebaseapp.com",
  databaseURL: "https://sprint-score-default-rtdb.firebaseio.com",
  projectId: "sprint-score",
  storageBucket: "sprint-score.firebasestorage.app",
  messagingSenderId: "268315651666",
  appId: "1:268315651666:web:be8e6a29171aceb944f98b",
  measurementId: "G-LJRNPM1YR5"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);