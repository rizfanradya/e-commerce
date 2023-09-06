import { collection, getDocs, getFirestore } from "firebase/firestore";
import firebaseApp from "@/app/firebase";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const sizeImage = 200;
  const fakeStoreApi = await axios.get("https://fakestoreapi.com/products");
  const products = fakeStoreApi.data;
  const convertToRupiah = (dollar) => {
    const priceInRupiah = dollar * 15000;
    return priceInRupiah.toLocaleString("id-ID");
  };

  const db = getFirestore(firebaseApp);
  const collectionName = "rizfan";
  const querySnapshot = await getDocs(collection(db, collectionName)).then(
    (datas) =>
      datas.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      })
  );

  return (
    <>
      <title>Home</title>
      {querySnapshot.map((product) => (
        <div key={product.id} className="mt-12 modalbox">
          <p>test api {product.nama}</p>
          <p>{product.nohp}</p>
          <p>{product.email}</p>
        </div>
      ))}

      <div className="mt-7 mb-14 pt-6 px-3">
        <h1 className="mb-2 py-1 px-3 rounded-md font-bold text-xl bg-slate-800">
          Fake Store API
        </h1>
        <div className="flex flex-wrap gap-2 justify-around">
          {products.map((product) => (
            <div
              className="w-36 rounded-lg bg-slate-800 overflow-hidden cursor-pointer"
              key={product.id}
            >
              <div className="h-40 flex flex-col bg-slate-700 items-center justify-center overflow-hidden">
                <Image
                  key={product.id}
                  src={product.image}
                  alt={product.title}
                  width={sizeImage}
                  height={sizeImage}
                />
              </div>
              <div className="m-2 flex flex-col gap-3">
                <p
                  title={product.title}
                  className="text-xs text-slate-300 tracking-wide"
                >
                  {product.title.length <= 29
                    ? product.title
                    : `${product.title.slice(0, 29)} ...`}
                </p>
                <p className="font-medium text-sm">
                  Rp {convertToRupiah(product.price)}
                </p>
                <div className="flex justify-around">
                  <Link
                    href={"/cart"}
                    className="border p-2 rounded-full hover:bg-indigo-500 transition"
                  >
                    <Image src={"cart.svg"} alt="cart" width={14} height={14} />
                  </Link>
                  <Link
                    href={"/cart"}
                    className="border p-2 rounded-full hover:bg-indigo-500 transition"
                  >
                    <Image
                      src={"love.svg"}
                      alt="wishlist"
                      width={14}
                      height={14}
                    />
                  </Link>
                </div>
                <div className="flex gap-1 text-xs font-thin">
                  <Image src={"/star.svg"} alt="star" width={16} height={16} />
                  <p>{product.rating.rate}</p>
                  <span>|</span>
                  <p>{product.rating.count}</p>
                  <p>terjual</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
