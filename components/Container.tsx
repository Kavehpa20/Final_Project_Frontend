"use client";

import React from "react";
import CardComponent from "./Card";
import ProductsHeaderLink from "./ProductsHeaderLink";

function Container() {
  return (
    <>
      <ProductsHeaderLink />
      <div className="grid grid-cols-1 gap-4 px-4 py-2 md:grid-cols-2 lg:grid-cols-3">
        <CardComponent />
        <CardComponent />
        <CardComponent />
      </div>
    </>
  );
}

export default Container;
