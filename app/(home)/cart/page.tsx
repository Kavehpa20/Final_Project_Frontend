import CartTable from "./components/CartTable";

export default function Cart() {
  return (
    <>
      <div className="mr-4 mt-4 text-3xl font-semibold text-gray-800 dark:text-white">
        سبد خرید
      </div>
      <CartTable />
    </>
  );
}
