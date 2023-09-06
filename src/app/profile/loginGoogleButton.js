"use client";
import firebaseApp from "@/db/firebase";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

export default function LoginGoogleButton() {
  const auth = getAuth(firebaseApp);
  const provider = new GoogleAuthProvider();

  const handleLoginGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  return (
    <button
      className="text-sky-500 transition border font-medium rounded-full py-2 px-14 hover:bg-sky-500 hover:text-slate-900"
      onClick={handleLoginGoogle}
    >
      Login With Google
    </button>
  );
}
