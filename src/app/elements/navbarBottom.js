import Image from "next/image";
import Link from "next/link";

export default async function NavbarBottom() {
  const sizeIcon = 26;
  const listItems = [
    { href: "", name: "home" },
    { href: "category", name: "category" },
    { href: "cart", name: "cart" },
    { href: "profile", name: "profile" },
  ];

  return (
    <div className="bg-indigo-500 w-screen h-11 bottom-0 fixed lg:hidden">
      <ul className="h-full flex gap-4 justify-around items-center">
        {listItems.map((listItem) => (
          <li key={listItem.name}>
            <Link
              href={`/${listItem.href}`}
              className="hover:text-slate-400 transition"
            >
              <Image
                src={`/${listItem.name}.svg`}
                alt={listItem.name}
                width={sizeIcon}
                height={sizeIcon}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
