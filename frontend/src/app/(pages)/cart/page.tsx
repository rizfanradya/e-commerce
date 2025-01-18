/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Auth from "@/app/components/auth";
import LoadingSpinner from "@/app/components/loading";
import axiosInstance from "@/utils/axiosInstance";
import { backendFastApi, DECODE_TOKEN } from "@/utils/constant";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiMessageDetail } from "react-icons/bi";
import { BsCheck2Square } from "react-icons/bs";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { ImCheckboxUnchecked } from "react-icons/im";
import { IoIosArrowBack } from "react-icons/io";

export default function Cart() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [reloadCart, setReloadCart] = useState(false);
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
  }, [reloadCart]);

  async function addToCart(item_id: number, type: string, status: boolean) {
    if (!status) {
      try {
        await axiosInstance.post("/cart", {
          item_id,
          user_id: DECODE_TOKEN?.id,
          status: false,
          quantity: type === "plus" ? 1 : -1,
        });
        setReloadCart(!reloadCart);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Auth>
      <div
        className="relative w-full max-w-md pt-4 m-auto bg-[url('/cart_bg.jpeg')] bg-cover bg-center bg-no-repeat h-screen overflow-auto"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div className="flex justify-between px-4 py-2 font-bold text-white">
          <Link href={"/"}>
            <IoIosArrowBack size={50} />
          </Link>

          <BiMessageDetail size={50} className="cursor-pointer" />
        </div>

        <h1 className="px-6 py-4 text-xl font-bold text-white">Keranjang</h1>

        <div
          className="p-8 mx-8 mt-4 bg-white rounded-3xl h-[60%] outline outline-gray-300 outline-4 overflow-auto"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <p className="text-end">Ubah</p>

          <div className="mt-10">
            {loading ? (
              <LoadingSpinner fullScreen={false} />
            ) : (
              <div className="flex flex-col gap-6">
                {data.map((doc) => (
                  <div key={doc.id} className="flex items-center gap-2">
                    <div>
                      {doc.status ? (
                        <BsCheck2Square />
                      ) : (
                        <ImCheckboxUnchecked />
                      )}
                    </div>

                    <div className="flex items-center justify-center w-20 h-20 overflow-hidden rounded-md">
                      <Image
                        alt=""
                        src={`${backendFastApi}/image/${doc.item.image}`}
                        width={100}
                        height={100}
                      />
                    </div>

                    <div className="flex flex-col w-full gap-1 text-sm capitalize max-w-40">
                      <p>{doc.item.name}</p>
                      <p>Rp. {doc.item.price.toLocaleString()}</p>

                      <div
                        className={`flex items-center ${
                          doc.status && "text-gray-500"
                        }`}
                      >
                        <div
                          className={`${!doc.status && "cursor-pointer"}`}
                          onClick={() =>
                            addToCart(doc.item.id, "plus", doc.status)
                          }
                        >
                          <CiCirclePlus size={25} />
                        </div>

                        <div
                          className={`flex items-center justify-center w-5 h-5 text-sm border rounded-full ${
                            doc.status ? "border-gray-500" : "border-black"
                          }`}
                        >
                          {doc.quantity}
                        </div>

                        <div
                          className={`${!doc.status && "cursor-pointer"}`}
                          onClick={() =>
                            addToCart(doc.item.id, "minus", doc.status)
                          }
                        >
                          <CiCircleMinus size={25} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mx-6">
          <div></div>
          <Link
            href={"/checkout"}
            className="bg-[#C77373] rounded-2xl font-bold px-8 py-2 text-white mt-10"
          >
            Checkout
          </Link>
        </div>
      </div>
    </Auth>
  );
}
