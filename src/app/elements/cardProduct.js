import axios from "axios";
import Image from "next/image";

export default async function CardProduct() {
  const { data } = await axios.get(
    "https://fakestoreapi.com/products?limit=20"
  );
  const sizeImage = 200;

  return data.map((product) => (
    <div
      key={product.id}
      className="w-36 rounded-lg bg-slate-800 overflow-hidden"
    >
      <div className="h-36 flex flex-col items-center justify-center overflow-hidden">
        <Image
          key={product.id}
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
    </div>
  ));
}
