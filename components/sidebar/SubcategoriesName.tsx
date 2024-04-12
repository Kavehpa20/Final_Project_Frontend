"use client";

import React from "react";
import { getSubcategoryByCategory } from "@/apis/requestsAPI";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Sidebar } from "flowbite-react";
import Link from "next/link";

const SubcategoriesName = ({ categoryId }: { categoryId: string }) => {
  const subcategoriesList = async (id: string) => {
    try {
      const subcategories = await getSubcategoryByCategory(id);
      return subcategories;
    } catch (error) {
      // console.log(error.message);
    }
  };

  const { isPending, isError, error, data, isFetching } = useQuery({
    queryKey: ["subcategoriesList", categoryId],
    queryFn: () => subcategoriesList(categoryId),
    placeholderData: keepPreviousData,
  });

  return isPending ? (
    <div></div>
  ) : isError ? (
    <div>Error: {error?.message}</div>
  ) : (
    data.data.subcategories.map((subcat: ISubcategories) => (
      <Link key={subcat._id} href={subcat.slugname}>
        <Sidebar.Item>{subcat.name}</Sidebar.Item>
      </Link>
    ))
  );
};

export default SubcategoriesName;
