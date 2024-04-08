"use client";

import { Avatar, Spinner } from "flowbite-react";
import {
  Button,
  Flowbite,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";

import { TableTheme } from "@/components/forms/TableTheme";
import AskingDeleteModal from "@/components/modals/AskingDeleteModal";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";

const CartTable = () => {
  const dispatch = useDispatch();
  const productStore = useSelector((state) => state.cart.product);
  // const productCount = useSelector((state) => state.cart.productAddingCount);

  console.log(productStore);

  return (
    <Flowbite theme={{ theme: TableTheme }}>
      {productStore.length === 0 ? (
        <div className="mx-auto flex flex-col items-center justify-center py-4 md:max-w-lg">
          <Image
            width={1000}
            height={1000}
            src="/Assets/pictures/EmptyCarts.png"
            alt="Empty Carts"
          />
          <Link
            className="mb-2 me-2 rounded-full bg-blue-700 px-5 py-3 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            href="/"
          >
            بازگشت به فروشگاه
          </Link>
        </div>
      ) : (
        <div className="mx-4 mt-2 overflow-x-auto">
          <Table striped>
            <TableHead>
              <TableHeadCell>تصویر کالا</TableHeadCell>
              <TableHeadCell>نام کالا</TableHeadCell>
              <TableHeadCell>قیمت</TableHeadCell>
              <TableHeadCell>تعداد</TableHeadCell>
              <TableHeadCell></TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              {productStore.map((product: IProduct, index: number) => (
                <TableRow
                  className="bg-white text-xs dark:border-gray-700 dark:bg-gray-800 md:text-base"
                  key={product._id}
                >
                  <TableCell className="px-2">
                    <Avatar
                      img={`http://localhost:8000/images/products/thumbnails/${product.thumbnail}`}
                      bordered
                      color="light"
                      size="lg"
                    />
                  </TableCell>
                  <TableCell className="font-IRANSans">
                    {product.name}
                  </TableCell>
                  <TableCell className="font-IRANSans">
                    {product.price?.toLocaleString()} تومان
                  </TableCell>
                  <TableCell className="font-IRANSans">
                    {product.count}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col justify-center gap-5 md:flex-row">
                      <Button color="failure" pill onClick={() => {}}>
                        حذف
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      <div className="mb-6 ml-4 mr-4 mt-8 flex items-center justify-between">
        <p className="text-lg font-semibold text-gray-800 dark:text-white">
          جمع :{" "}
          <span className="font-IRANSans text-2xl font-semibold text-gray-800 dark:text-white">
            {productStore
              .reduce((acc, product) => acc + product.price, 0)
              .toLocaleString()}
            تومان{" "}
          </span>
        </p>
        <Link
          href="/cart/buyerForm"
          className="mb-2 me-2 rounded-full bg-green-700 px-5 py-3 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          نهایی کردن سبد خرید
        </Link>
      </div>
      <AskingDeleteModal />
    </Flowbite>
  );
};

export default CartTable;
