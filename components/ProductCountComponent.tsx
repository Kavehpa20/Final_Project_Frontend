"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addingCountProductAction,
  removingCountProductAction,
} from "@/redux/slices/cart/cartSlice";

const ProductCountComponent = ({ product }: IProducts) => {
  const dispatch = useDispatch();
  const productAddingCount = useSelector(
    (state) => state.cart.productAddingCount,
  );

  return (
    <div className="mx-auto max-w-xs">
      <div className="relative flex max-w-[11rem] items-center">
        <button
          type="button"
          onClick={() => dispatch(removingCountProductAction())}
          disabled={productAddingCount <= 1}
          data-input-counter-decrement="bedrooms-input"
          className="h-11 rounded-s-lg border border-gray-300 bg-gray-100 p-3 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
        >
          <svg
            className="h-3 w-3 text-gray-900 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 2"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h16"
            />
          </svg>
        </button>
        <p
          aria-describedby="helper-text-explanation"
          className="remove-arrow block h-11 w-full border-x-0 border-gray-300 bg-gray-50 px-8 pb-6 pt-1 text-center font-IRANSans text-sm font-medium text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        >
          {productAddingCount}
        </p>
        <div className="absolute bottom-1 start-1/2 flex -translate-x-1/2 items-center space-x-1 font-IRANSans text-xs text-gray-400 rtl:translate-x-1/2 rtl:space-x-reverse">
          <span>تعداد</span>
          <svg
            className="flex h-4 w-4 text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 90 90"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M 8 10 L 8 22 L 10 22 L 10 70 L 70 70 L 70 22 L 72 22 L 72 10 Z M 10 12 L 70 12 L 70 20 L 10 20 Z M 12 22 L 68 22 L 68 68 L 12 68 Z M 32 26 C 30.355469 26 29 27.355469 29 29 L 29 30 L 29.417969 30 C 29.859375 31.105469 30.742188 32 32 32 L 48 32 C 49.257813 32 50.140625 31.105469 50.582031 30 L 51 30 L 51 29 C 51 27.355469 49.644531 26 48 26 Z M 32 28 L 48 28 C 48.566406 28 49 28.433594 49 29 C 49 29.566406 48.566406 30 48 30 L 32 30 C 31.433594 30 31 29.566406 31 29 C 31 28.433594 31.433594 28 32 28 Z M 18 63 C 17.449219 63 17 63.449219 17 64 C 17 64.550781 17.449219 65 18 65 C 18.550781 65 19 64.550781 19 64 C 19 63.449219 18.550781 63 18 63 Z M 22 63 C 21.449219 63 21 63.449219 21 64 C 21 64.550781 21.449219 65 22 65 C 22.550781 65 23 64.550781 23 64 C 23 63.449219 22.550781 63 22 63 Z M 26 63 C 25.449219 63 25 63.449219 25 64 C 25 64.550781 25.449219 65 26 65 C 26.550781 65 27 64.550781 27 64 C 27 63.449219 26.550781 63 26 63 Z M 30 63 C 29.449219 63 29 63.449219 29 64 C 29 64.550781 29.449219 65 30 65 C 30.550781 65 31 64.550781 31 64 C 31 63.449219 30.550781 63 30 63 Z M 34 63 C 33.449219 63 33 63.449219 33 64 C 33 64.550781 33.449219 65 34 65 C 34.550781 65 35 64.550781 35 64 C 35 63.449219 34.550781 63 34 63 Z M 38 63 C 37.449219 63 37 63.449219 37 64 C 37 64.550781 37.449219 65 38 65 C 38.550781 65 39 64.550781 39 64 C 39 63.449219 38.550781 63 38 63 Z M 42 63 C 41.449219 63 41 63.449219 41 64 C 41 64.550781 41.449219 65 42 65 C 42.550781 65 43 64.550781 43 64 C 43 63.449219 42.550781 63 42 63 Z M 46 63 C 45.449219 63 45 63.449219 45 64 C 45 64.550781 45.449219 65 46 65 C 46.550781 65 47 64.550781 47 64 C 47 63.449219 46.550781 63 46 63 Z M 50 63 C 49.449219 63 49 63.449219 49 64 C 49 64.550781 49.449219 65 50 65 C 50.550781 65 51 64.550781 51 64 C 51 63.449219 50.550781 63 50 63 Z M 54 63 C 53.449219 63 53 63.449219 53 64 C 53 64.550781 53.449219 65 54 65 C 54.550781 65 55 64.550781 55 64 C 55 63.449219 54.550781 63 54 63 Z M 58 63 C 57.449219 63 57 63.449219 57 64 C 57 64.550781 57.449219 65 58 65 C 58.550781 65 59 64.550781 59 64 C 59 63.449219 58.550781 63 58 63 Z M 62 63 C 61.449219 63 61 63.449219 61 64 C 61 64.550781 61.449219 65 62 65 C 62.550781 65 63 64.550781 63 64 C 63 63.449219 62.550781 63 62 63 Z"
            ></path>
          </svg>
        </div>
        <button
          type="button"
          onClick={() => dispatch(addingCountProductAction(1))}
          disabled={productAddingCount === product.quantity}
          data-input-counter-increment="bedrooms-input"
          className="h-11 rounded-e-lg border border-gray-300 bg-gray-100 p-3 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
        >
          <svg
            className="h-3 w-3 text-gray-900 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 1v16M1 9h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProductCountComponent;
