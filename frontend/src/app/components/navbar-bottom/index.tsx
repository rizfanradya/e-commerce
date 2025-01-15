import { ListItem } from "@/app/components/material-tailwind";
import Link from "next/link";

export default function NavbarBottom({ listItem }: { listItem: any[] }) {
  return (
    <div className="fixed left-0 right-0 bottom-6">
      <div className="bg-[#C77373] text-white w-[400px] py-1 px-2 m-auto rounded-full flex justify-between items-center">
        {listItem.map((doc, index) => (
          <Link href={doc.href} key={index}>
            <ListItem
              className="rounded-full"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {doc.icon}
            </ListItem>
          </Link>
        ))}
      </div>
    </div>
  );
}
