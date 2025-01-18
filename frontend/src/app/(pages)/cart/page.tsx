/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Auth from "@/app/components/auth";
import LoadingSpinner from "@/app/components/loading";
import axiosInstance from "@/utils/axiosInstance";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiMessageDetail } from "react-icons/bi";
import { IoIosArrowBack } from "react-icons/io";

export default function Cart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const limit = 1000000;
  const offset = 0;

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const cart = await axiosInstance.get(
          `/cart?limit=${limit}&offset=${offset}`
        );
        setData(cart.data.data);
      } catch (error: any) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Auth>
      <div className="relative w-full max-w-md pt-4 m-auto bg-[url('/cart_bg.jpeg')] bg-cover bg-center bg-no-repeat h-screen overflow-auto">
        <div className="flex justify-between px-4 py-2 font-bold text-white">
          <Link href={"/"}>
            <IoIosArrowBack size={50} />
          </Link>

          <BiMessageDetail size={50} className="cursor-pointer" />
        </div>

        <h1 className="px-6 py-6 text-xl font-bold text-white">Keranjang</h1>

        <div className="p-8 mx-8 mt-12 bg-white rounded-3xl outline outline-gray-300 outline-4">
          <p className="text-end">Ubah</p>

          {loading ? <LoadingSpinner fullScreen={false} /> : <div></div>}
        </div>

        <div className="flex items-center justify-between mx-6">
          <div></div>
          <Link
            href={"/checkout"}
            className="bg-[#C77373] rounded-2xl font-bold px-8 py-2 text-white mt-20"
          >
            Checkout
          </Link>
        </div>
      </div>
    </Auth>
  );
}
