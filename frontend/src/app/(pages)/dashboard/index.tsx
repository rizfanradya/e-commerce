/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Auth from "@/app/components/auth";
import LoadingSpinner from "@/app/components/loading";
import Navbar from "@/app/components/navbar";
import axiosInstance from "@/utils/axiosInstance";
import { backendFastApi, DECODE_TOKEN } from "@/utils/constant";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<any[]>([]);
  const [updFilter, setUpdFilter] = useState<number>(0);
  const [data, setData] = useState<any[]>([]);
  const router = useRouter();
  const limit = 1000000;
  const offset = 0;

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const category = await axiosInstance.get(
          `/category?limit=${limit}&offset=${offset}`
        );
        const item = await axiosInstance.get(
          `/item?limit=${limit}&offset=${offset}${
            updFilter !== 0 ? `&category_id=${updFilter}` : ""
          }`
        );
        setFilter(category.data.data);
        setData(item.data.data);
      } catch (error: any) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [updFilter]);

  async function addToCart(item_id: number) {
    try {
      await axiosInstance.post("/cart", {
        item_id,
        user_id: DECODE_TOKEN?.id,
        status: false,
        quantity: 1,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Auth>
      <Navbar bg="bg-[url('/dashboard_bg.jpeg')]">
        <div className="bg-[url('/dashboard_1.jpg')] text-3xl text-white font-bold flex justify-center items-center h-36 rounded-xl">
          <p className="drop-shadow-[2px_2px_2px_black]">Selamat berbelanja</p>
        </div>

        <div
          className="flex items-center justify-between gap-4 my-4 overflow-auto"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <div
            className={`py-2 px-4 rounded-lg text-white cursor-pointer ${
              updFilter === 0 ? "bg-[#c77373]" : "bg-[#ad3d3d]"
            }`}
            onClick={() => setUpdFilter(0)}
          >
            TERLARIS
          </div>

          {filter.map((doc) => (
            <div
              key={doc.id}
              className={`py-2 px-4 rounded-lg text-white cursor-pointer ${
                updFilter === doc.id ? "bg-[#c77373]" : "bg-[#ad3d3d]"
              }`}
              onClick={() => setUpdFilter(doc.id)}
            >
              {doc.category.toUpperCase()}
            </div>
          ))}
        </div>

        {loading ? (
          <LoadingSpinner fullScreen={false} />
        ) : (
          <div className="flex flex-wrap items-center gap-4">
            {data.map((doc) => (
              <div key={doc.id} className="bg-[#c77373] p-4 rounded-lg w-48">
                <div className="flex items-center justify-center h-24 overflow-hidden rounded-lg">
                  <Image
                    alt=""
                    src={`${backendFastApi}/image/${doc.image}`}
                    width={100}
                    height={100}
                    className="w-full"
                  />
                </div>

                <div className="flex justify-between mt-4">
                  <p className="text-xs font-bold uppercase">{doc.name}</p>
                  <p className="text-xs font-bold">
                    {doc.price.toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-2 mt-2">
                  <CiCirclePlus
                    size={34}
                    color="#ad3d3d"
                    className="cursor-pointer"
                    onClick={() => addToCart(doc.id)}
                  />
                  <button
                    className="bg-[#ad3d3d] text-white font-bold text-xs w-full p-2 rounded-md"
                    onClick={async () => {
                      await addToCart(doc.id);
                      router.push("/cart");
                    }}
                  >
                    Pesan Sekarang
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Navbar>
    </Auth>
  );
}
