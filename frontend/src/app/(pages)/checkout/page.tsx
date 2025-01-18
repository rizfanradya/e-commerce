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
import { IoIosArrowBack } from "react-icons/io";

export default function Checkout() {
  const [data, setData] = useState<any[]>([]);
  const [totalPayment, setTotalPayment] = useState(0);
  const [loading, setLoading] = useState(true);
  const limit = 1000000;
  const offset = 0;
  const totalPostage = 10000;

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const cart = await axiosInstance.get(
          `/cart?limit=${limit}&offset=${offset}&user_id=${DECODE_TOKEN?.id}`
        );
        setData(cart.data.data);
        setTotalPayment(cart.data.total_payment + totalPostage);
      } catch (error: any) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Auth>
      <div
        className="relative w-full max-w-md pt-4 m-auto bg-[url('/checkout_bg.jpeg')] bg-cover bg-center bg-no-repeat h-screen overflow-auto"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div className="flex justify-between px-4 py-2 font-bold">
          <Link href={"/cart"}>
            <IoIosArrowBack size={50} />
          </Link>

          <BiMessageDetail size={50} className="cursor-pointer" />
        </div>

        <h1 className="px-6 py-4 text-xl font-bold">Checkout</h1>

        <div className="flex items-center justify-between px-6 mt-6">
          <h1 className="font-bold">Voucher</h1>
          <div className="bg-[#C77373] rounded-2xl font-bold px-6 py-1 text-sm text-white cursor-pointer">
            Pilih
          </div>
        </div>

        <div className="flex flex-col gap-1 px-6 mt-4">
          <h1 className="font-bold">Alamat</h1>
          <p>Jalan jambu air nomor 07, bumi nanti, bandar lampung</p>
          <div className="bg-[#C77373] w-max rounded-2xl font-bold px-6 py-1 text-sm text-white cursor-pointer">
            Detail alamat
          </div>
        </div>

        <div className="flex flex-col gap-1 px-6 mt-4">
          <h1 className="font-bold">Rincian Pembayaran</h1>

          {loading ? (
            <LoadingSpinner fullScreen={false} />
          ) : (
            <div className="flex flex-col gap-3">
              {data
                .filter((doc) => !doc.status)
                .map((doc) => (
                  <div key={doc.id} className="flex items-center gap-2">
                    <div className="flex items-center justify-center h-24 overflow-hidden rounded-md w-28">
                      <Image
                        alt=""
                        src={`${backendFastApi}/image/${doc.item.image}`}
                        width={100}
                        height={100}
                      />
                    </div>

                    <div className="flex flex-col w-full gap-1 capitalize">
                      <p>{doc.item.name}</p>
                      <div className="flex items-center justify-between w-full">
                        <p>Rp. {doc.item.price.toLocaleString()}</p>
                        <p>
                          Rp. {(doc.item.price * doc.quantity).toLocaleString()}
                        </p>
                      </div>
                      <p>
                        <span className="text-[10px]">x</span>
                        {doc.quantity}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          )}

          <div className="bg-[#C77373] w-max rounded-2xl font-bold px-6 py-1 text-sm text-white cursor-pointer">
            Catatan
          </div>
        </div>

        <div className="flex items-center justify-between px-6 mt-4">
          <h1 className="font-bold">Opsi Pengiriman</h1>
          <div className="bg-[#C77373] rounded-2xl font-bold px-6 py-1 text-sm text-white cursor-pointer">
            Pilih
          </div>
        </div>

        <div className="px-6 mt-4">
          <table>
            <tr>
              <td>Biaya penanganan dan biaya ongkir</td>
              <td>Rp. {totalPostage.toLocaleString()}</td>
            </tr>
            <tr>
              <td>Total pembayaran</td>
              <td>Rp. {totalPayment.toLocaleString()}</td>
            </tr>
            <tr>
              <td>Nomor pengiriman</td>
              <td>J&TE83HJ6BN</td>
            </tr>
          </table>
        </div>

        <div className="flex items-center justify-between px-6 mt-4">
          <h1 className="font-bold">Metode Pembayaran</h1>
          <div className="bg-[#C77373] rounded-2xl font-bold px-6 py-1 text-sm text-white cursor-pointer">
            Pilih
          </div>
        </div>

        <div className="bg-[#C77373] rounded-full w-max m-auto my-6 font-bold px-6 py-1 text-lg text-white cursor-pointer">
          Pesan
        </div>
      </div>
    </Auth>
  );
}
