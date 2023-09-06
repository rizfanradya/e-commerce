"use client";
import Image from "next/image";
import firebaseConfig from "@/app/firebase";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function ProfilePage() {
  const sizeImage = 100;
  const auth = getAuth(firebaseConfig);
  const provider = new GoogleAuthProvider();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const storedUserProfile = Cookies.get("userProfile");
    if (storedUserProfile) {
      setUserProfile(JSON.parse(storedUserProfile));
    }
  }, []);

  const handleLoginGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        setUserProfile({
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
        const updatedUserProfile = {
          displayName: user.displayName,
          photoURL: user.photoURL,
        };
        setUserProfile(updatedUserProfile);
        Cookies.set("userProfile", JSON.stringify(updatedUserProfile), {
          expires: 7,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  return (
    <>
      <title>Profile</title>
      <div className="my-12 w-11/12 m-auto flex flex-col items-center gap-4">
        <div className="w-full h-40 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 p-5 flex items-center gap-4">
          <div className="w-20 h-20 rounded-full overflow-hidden">
            <Image
              className="h-full"
              src={userProfile ? userProfile.photoURL : "/profile.jpg"}
              alt="profile"
              width={sizeImage}
              height={sizeImage}
            />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="font-bold text-sm tracking-wide">
              {userProfile ? userProfile.displayName : "Your Name"}
            </h1>
          </div>
        </div>
        <button
          className="text-sky-500 transition border font-medium rounded-full py-2 px-14 hover:bg-sky-500 hover:text-slate-900"
          onClick={handleLoginGoogle}
        >
          Login With Google
        </button>
      </div>
    </>
  );
}
