import React from "react";
import Link from "next/link";
import { categoryProductsRequest } from "@/apis/axiosBaseURL";
import { getCategories } from "@/apis/getCategories";
import CardComponent from "@/components/Card";

const CatagoriesPage = async ({ params }: { params: { category: string } }) => {
  const getCategoriesName = await getCategories();
  const categories = getCategoriesName.data.categories;
  const category = categories.find(
    (el: ICategory) => el.slugname === params.category,
  );
  if (!category) throw new Error("Not Found");
  const categoryId = category?._id;

  const products = await categoryProductsRequest(categoryId);

  return (
    <div>
      <p className="mx-8 mb-6 mt-8 text-2xl font-semibold text-brown-800 dark:text-brown-50">
        {params.category === "coffee" ? " گروه انواع قهوه ◀" : ""}
        {params.category === "tea_herbal" ? "گروه انواع چای و دمنوش ◀" : ""}
        {params.category === "snacks" ? " گروه انواع تنقلات و نوشیدنی ◀" : ""}
        {params.category === "chocolate" ? "گروه انواع شکلات ◀" : ""}
      </p>

      {/* {params.category} */}
      <div className="grid grid-cols-1 gap-4 px-4 py-2 md:grid-cols-2 lg:grid-cols-3">
        {products.data.products.map((el: IProduct) => (
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
