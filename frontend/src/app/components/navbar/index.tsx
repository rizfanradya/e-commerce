"use client";
import { ReactNode } from "react";
import NavbarTop from "../navbar-top";
import NavbarBottom from "../navbar-bottom";
import { FaHome, FaUserCircle } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";
import { IoNotifications } from "react-icons/io5";
import { ACCESS_TOKEN } from "@/utils/constant";

const listItem = [
  { href: "/", name: "Dashboard", icon: <FaHome size={20} /> },
  { href: "/cart", name: "Cart", icon: <BsCart4 size={22} /> },
  {
    href: "/notification",
    name: "Notification",
    icon: <IoNotifications size={22} />,
  },
  {
    href: "/profile",
    name: "Profile",
    icon: <FaUserCircle size={22} />,
  },
];

export default function Navbar({
  children,
  bg,
}: {
  children: ReactNode;
  bg?: string;
}) {
  if (!ACCESS_TOKEN) {
    window.location.href = "/login";
  } else {
    return (
      <div
        className={`relative w-full max-w-md pt-4 m-auto ${bg} bg-cover bg-center bg-no-repeat`}
      >
        <div className="px-4">
          <NavbarTop listItem={listItem} />
          <div className="mt-4">{children}</div>
        </div>

        <NavbarBottom listItem={listItem} />
      </div>
    );
  }
}
