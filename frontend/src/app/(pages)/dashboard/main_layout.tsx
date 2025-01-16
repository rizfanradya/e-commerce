/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Navbar from "@/app/components/navbar";
import axiosInstance from "@/utils/axiosInstance";
import { ReactNode, useEffect, useState } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  const [filter, setFilter] = useState<any[]>([]);
  const [updFilter, setUpdFilter] = useState<number>(0);
  const limit = 1000000;
  const offset = 0;

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstance.get(
          `/category?limit=${limit}&offset=${offset}`
        );
        setFilter(response.data.data);
      } catch (error: any) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <Navbar bg="bg-[url('/dashboard_bg.jpeg')]">
      <div className="bg-[url('/dashboard_1.jpg')] text-3xl text-white font-bold flex justify-center items-center h-36 rounded-xl">
        <p className="drop-shadow-[2px_2px_2px_black]">Selamat berbelanja</p>
      </div>

      <div className="flex items-center justify-between gap-4 my-4">
        {filter.map((doc) => (
          <div
            key={doc.id}
            className="py-2 px-4 rounded-lg bg-[#ad3d3d] text-white"
            onClick={() => alert(doc.id)}
          >
            {doc.category}
          </div>
        ))}
      </div>

      <div>{children}</div>
    </Navbar>
  );
}
