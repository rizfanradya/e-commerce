import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const getDataProduct = await axios.get("https://fakestoreapi.com/products");
  const products = getDataProduct.data;
  const sizeImage = 200;

  return (
    <>
      <title>Home</title>
      <div className="mt-7 mb-14 p-6">
        <h1 className="mb-2 py-1 px-3 rounded-md font-bold text-xl bg-slate-800">
          Fake Store API
        </h1>
        <div className="flex flex-wrap gap-5 justify-center">
          {products.map((product) => (
            <Link
              href={`/${product.id}`}
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
                <p className="text-xs font-medium text-slate-300">
                  {product.title}
                </p>
                <p className="font-medium text-sm">Rp {product.price}</p>

                <div className="flex justify-around">
                  <Link
                    href={"/cart"}
                    className="border p-2 rounded-full hover:bg-indigo-500 transition"
                  >
                    <Image src={"cart.svg"} alt="cart" width={16} height={16} />
                  </Link>

                  <Link
                    href={"/cart"}
                    className="border p-2 rounded-full hover:bg-indigo-500 transition"
                  >
                    <Image
                      src={"love.svg"}
                      alt="wishlist"
                      width={16}
                      height={16}
                    />
                  </Link>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
