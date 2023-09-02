import ListItem from "@/app/components/navbarList";
import Link from "next/link";

export default function NavbarTop() {
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
          <ListItem href="/" name="home" />
          <ListItem href="/category" name="category" />
          <ListItem href="/cart" name="cart" />
          <ListItem href="/profile" name="profile" />
        </ul>
      </div>
    </div>
  );
}
