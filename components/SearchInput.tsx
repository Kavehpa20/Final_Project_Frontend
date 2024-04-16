import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Spinner } from "flowbite-react";
import { searchSubcategory } from "@/apis/requestsAPI";
import Link from "next/link";

const SearchInput = () => {
  const [searchValue, setSearchValue] = useState("");

  const getCategory = async (name: string) => {
    try {
      const data = await searchSubcategory(name);
      return data.data.subcategories;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch subcategory data");
    }
  };

  const { isFetching, isError, error, data } = useQuery({
    queryKey: ["SubcategoryData", searchValue],
    queryFn: () => getCategory(searchValue),
    enabled: Boolean(searchValue), // Initially disabled
  });

  const handleInputChange = (name: string) => {
    setSearchValue(name);
  };

  return (
    <div>
      <form>
        <label
          htmlFor="default-search"
          className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          جستجو
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
            <svg
              className="h-4 w-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="default-search"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-36 py-4 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="جستجو"
            value={searchValue}
            onChange={(e) => handleInputChange(e.target.value)}
          />
        </div>
      </form>
      {isFetching ? (
        <div>
          <span className="my-5 mr-5 text-lg text-gray-800 dark:text-white">
            {" "}
            در حال بارگذاری{" "}
          </span>
          <Spinner aria-label="Large spinner example" size="lg" />
        </div>
      ) : isError ? (
        <div>Error: {error?.message}</div>
      ) : data ? (
        data.length !== 0 ? (
          data.map((subcat: ISubcategories) => (
            <Link key={subcat._id} href={subcat.slugname}>
              <p className="my-5 mr-5 inline-flex items-center border-b-2 border-transparent text-lg font-normal text-brown-900 hover:border-brown-200 hover:text-brown-500 dark:text-brown-200 dark:hover:border-brown-50 dark:hover:text-brown-100">
                {subcat.name} {"  "} {"◀️"}
              </p>
            </Link>
          ))
        ) : (
          <p className="my-5 mr-5 inline-flex items-center border-b-2 border-transparent text-lg font-normal text-red-600 dark:text-red-500">
            هیچ چیزی یافت نشد !!
          </p>
        )
      ) : (
        <div className="my-5 mr-5 inline-flex items-center border-b-2 border-transparent text-lg font-normal text-red-600 dark:text-red-500"></div>
      )}
    </div>
  );
};

export default SearchInput;
