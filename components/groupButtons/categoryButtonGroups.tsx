"use client";

import React from "react";
import {
  Avatar,
  Button,
  ButtonGroup,
  CustomFlowbiteTheme,
  Flowbite,
  Spinner,
} from "flowbite-react";
import { getCategories } from "@/apis/getCategories";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { baseUrl } from "@/apis/axiosBaseURL";

const GroupButtonsTheme: CustomFlowbiteTheme = {
  buttonGroup: {
    base: "inline-flex",
    position: {
      none: "",
      start: "rounded-l-none border-l-0 focus:ring-2",
      middle: "rounded-none pl-0 focus:ring-2",
      end: "rounded-r-none border-r-0 pl-0 focus:ring-2",
    },
  },
};

const CategoryButtonGroups = () => {
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

  return (
    <Flowbite theme={{ theme: GroupButtonsTheme }}>
      {isPending ? (
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
        <ButtonGroup>
          {data.data.categories.map((category: ICategory) => (
            <Button className="p-0" color="gray" key={category._id}>
              <Link
                className="flex items-center"
                href={`/${category.slugname}`}
              >
                <Avatar
                  className="mx-2"
                  img={`${baseUrl}/images/categories/icons/${category.icon}`}
                  bordered
                  rounded
                  color="gray"
                  size="sm"
                />
                {category.name}
              </Link>
            </Button>
          ))}
        </ButtonGroup>
      )}
    </Flowbite>
  );
};

export default CategoryButtonGroups;
