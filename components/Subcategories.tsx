"use client";

import React from "react";
import Image from "next/image";

import { getSubcategoryByCategory } from "@/apis/requestsAPI";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Spinner, Card } from "flowbite-react";
import PaginationServerSide from "./paginationServerSide/paginationServerSide";
import Link from "next/link";

const Subcategories = ({ categoryId }: { categoryId: string }) => {
  const subcategoriesList = async (id: string) => {
    try {
      const subcategories = await getSubcategoryByCategory(id);
      return subcategories;
    } catch (error) {
      // console.log(error.message);
    }
  };

  const { isPending, isError, error, data, isFetching } = useQuery({
    queryKey: ["subcategoriesList"],
    queryFn: () => subcategoriesList(categoryId),
    placeholderData: keepPreviousData,
  });

  return isPending ? (
    <div>
    </div>
  ) : isError ? (
    <div>Error: {error?.message}</div>
  ) : (
    <div>
      <div className="mx-3 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {data.data.subcategories.map((subcat: ISubcategories) => (
          <Link
            className="min-w-sm min-h-24"
            key={subcat._id}
            href={subcat.slugname}
          >
            <Card
              className="max-w-sm overflow-hidden"
              renderImage={() => (
                <Image
                  width={500}
                  height={500}
                  src={`/Assets/pictures/${subcat.slugname}.jpg`}
                  alt={`${subcat.name}`}
                  className="h-56"
                />
              )}
            >
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {subcat.name}
              </h5>
            </Card>
          </Link>
        ))}
      </div>
      {data.total_pages > 1 ? (
        <PaginationServerSide page={data.page} total_pages={data.total_pages} />
      ) : (
        ""
      )}
    </div>
  );
};

export default Subcategories;
