import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyANsv46AEQIgyUAIBXzOox2hVcwLU_1zrg",
  authDomain: "rizfan-f8e9f.firebaseapp.com",
  databaseURL:
    "https://rizfan-f8e9f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "rizfan-f8e9f",
  storageBucket: "rizfan-f8e9f.appspot.com",
  messagingSenderId: "999866717138",
  appId: "1:999866717138:web:45b42390ba5bd93b332e0b",
  measurementId: "G-8NW6FSVK72",
};

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
