import Image from "next/image";
import Link from "next/link";

export default function ListItem(props) {
  const size = 26;
  return (
    <li>
      <Link href={props.href} className="hover:text-slate-400 transition">
        <Image
          src={`/navbarIcon/${props.name}.svg`}
          width={size}
          height={size}
          alt={props.name}
        />
      </Link>
    </li>
  );
}
