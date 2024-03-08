import React from "react";
import Link from "next/link";
import { axiosBaseUrl, categoryProductsRequest } from "@/apis/axios-config";
import { landingDataFetching } from "@/apis/landing-request";
import CardComponent from "@/components/Card";

const CatagoriesPage = async ({ params }: { params: { category: string } }) => {
  const getCategories = await landingDataFetching();
  const categories = getCategories.data.categories;
  const category = categories.find((el) => el.name === params.category);
  if (!category) throw new Error("Not Found");
  const categoryId = category?._id;

  const products = await categoryProductsRequest(categoryId);
  console.log(products.data.products);

  // const response = await axiosBaseUrl().get(`products`);
  return (
    <div>
      {params.category}
      <div className="grid grid-cols-1 gap-4 px-4 py-2 md:grid-cols-2 lg:grid-cols-3">
        {products.data.products.map((el) => (
          <CardComponent
            key={el.name}
            name={el.name}
            price={el.price}
            thumbnail={el.thumbnail}
          />
        ))}
      </div>
    </div>
  );
};

export default CatagoriesPage;
