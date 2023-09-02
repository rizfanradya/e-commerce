import ListItem from "@/app/components/navbarList";

export default function NavbarBottom() {
  return (
    <div className="bg-indigo-500 w-screen h-11 bottom-0 fixed lg:hidden">
      <ul className="h-full flex gap-4 justify-around items-center">
        <ListItem href="/" name="home" />
        <ListItem href="/category" name="category" />
        <ListItem href="/cart" name="cart" />
        <ListItem href="/profile" name="profile" />
      </ul>
    </div>
  );
}
