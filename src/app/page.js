import CardProduct from "@/app/elements/cardProduct";

export default function Home() {
  return (
    <>
      <title>Home</title>
      <div className="mt-7 mb-14 p-6">
        <h1 className="mb-2 py-1 px-3 rounded-md font-bold text-xl bg-slate-800">
          Recomended
        </h1>
        <div className="flex flex-wrap gap-5 justify-center">
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
        </div>
      </div>
    </>
  );
}
