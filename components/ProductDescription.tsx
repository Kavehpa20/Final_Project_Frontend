"use client";

import React from "react";

import { Card } from "flowbite-react";
import parse from "html-react-parser";

const ProductDescription = ({ description }: { description: string }) => {
  return (
    <Card className="mb-5 mt-8 w-full">
      <h5 className="mb-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
        توضیحات محصول
      </h5>
      <p className="font-normal leading-9 text-gray-700 dark:text-gray-400">
        {parse(description)}
      </p>
    </Card>
  );
};

export default ProductDescription;
