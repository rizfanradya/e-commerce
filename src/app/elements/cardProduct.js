import Image from "next/image";
import Link from "next/link";

async function getData() {
  const res = await fetch("https://fakestoreapi.com/products?limit=5");
  if (!res.ok) {
    throw new error("gagal fetch");
  }
  return res.json();
}

export default async function CardProduct() {
  const products = await getData();
  const sizeImage = 100;

  return products.map((product) => (
    <Link
      key={product.id}
      href={"./cart"}
      className="w-40 rounded-lg bg-slate-800 overflow-hidden"
    >
      <div className="h-40 w-full overflow-hidden">
        <Image
          key={product.id}
          className="w-full"
          src={product.image}
          alt={product.title}
          width={sizeImage}
          height={sizeImage}
        />
      </div>
      <div className="m-3 flex flex-col gap-2">
        <p className="text-xs font-medium text-slate-300">{product.title}</p>
        <p className="font-medium text-sm">Rp {product.price}</p>
      </div>
    </Link>
  ));
}
