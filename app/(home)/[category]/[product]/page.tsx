import { categoryProductsRequest } from "@/apis/axiosBaseURL";
import { getCategories } from "@/apis/getCategories";
import { findProductBySlugname } from "@/apis/requestsAPI";
import CardComponent from "@/components/Card";
import PaginationServerSide from "@/components/paginationServerSide/paginationServerSide";
import Link from "next/link";

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
    <CardComponent
      name={product[0].name}
      price={product[0].price}
      thumbnail={product[0].thumbnail}
      slugname={product[0].slugname}
    />
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
