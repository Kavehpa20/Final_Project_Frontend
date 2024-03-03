import React from "react";
import Link from "next/link";
import categories from "@/components/temp/categories.json";

const CatagoriesPage = ({ params }: { params: { category: string } }) => {
  const category = categories.find((el) => el.path === params.category);
  if (!category) throw new Error("Not Found");
  const products = category?.products;

  return (
    <div>
      {products?.map((el, i) => (
        <div key={i}>
          <Link href={`/${params.category}/${el.id}`}>
            <p>{el.name}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CatagoriesPage;
