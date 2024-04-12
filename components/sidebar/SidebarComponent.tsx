"use client";

import React from "react";
import Image from "next/image";

import { Flowbite, Sidebar, Spinner } from "flowbite-react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getCategories } from "@/apis/getCategories";
import SubcategoriesName from "./SubcategoriesName";
import { SidebarTheme } from "./SidebarTheme";

const SidebarComponent = () => {
  const categoriesList = async () => {
    try {
      const categories = await getCategories();
      return categories;
    } catch (error) {
      // console.log(error.message);
    }
  };

  const { isPending, isError, error, data, isFetching } = useQuery({
    queryKey: ["categoriesList"],
    queryFn: categoriesList,
    placeholderData: keepPreviousData,
  });

  return isPending ? (
    <div>
      <span className="text-lg text-gray-800 dark:text-white">
        {" "}
        در حال بارگذاری{" "}
      </span>
      <Spinner aria-label="Large spinner example" size="lg" />
    </div>
  ) : isError ? (
    <div>Error: {error?.message}</div>
  ) : (
    <Flowbite theme={{ theme: SidebarTheme }}>
      <Sidebar aria-label="قهوه آلفا سایدبار (دسته بندی و زیردسته بندی)">
        <Sidebar.Logo img="" href={"http://localhost:3000/"}>
          <div className="flex items-center justify-between">
            {" "}
            <Image
              width={300}
              height={300}
              className="block h-10 w-auto dark:hidden"
              src="/Assets/pictures/alpha-coffee-logo.png"
              alt="Logo"
            />
            <Image
              width={300}
              height={300}
              className="hidden h-10 w-auto dark:block"
              src="/Assets/pictures/alpha-coffee-logo-dark.png"
              alt="Logo"
            />
            <p className="mr-2 text-2xl font-black text-brown-900 dark:text-brown-200">
              قهوه آلفا
            </p>
          </div>
        </Sidebar.Logo>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            {data.data.categories.map((category: ICategory) => (
              <Sidebar.Collapse
                label={category.name}
                href={`http://localhost:3000/${category.slugname}`}
                key={category._id}
              >
                <SubcategoriesName categoryId={category._id} />
              </Sidebar.Collapse>
            ))}
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </Flowbite>
  );
};
export default SidebarComponent;
