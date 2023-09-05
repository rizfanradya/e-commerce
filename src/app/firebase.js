import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
// import { db } from "./firebase";

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
const db = getFirestore(firebaseApp);

const querySnapshot = await getDocs(collection(db, "rizfan")).then((datas) =>
  datas.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  })
);

export default querySnapshot;
