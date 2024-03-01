import Link from "next/link";
import React from "react";

function ProductsHeaderLink() {
  return (
    <div className="block cursor-pointer px-4 py-4">
      <Link
        href="/product"
        className="text-2xl font-semibold text-brown-800 hover:text-brown-500 hover:underline dark:text-brown-50 dark:hover:text-brown-200"
      >
        قهوه گانودرما
      </Link>
    </div>
  );
}

export default ProductsHeaderLink;
