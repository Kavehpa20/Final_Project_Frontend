import { categoryProductsRequest } from "@/apis/axios-config";
import { landingDataFetching } from "@/apis/landing-request";
import CardComponent from "@/components/Card";
import { Card } from "flowbite-react";

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
  console.log(product);

  if (!product) throw new Error("Not found");

  return (
    <CardComponent
      name={product.name}
      price={product.price}
      thumbnail={product.thumbnail}
    />
  );
};

export default ProductPage;
