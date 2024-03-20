import React from "react";
import Link from "next/link";
import { categoryProductsRequest } from "@/apis/axiosBaseURL";
import { getCategories } from "@/apis/getCategories";
import CardComponent from "@/components/Card";

const CatagoriesPage = async ({ params }: { params: { category: string } }) => {
  const getCategoriesName = await getCategories();
  const categories = getCategoriesName.data.categories;
  const category = categories.find((el) => el.slugname === params.category);
  if (!category) throw new Error("Not Found");
  const categoryId = category?._id;

  const products = await categoryProductsRequest(categoryId);

  return (
    <div>
      {params.category}
      <div className="grid grid-cols-1 gap-4 px-4 py-2 md:grid-cols-2 lg:grid-cols-3">
        {products.data.products.map((el) => (
          <Link key={el.name} href={`/${params.category}/${el.slugname}`}>
            <CardComponent
              name={el.name}
              price={el.price}
              thumbnail={el.thumbnail}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CatagoriesPage;

{
  /* <div>
{products?.map((el, i) => (
  <div key={i}>
    <Link href={`/${params.category}/${el.id}`}>
      <p>{el.name}</p>
    </Link>
  </div>
))}
</div> */
}
