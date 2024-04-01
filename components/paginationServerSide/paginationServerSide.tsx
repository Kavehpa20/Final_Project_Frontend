import Link from "next/link";
import React from "react";
import { classNames } from "../../libs/tools";

const PaginationServerSide = ({
  page,
  total_pages,
  paramsCategory,
}: IProductsWithPage) => {
  const Pagination = ({ i }: { i: number }) => (
    <li key={i}>
      <Link
        href={`/${paramsCategory}/page=${i}`}
        className={
          i !== page
            ? "flex h-10 items-center justify-center border border-gray-300 bg-white px-4 font-IRANSans leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            : "z-10 flex h-10 items-center justify-center border border-blue-300 bg-blue-50 px-4 font-IRANSans leading-tight text-blue-600 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
        }
      >
        {i}
      </Link>
    </li>
  );

  const paginationButtons = [];
  for (let i = 1; i <= total_pages; i++) {
    paginationButtons.push(<Pagination key={i} i={i} />);
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="flex h-10 items-center -space-x-px text-base">
        <li>
          <Link
            href={`/${paramsCategory}/page=${page - 1}`}
            aria-disabled={total_pages === page}
            className={classNames(
              "ms-0 flex h-10 items-center justify-center rounded-s-lg",
              "border bg-white px-4 font-IRANSans leading-tight",
              "text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-600",
              "dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white",
              page === 1
                ? "pointer-events-none border-blue-300 dark:bg-gray-700"
                : "border-gray-300 dark:bg-gray-800",
            )}
          >
            صفحه قبل
          </Link>
        </li>
        {paginationButtons}
        <li>
          <Link
            href={`/${paramsCategory}/page=${page + 1}`}
            className={classNames(
              "flex h-10 items-center justify-center rounded-e-lg bg-white text-gray-500 dark:text-gray-300",
              "border px-4 font-IRANSans leading-tight",
              "hover:bg-gray-100 hover:text-gray-700 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white",
              total_pages === page
                ? "pointer-events-none border-blue-300 dark:bg-gray-700"
                : "dark:bg-gray-800",
            )}
            aria-disabled={total_pages === page}
          >
            صفحه بعد
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default PaginationServerSide;
