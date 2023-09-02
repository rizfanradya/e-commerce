import Image from "next/image";
import Link from "next/link";

export default function CardProduct() {
  return (
    <Link
      href={"./cart"}
      className="w-40 h-52 rounded-lg bg-slate-800 overflow-hidden"
    >
      <div className="h-28 w-full overflow-hidden">
        <img
          className="w-full"
          src="https://source.unsplash.com/random"
          alt="product"
          width={50}
          height={50}
        />
      </div>
      <div className="m-3">
        <p className="text-xs pb-1 text-slate-300">
          Lorem ipsum dolor sit amet consectetur lor...
        </p>
        <p className="font-medium text-sm">Rp 1.350.000</p>
      </div>
    </Link>
  );
}
