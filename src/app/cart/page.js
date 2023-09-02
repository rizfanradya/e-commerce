import CartProduct from "@/app/elements/cartProduct";

export default function CartPage() {
  return (
    <>
      <title>Cart</title>
      <div className="my-12 p-4 flex flex-col gap-4">
        <CartProduct />
        <CartProduct />
        <CartProduct />
        <CartProduct />
        <CartProduct />
      </div>
    </>
  );
}
