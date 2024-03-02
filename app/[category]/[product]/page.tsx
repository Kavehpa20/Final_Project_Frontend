import categories from "@/components/temp/categories.json";

const ProductPage = ({
  params,
}: {
  params: { product: string; category: string };
}) => {
  const category = categories.find((el) => params.category === el.path);
  const product = category?.products.find(
    (el) => el.id === Number(params.product),
  );
  if (!product) throw new Error("Not found");

  return <div>{product?.type}</div>;
};

export default ProductPage;
