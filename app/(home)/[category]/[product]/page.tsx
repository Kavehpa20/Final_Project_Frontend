import Link from "next/link";
import { Button } from "flowbite-react";

import { categoryProductsRequest } from "@/apis/axiosBaseURL";
import { getCategories } from "@/apis/getCategories";
import { findProductBySlugname } from "@/apis/requestsAPI";
import CardComponent from "@/components/Card";
import SwiperComponent from "@/components/swiper/SwiperComponent";
import PaginationServerSide from "@/components/paginationServerSide/paginationServerSide";
import BreadcrumbComponent from "@/components/Breadcrumb";
import ProductDescription from "@/components/ProductDescription";
import ProductCountComponent from "@/components/ProductCountComponent";
import AddToCartButton from "@/components/AddToCartButton";

const ProductPage = async ({
  params,
}: {
  params: { product: string; category: string };
}) => {
  const getCategoriesName = await getCategories();
  const categories = getCategoriesName.data.categories;
  const category = categories.find(
    (el: ICategory) => el.slugname === params.category,
  );
  const categoryId = category?._id;

  let products;
  let product;

  if (Number(params.product.split("D")[1])) {
    products = await categoryProductsRequest(
      categoryId,
      Number(params.product.split("D")[1]),
    );
    if (products.data.products.length === 0) throw new Error("Not Found");
  } else {
    products = await categoryProductsRequest(categoryId);
    product = await findProductBySlugname(params.product);
    if (!product[0]) throw new Error("Not Found");
  }

  return params.product !== `page%3D${products.page}` ? (
    <div className="mx-5 mt-5">
      <div className="grid grid-cols-1 justify-center gap-5 md:grid-cols-2">
        <div>
          <SwiperComponent data={product[0].images} />
        </div>
        <div>
          <p className="mb-5 whitespace-nowrap text-right text-xl font-bold text-brown-900 dark:text-brown-200">
            {product[0].name}
          </p>
          <div className="mb-8">
            <BreadcrumbComponent product={product[0]} />
          </div>
          <p className="mb-5 whitespace-nowrap text-right font-IRANSans text-3xl font-bold text-gray-800 dark:text-white">
            {product[0].price?.toLocaleString()}{" "}
            <span className="font-IRANSans text-lg font-bold text-gray-800 dark:text-white">
              تومان
            </span>
          </p>
          <div className="inline-flex gap-x-5">
            <ProductCountComponent product={product[0]} />
            <AddToCartButton category={params.category} product={product[0]} />
          </div>
        </div>
      </div>
      <div>
        <ProductDescription description={product[0].description} />
      </div>
    </div>
  ) : (
    <div>
      <p className="mx-8 mb-6 mt-8 flex justify-center text-3xl font-bold text-brown-800 dark:text-brown-50 md:block">
        {params.category === "coffee" ? " گروه انواع قهوه ◀" : ""}
        {params.category === "tea_herbal" ? "گروه انواع چای و دمنوش ◀" : ""}
        {params.category === "snacks" ? " گروه انواع تنقلات و نوشیدنی ◀" : ""}
        {params.category === "chocolate" ? "گروه انواع شکلات ◀" : ""}
      </p>
      <div className="grid grid-cols-1 gap-4 px-4 py-2 md:grid-cols-2 lg:grid-cols-3">
        {products.data.products.map((el: IProduct) => (
          <Link key={el.name} href={`/${params.category}/${el.slugname}`}>
            <CardComponent
              name={el.name}
              price={el.price}
              thumbnail={el.thumbnail}
              slugname={el.slugname}
            />
          </Link>
        ))}
      </div>
      <div className="mb-8 mt-10 flex justify-center">
        <PaginationServerSide
          page={products.page}
          total_pages={products.total_pages}
          paramsCategory={params.category}
        />
      </div>
    </div>
  );
};

export default ProductPage;
