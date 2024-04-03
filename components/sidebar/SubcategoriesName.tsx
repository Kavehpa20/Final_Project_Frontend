"use client";

import React from "react";
import { getSubcategoryByCategory } from "@/apis/requestsAPI";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Spinner, Sidebar } from "flowbite-react";

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
    <div>
      {/* <span className="text-lg text-gray-800 dark:text-white">
        {" "}
        در حال بارگذاری{" "}
      </span>
      <Spinner aria-label="Large spinner example" size="lg" /> */}
    </div>
  ) : isError ? (
    <div>Error: {error?.message}</div>
  ) : (
    data.data.subcategories.map((subcat: ISubcategories) => (
      <Sidebar.Item key={subcat._id} href={subcat.slugname}>
        {subcat.name}
      </Sidebar.Item>
    ))
  );
};

export default SubcategoriesName;
