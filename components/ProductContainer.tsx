import React from "react";
import Link from "next/link";

import CardComponent from "./Card";
import { getCategories } from "@/apis/getCategories";

const ProductContainer = async ({ data }: { data: [IProduct] }) => {
  const getCategoriesName = await getCategories();
  const categories = getCategoriesName.data.categories;

  const getCategoryName = (categoryId: string) => {
    const findCategory: ICategory = categories.find(
      (category: ICategory) => category._id === categoryId,
    );
    return findCategory;
  };

  const res = await data;

  return (
    <div className="mb-6 mt-2 grid grid-cols-1 gap-4 px-4 py-2 md:grid-cols-2 lg:grid-cols-3">
      {res.map((product: IProduct) => (
        <Link
          key={product.name}
          href={`/${getCategoryName(product.category as any).slugname}/${product.slugname}`}
        >
          <CardComponent
            name={product.name}
            price={product.price}
            thumbnail={product.thumbnail}
            slugname={product.slugname}
          />
        </Link>
      ))}
    </div>
  );
};

export default ProductContainer;
