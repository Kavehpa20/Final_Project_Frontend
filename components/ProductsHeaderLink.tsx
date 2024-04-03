import Link from "next/link";
import React from "react";

const ProductsHeaderLink = async ({ text }: { text: string }) => {
  return (
    <div className="mx-8 mb-6 mt-8 flex justify-center text-3xl font-bold text-brown-800 dark:text-brown-50 md:block">
      <Link
        href={`/${text}/page=1`}
        className="text-2xl font-semibold text-brown-800 hover:text-brown-500 hover:underline dark:text-brown-50 dark:hover:text-brown-200"
      >
        {text === "coffee" ? " گروه انواع قهوه ◀" : ""}
        {text === "tea_herbal" ? "گروه انواع چای و دمنوش ◀" : ""}
        {text === "snacks" ? " گروه انواع تنقلات و نوشیدنی ◀" : ""}
        {text === "chocolate" ? "گروه انواع شکلات ◀" : ""}
      </Link>
    </div>
  );
};

export default ProductsHeaderLink;
