import React from "react";
import CardComponent from "./Card";

const ProductContainer = async ({ data }) => {
  const res = await data;
  return (
    <>
      <div className="grid grid-cols-1 gap-4 px-4 py-2 md:grid-cols-2 lg:grid-cols-3">
        {res.map((el) => (
          <CardComponent
            key={el.name}
            name={el.name}
            price={el.price}
            thumbnail={el.thumbnail}
          />
        ))}
      </div>
    </>
  );
};

export default ProductContainer;
