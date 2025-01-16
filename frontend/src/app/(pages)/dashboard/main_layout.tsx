import Navbar from "@/app/components/navbar";
import Link from "next/link";
import { ReactNode } from "react";

const filter = [
  { name: "TERLARIS", href: "/" },
  { name: "FLOWERS", href: "/flowers" },
  { name: "HAMPERS", href: "/hampers" },
];

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <Navbar bg="bg-[url('/dashboard_bg.jpeg')]">
      <div className="bg-[url('/dashboard_1.jpg')] text-3xl text-white font-bold flex justify-center items-center h-36 rounded-xl">
        <p className="drop-shadow-[2px_2px_2px_black]">Selamat berbelanja</p>
      </div>

      <div className="flex items-center justify-between gap-4 my-4">
        {filter.map((doc, index) => (
          <Link href={doc.href} key={index}>
            <div className="py-2 px-4 rounded-lg bg-[#ad3d3d] text-white">
              {doc.name}
            </div>
          </Link>
        ))}
      </div>

      <div>{children}</div>
    </Navbar>
  );
}
