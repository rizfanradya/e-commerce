import axios from "axios";
import Link from "next/link";

export default async function CategoryPage() {
  const getDataProductCategories = await axios.get(
    "https://fakestoreapi.com/products/categories"
  );
  const categories = getDataProductCategories.data;

  return (
    <>
      <title>Category</title>
      <div className="my-14 w-11/12 m-auto flex flex-wrap gap-6 justify-around">
        {categories.map((category) => (
          <Link
            href={"/"}
            className="outline outline-1 outline-indigo-500 outline-offset-2 font-semibold tracking-wide rounded-lg p-3 hover:bg-indigo-500 hover:text-slate-800 transition"
            key={[category]}
          >
            {[category]}
          </Link>
        ))}
      </div>
    </>
  );
}
