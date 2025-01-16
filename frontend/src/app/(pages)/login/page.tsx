"use client";
import axiosInstance from "@/utils/axiosInstance";
import {
  ACCESS_TOKEN,
  ACCESS_TOKEN_NAME,
  REFRESH_TOKEN_NAME,
} from "@/utils/constant";
import { Imperial_Script } from "next/font/google";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Typography, Input, Button } from "@/app/components/material-tailwind";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const imperialScript = Imperial_Script({ subsets: ["latin"], weight: ["400"] });

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);
  const { register, watch } = useForm<{
    username: string;
    password: string;
  }>();

  async function onLogin() {
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        `token`,
        {
          username: watch("username"),
          password: watch("password"),
        },
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      if (typeof window !== "undefined") {
        localStorage.setItem(ACCESS_TOKEN_NAME, response.data.access_token);
        localStorage.setItem(REFRESH_TOKEN_NAME, response.data.refresh_token);
      }
      setTimeout(() => {
        window.location.href = "/";
      }, 200);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "warning",
        title: "Incorrect",
        text: "Username or Password is incorrect",
        allowOutsideClick: false,
      });
    }
    setLoading(false);
  }

  if (ACCESS_TOKEN) {
    window.location.href = "/";
  } else {
    return (
      <div className="w-full max-w-md bg-[url('/login_bg.jpeg')] bg-cover bg-no-repeat m-auto flex flex-col justify-center items-center">
        <div className="flex flex-col items-center justify-center">
          <Image src="/logo.png" alt="" width={100} height={100} />

          <p className={`text-4xl text-white ${imperialScript.className}`}>
            Parcellia.id
          </p>
        </div>

        <div className="flex flex-col items-center justify-center mt-8">
          <h1 className="text-3xl font-bold text-white">Login</h1>

          <div className="flex flex-col items-center justify-center p-8 mt-4 bg-white rounded-3xl outline outline-gray-300 outline-4">
            <div className="mb-6">
              <label>
                <Typography
                  variant="small"
                  className="block mb-2 font-medium text-gray-900"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Username
                </Typography>
              </label>
              <div className="overflow-hidden rounded-full bg-[#C77373]">
                <Input
                  {...register("username")}
                  color="gray"
                  size="md"
                  placeholder="Username"
                  className="w-full text-white placeholder:opacity-100 placeholder:text-white"
                  labelProps={{
                    className: "hidden",
                  }}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  crossOrigin={undefined}
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="password">
                <Typography
                  variant="small"
                  className="block mb-2 font-medium text-gray-900"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Password
                </Typography>
              </label>
              <div className="overflow-hidden rounded-full bg-[#C77373]">
                <Input
                  {...register("password")}
                  size="md"
                  placeholder="********"
                  labelProps={{
                    className: "hidden",
                  }}
                  className="w-full text-white placeholder:opacity-100 placeholder:text-white"
                  type={passwordShown ? "text" : "password"}
                  icon={
                    <i
                      onClick={togglePasswordVisiblity}
                      className="text-white cursor-pointer"
                    >
                      {passwordShown ? (
                        <FaEye size={20} />
                      ) : (
                        <FaEyeSlash size={20} />
                      )}
                    </i>
                  }
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  crossOrigin={undefined}
                />
              </div>
            </div>

            <Button
              size="sm"
              className="mt-6 bg-[#C77373] rounded-full px-8"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              onClick={() => onLogin()}
              loading={loading}
            >
              Login
            </Button>
          </div>

          <p className="mt-4 text-sm">
            Belum memiliki akun?{" "}
            <span className="font-bold cursor-pointer">Daftar</span>
          </p>
        </div>
      </div>
    );
  }
}
