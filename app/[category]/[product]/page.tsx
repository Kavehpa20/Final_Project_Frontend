import { categoryProductsRequest } from "@/apis/axios-config";
import { landingDataFetching } from "@/apis/landing-request";

const ProductPage = async ({
  params,
}: {
  params: { product: string; category: string };
}) => {
  const getCategories = await landingDataFetching();
  const categories = getCategories.data.categories;
  const category = categories.find((el) => el.name === params.category);
  const categoryId = category?._id;
  const products = await categoryProductsRequest(categoryId);
  console.log(products.data.products);
  const product = products.data.products.find(
    (el) => el.slugname === params.product,
  );
  if (!product) throw new Error("Not found");

  return <div>{params.product}</div>;
};

export default ProductPage;
