import Link from "next/link";
import React from "react";

function ProductsHeaderLink({ text }: Props) {
  return (
    <div className="block cursor-pointer px-4 py-4">
      <Link
        href={`/${text}`}
        className="text-2xl font-semibold text-brown-800 hover:text-brown-500 hover:underline dark:text-brown-50 dark:hover:text-brown-200"
      >
        {text === "coffee" ? " گروه انواع قهوه ◀" : ""}
        {text === "tea_herbal" ? "گروه انواع چای و دمنوش ◀" : ""}
        {text === "snacks" ? " گروه انواع تنقلات و نوشیدنی ◀" : ""}
        {text === "chocolate" ? "گروه انواع شکلات ◀" : ""}
      </Link>
    </div>
  );
}

export default ProductsHeaderLink;
