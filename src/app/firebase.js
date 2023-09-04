import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.FIREBASE_DATABASE_URL,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID,
//   measurementId: process.env.FIREBASE_MEASUREMENT_ID,
// };
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
