import Auth from "@/app/components/auth";
import Link from "next/link";
import { BiMessageDetail } from "react-icons/bi";
import { IoIosArrowBack } from "react-icons/io";

export default function Checkout() {
  return (
    <Auth>
      <div
        className="relative w-full max-w-md pt-4 m-auto bg-[url('/checkout_bg.jpeg')] bg-cover bg-center bg-no-repeat h-screen overflow-auto"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div className="flex justify-between px-4 py-2 font-bold">
          <Link href={"/cart"}>
            <IoIosArrowBack size={50} />
          </Link>

          <BiMessageDetail size={50} className="cursor-pointer" />
        </div>

        <h1 className="px-6 py-4 text-xl font-bold">Checkout</h1>

        <div className="flex items-center justify-between px-6 mt-6">
          <h1 className="font-bold">Voucher</h1>
          <div className="bg-[#C77373] rounded-2xl font-bold px-6 py-1 text-sm text-white cursor-pointer">
            Pilih
          </div>
        </div>

        <div className="flex flex-col gap-1 px-6 mt-4">
          <h1 className="font-bold">Alamat</h1>
          <p>Jalan jambu air nomor 07, bumi nanti, bandar lampung</p>
          <div className="bg-[#C77373] w-max rounded-2xl font-bold px-6 py-1 text-sm text-white cursor-pointer">
            Detail alamat
          </div>
        </div>

        <div className="flex flex-col gap-1 px-6 mt-4">
          <h1 className="font-bold">Rincian Pembayaran</h1>

          <div className="bg-[#C77373] w-max rounded-2xl font-bold px-6 py-1 text-sm text-white cursor-pointer">
            Catatan
          </div>
        </div>

        <div className="flex items-center justify-between px-6 mt-4">
          <h1 className="font-bold">Opsi Pengiriman</h1>
          <div className="bg-[#C77373] rounded-2xl font-bold px-6 py-1 text-sm text-white cursor-pointer">
            Pilih
          </div>
        </div>

        <div className="px-6 mt-4">
          {/* <div>
            <p>Biaya penanganan dan biaya ongkir</p>
            <p>Total pembayaran</p>
            <p>Nomor pengiriman</p>
          </div>

          <div>
            <p>Rp. 10.000</p>
            <p>Rp. 760.000</p>
            <p>J&TE83HJ6BN</p>
          </div> */}

          <table>
            <tr>
              <td>Biaya penanganan dan biaya ongkir</td>
              <td>Rp. 10.000</td>
            </tr>
            <tr>
              <td>Total pembayaran</td>
              <td>Rp. 760.000</td>
            </tr>
            <tr>
              <td>Nomor pengiriman</td>
              <td>J&TE83HJ6BN</td>
            </tr>
          </table>
        </div>

        <div className="flex items-center justify-between px-6 mt-4">
          <h1 className="font-bold">Metode Pembayaran</h1>
          <div className="bg-[#C77373] rounded-2xl font-bold px-6 py-1 text-sm text-white cursor-pointer">
            Pilih
          </div>
        </div>

        <div className="bg-[#C77373] rounded-full w-max m-auto my-6 font-bold px-6 py-1 text-lg text-white cursor-pointer">
          Pesan
        </div>
      </div>
    </Auth>
  );
}
