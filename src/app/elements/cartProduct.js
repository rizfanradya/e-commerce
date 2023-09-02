import Link from "next/link";

export default function CartProduct() {
  return (
    <Link href={"/"} className="w-full p-2 bg-slate-800 rounded-lg flex">
      <div className="w-16 h-16 bg-slate-700 mr-3"></div>
      <div className="flex justify-between w-full">
        <div className="flex flex-col justify-between">
          <h1 className="font-semibold text-slate-300 text-sm">Nama Barang</h1>
          <p className="font-medium text-sm">Rp 1.350.000</p>
        </div>
        <div className="flex gap-7 items-end">
          <div className="text-xs">Qty: 1</div>
          <button className="text-red-400 p-[6px] h-min text-sm rounded-full border border-red-400 flex items-end hover:text-slate-800 hover:bg-red-400 transition">
            Delete
          </button>
        </div>
      </div>
    </Link>
  );
}
