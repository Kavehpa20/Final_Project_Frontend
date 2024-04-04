"use client";

import { Breadcrumb, Flowbite, Spinner } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import type { CustomFlowbiteTheme } from "flowbite-react";
import { getCategoryNameById } from "@/apis/requestsAPI";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const BreadcrumbTheme: CustomFlowbiteTheme = {
  breadcrumb: {
    root: {
      base: "",
      list: "flex",
    },
    item: {
      base: "group flex items-center",
      chevron: "mx-1 h-4 w-4 text-gray-400 group-first:hidden md:mx-2",
      href: {
        off: "flex items-center text-sm font-medium text-gray-500 dark:text-gray-400",
        on: "flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white",
      },
      icon: "ml-2 h-4 w-4",
    },
  },
};

const BreadcrumbComponent = ({ product }: IProducts) => {
  const getCategoryName = async () => {
    try {
      const categoryName = await getCategoryNameById(product.category as any);
      return categoryName;
    } catch (error) {
      // console.log(error.message);
    }
  };

  const { isPending, data, isError, error } = useQuery({
    queryKey: ["OrdersDeliveryData", product],
    queryFn: getCategoryName,
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
    <Flowbite theme={{ theme: BreadcrumbTheme }}>
      <Breadcrumb aria-label="Default breadcrumb example">
        <Breadcrumb.Item href="/" icon={HiHome}>
          صفحه اصلی
        </Breadcrumb.Item>
        <Breadcrumb.Item href={`/${data.slugname}`}>
          {data.name}
        </Breadcrumb.Item>
        <Breadcrumb.Item>{product.name}</Breadcrumb.Item>
      </Breadcrumb>
    </Flowbite>
  );
};

export default BreadcrumbComponent;
