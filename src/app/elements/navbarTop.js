import Image from "next/image";
import Link from "next/link";

export default function NavbarTop() {
  const sizeIcon = 26;
  const listItems = [
    { href: "", name: "home" },
    { href: "category", name: "category" },
    { href: "cart", name: "cart" },
    { href: "profile", name: "profile" },
  ];

  return (
    <div className="bg-indigo-500 fixed top-0 w-screen p-2 flex justify-around">
      <Link className="font-bold text-xl" href={"/"}>
        Toko Online
      </Link>

      <input
        className="w-2/5 h-7 rounded-full px-2 text-slate-800"
        placeholder="Search"
        name="search"
        autoComplete="off"
      />

      <div>
        <ul className="lg:flex gap-6 hidden">
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
    </div>
  );
}
