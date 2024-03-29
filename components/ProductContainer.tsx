import React from "react";
import CardComponent from "./Card";

const ProductContainer = async ({ data }: { data: [IProduct] }) => {
  const res = await data;
  return (
    <>
      <div className="grid grid-cols-1 gap-4 px-4 py-2 md:grid-cols-2 lg:grid-cols-3">
        {res.map((product: IProduct) => (
          <CardComponent
            key={product.name}
            name={product.name}
            price={product.price}
            thumbnail={product.thumbnail}
          />
        ))}
      </div>
    </>
  );
};

export default ProductContainer;
