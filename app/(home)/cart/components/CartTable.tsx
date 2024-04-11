"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "flowbite-react";
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
import Image from "next/image";
import Link from "next/link";
import RemoveProductModal from "./RemoveProductModal";
import ProductCell from "./ProductCell";
import { editCountProductAction } from "@/redux/slices/cart/cartSlice";

const CartTable = () => {
  const [openModal, setOpenModal] = useState(false);
  const [productId, setProductId] = useState("0");

  const dispatch = useDispatch();
  const productStore = useSelector((state: IRootState) => state.cart.product);

  const handleSave = (productId: string | undefined, newCount: number) => {
    dispatch(editCountProductAction({ productId, newCount }));
  };

  return (
    <Flowbite theme={{ theme: TableTheme }}>
      {productStore?.length === 0 ? (
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
              <TableHeadCell>
                <p>تعداد</p>
                <p className="text-xs font-extralight">
                  برای ویرایش تعداد محصول بر روی آن دابل کلیک کنید
                </p>
              </TableHeadCell>
              <TableHeadCell></TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              {productStore?.map((product: IProduct, index: number) => (
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
                  <TableCell className="font-IRANSans hover:underline">
                    <Link href={`/${product.categoryName}/${product.slugname}`}>
                      {product.name}
                    </Link>
                  </TableCell>
                  <TableCell className="font-IRANSans">
                    {product.price?.toLocaleString()} تومان
                  </TableCell>
                  <ProductCell
                    initialValue={product.count}
                    onSave={(newCount: number) =>
                      handleSave(product._id, newCount)
                    }
                    index={index}
                    quantity={product.quantity}
                  />
                  <TableCell>
                    <div className="flex flex-col justify-center gap-5 md:flex-row">
                      <Button
                        color="failure"
                        pill
                        onClick={() => {
                          setOpenModal(true);
                          setProductId(product._id || "");
                        }}
                      >
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
      {productStore?.length !== 0 && (
        <div className="mb-6 ml-4 mr-4 mt-8 flex items-center justify-between">
          <p className="text-lg font-semibold text-gray-800 dark:text-white">
            جمع :{" "}
            <span className="font-IRANSans text-2xl font-semibold text-gray-800 dark:text-white">
              {productStore
                ?.reduce(
                  (acc: number, product: IProduct) =>
                    acc + (product.price || 1) * (product.count || 1),
                  0,
                )
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
      )}
      <RemoveProductModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        productId={productId}
      />
    </Flowbite>
  );
};

export default CartTable;
