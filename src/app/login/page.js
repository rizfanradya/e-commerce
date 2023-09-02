import FormButton from "@/app/elements/formButton";
import FormInput from "@/app/elements/formInput";
import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <title>Login</title>
      <div className="w-screen h-screen flex gap-4 flex-col justify-center items-center">
        <div className="bg-slate-800 rounded-md flex flex-col gap-7 items-center p-7">
          <h1 className="text-2xl font-bold">LOGIN</h1>
          <FormInput type="email" placeholder="Email" />
          <FormInput type="password" placeholder="Password" />
          <Link className="w-full" href={"/"}>
            <FormButton desc="LOGIN" />
          </Link>
        </div>
        <Link className="text-sky-500" href={"/"}>
          Forgot Password
        </Link>
        <p>
          Don&apos;t have an account?{" "}
          <Link
            className="text-sky-500 hover:text-sky-600 transition font-semibold"
            href={"./register"}
          >
            Register
          </Link>
        </p>
      </div>
    </>
  );
}
