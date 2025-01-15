"use client";
import { Imperial_Script } from "next/font/google";
import Link from "next/link";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import {
  Drawer,
  Typography,
  Card,
  List,
  ListItemPrefix,
  ListItem,
} from "@/app/components/material-tailwind";
import { FaPowerOff } from "react-icons/fa6";

const imperialScript = Imperial_Script({ subsets: ["latin"], weight: ["400"] });

export default function NavbarTop({ listItem }: { listItem: any[] }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      <div className="bg-[#C77373] text-white px-4 py-2 rounded-full flex justify-between w-full max-w-md items-center">
        <IoMdMenu
          size={34}
          onClick={() => openDrawer()}
          className="cursor-pointer"
        />
        <Link href={"/"} className={`text-3xl ${imperialScript.className}`}>
          Parcellia.id
        </Link>
        <FaUserCircle size={30} />
      </div>

      <Drawer
        open={isDrawerOpen}
        onClose={closeDrawer}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <Card
          className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <div className="p-4 mb-2">
            <Link href={"/"}>
              <Typography
                className={`${imperialScript.className} text-3xl`}
                variant="h5"
                color="blue-gray"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Parcellia.id
              </Typography>
            </Link>
          </div>

          <List
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {listItem.map((doc, index) => (
              <Link href={doc.href} key={index}>
                <ListItem
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <ListItemPrefix
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {doc.icon}
                  </ListItemPrefix>

                  {doc.name}
                </ListItem>
              </Link>
            ))}

            <ListItem
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <ListItemPrefix
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <FaPowerOff size={20} />
              </ListItemPrefix>
              Log Out
            </ListItem>
          </List>
        </Card>
      </Drawer>
    </>
  );
}
