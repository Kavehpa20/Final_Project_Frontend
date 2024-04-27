import React from "react";
import Link from "next/link";

import { getCategories } from "@/apis/getCategories";
import CardComponent from "@/components/Card";
import PaginationServerSide from "@/components/paginationServerSide/paginationServerSide";
import SidebarComponent from "@/components/sidebar/SidebarComponent";
import Subcategories from "@/components/Subcategories";

import {
  categoryProductsRequest,
  findSubcategoryBySlugname,
  getCategoryNameById,
  getProductsBySubcategoryAndCategory,
} from "@/apis/requestsAPI";

const CatagoriesPage = async ({ params }: { params: { category: string } }) => {
  const getCategoriesName = await getCategories();
  const categories = getCategoriesName.data.categories;
  const category: ICategory = categories.find(
    (el: ICategory) => el.slugname === params.category,
  );

  const products = async () => {
    if (category) {
      const getProducts = await categoryProductsRequest(category?._id);
      return getProducts;
    } else if (!category) {
      const subcategory = await findSubcategoryBySlugname(params.category);
      if (subcategory.length === 0) throw new Error("Not Found");
      const category = await getCategoryNameById(subcategory[0].category);
      const getProducts = await getProductsBySubcategoryAndCategory(
        subcategory[0].category,
        subcategory[0]._id,
      );
      return [getProducts, category];
    }
  };

  return category ? (
    <div>
      <p className="mx-8 mb-6 mt-8 flex justify-center text-3xl font-bold text-brown-800 dark:text-brown-50 md:block">
        {params.category === "coffee" ? " گروه انواع قهوه ◀" : ""}
        {params.category === "tea_herbal" ? "گروه انواع چای و دمنوش ◀" : ""}
        {params.category === "snacks" ? " گروه انواع تنقلات و نوشیدنی ◀" : ""}
        {params.category === "chocolate" ? "گروه انواع شکلات ◀" : ""}
      </p>
      <div className="flex">
        <div className="">
          <SidebarComponent />
        </div>
        <Subcategories categoryId={category?._id} />
      </div>
    </div>
  ) : !category ? (
    <div className="flex flex-col">
      <p className="mx-8 mb-6 mt-8 flex justify-center text-3xl font-bold text-brown-800 dark:text-brown-50 md:block">
        ◀ محصولات {await products().then((res) => res[1].name)}
      </p>
      <div className="flex">
        <div className="my-2">
          <SidebarComponent />
        </div>
        <div>
          <div className="grid h-fit grid-cols-1 justify-center gap-4 px-4 py-2 md:grid-cols-2">
            {await products().then((res) =>
              res[0]?.data.data.products.map((el: IProduct) => (
                <Link key={el.name} href={`/${res[1].slugname}/${el.slugname}`}>
                  <CardComponent
                    name={el.name}
                    price={el.price}
                    thumbnail={el.thumbnail}
                    slugname={el.slugname}
                  />
                </Link>
              )),
            )}
          </div>
        </div>
      </div>
      {(await products().then((res) => res[0]?.data.total_pages)) > 1 ? (
        <div className="flex justify-center">
          <PaginationServerSide
            page={await products().then((res) => res[0]?.data.page)}
            total_pages={await products().then(
              (res) => res[0]?.data.total_pages,
            )}
            paramsCategory={await products().then((res) => res[1].slugname)}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  ) : (
    <p>خطایی رخ داده است</p>
  );
};

export default CatagoriesPage;
