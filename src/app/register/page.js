import FormButton from "@/app/elements/formButton";
import FormInput from "@/app/elements/formInput";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <>
      <title>Register</title>
      <div className="w-screen h-screen flex gap-4 flex-col justify-center items-center">
        <div className="bg-slate-800 rounded-md flex flex-col gap-7 items-center p-7">
          <h1 className="text-2xl font-bold">REGISTER</h1>
          <FormInput type="text" placeholder="Nama" />
          <FormInput type="email" placeholder="Email" />
          <FormInput type="password" placeholder="Password" />
          <FormInput type="password" placeholder="Confirm Password" />
          <FormButton desc="REGISTER" />
        </div>
        <p>
          Have an account?{" "}
          <Link
            className="text-sky-500 hover:text-sky-600 transition font-semibold"
            href={"./login"}
          >
            Login
          </Link>
        </p>
      </div>
    </>
  );
}
