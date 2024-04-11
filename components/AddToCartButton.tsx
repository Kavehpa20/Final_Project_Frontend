"use client";

import { Button, theme } from "flowbite-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCartAction,
  addingProductAction,
  resetCountProductAction,
} from "@/redux/slices/cart/cartSlice";
import { toast } from "react-toastify";

const AddToCartButton = ({
  product,
  category,
}: {
  product: IProducts;
  category: string;
}) => {
  const dispatch = useDispatch();
  const productStore = useSelector((state) => state.cart.product);
  const count = useSelector((state) => state.cart.productAddingCount);

  const handleAddToCart = () => {
    const find = productStore.find((p: IProduct) => p._id === product._id);
    if (!find) {
      product.count = count;
      product.categoryName = category;

      dispatch(addToCartAction());
      dispatch(addingProductAction(product));
      toast.success("محصول با موفقیت به سبد خرید اضافه گردید", {
        theme: "colored",
      });
      dispatch(resetCountProductAction());
    } else {
      toast.error(
        "محصول از قبل به سبد خرید شما اضافه شده است. برای افزایش یا کاهش تعداد محصولات به سبد خرید خود بروید !!",
        {
          theme: "colored",
        },
      );
    }
  };

  return (
    <Button onClick={handleAddToCart} color="success">
      <span>افزودن به سبد خرید</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="25"
        height="25"
        viewBox="0 0 48 48"
      >
        <path
          fill="#4caf50"
          d="M44,24c0,11-9,20-20,20S4,35,4,24S13,4,24,4S44,13,44,24z"
        ></path>
        <path fill="#fff" d="M21,14h6v20h-6V14z"></path>
        <path fill="#fff" d="M14,21h20v6H14V21z"></path>
      </svg>
    </Button>
  );
};

export default AddToCartButton;
