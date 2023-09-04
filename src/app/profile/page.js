import Image from "next/image";
import Link from "next/link";

export default function ProfilePage() {
  const sizeImage = 100;

  return (
    <>
      <title>Profile</title>
      <div className="my-12 w-11/12 m-auto flex flex-col items-center gap-4">
        <div className="w-full h-40 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 p-5 flex items-center gap-4">
          <div className="w-20 h-20 rounded-full overflow-hidden">
            <Image
              className="h-full"
              src={"/profile.jpg"}
              alt="profile"
              width={sizeImage}
              height={sizeImage}
            />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="font-bold text-sm tracking-wide">Rizfan Radya</h1>
            <p className="text-xs">Lorem Ipsum Dolor Sit Amet.</p>
          </div>
        </div>

        <Link
          className="text-sky-500 transition border font-medium rounded-full py-2 px-14 hover:bg-sky-500 hover:text-slate-900"
          href={"./login"}
        >
          Login
        </Link>
      </div>
    </>
  );
}
