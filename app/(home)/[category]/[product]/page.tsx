import { categoryProductsRequest } from "@/apis/axiosBaseURL";
import { getCategories } from "@/apis/getCategories";
import CardComponent from "@/components/Card";

const ProductPage = async ({
  params,
}: {
  params: { product: string; category: string };
}) => {
  const getCategoriesName = await getCategories();
  const categories = getCategoriesName.data.categories;
  const category = categories.find((el) => el.slugname === params.category);
  const categoryId = category?._id;
  const products = await categoryProductsRequest(categoryId);
  const product = products.data.products.find(
    (el) => el.slugname === params.product,
  );

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
