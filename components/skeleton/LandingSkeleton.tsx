import { Spinner } from "flowbite-react";
import React from "react";

function LandingSkeleton() {
  return (
    <div role="status" className="animate-pulse">
      <div className="mx-auto mb-2.5 h-2.5 max-w-[640px] rounded-full bg-gray-300 dark:bg-gray-700"></div>
      <div className="mx-auto h-2.5 max-w-[540px] rounded-full bg-gray-300 dark:bg-gray-700"></div>
      <div className="mt-4 flex items-center justify-center">
        <svg
          className="me-4 h-8 w-8 text-gray-200 dark:text-gray-700"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
        </svg>
        <div className="me-3 h-2.5 w-20 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-2 w-24 rounded-full bg-gray-200 dark:bg-gray-700"></div>
      </div>
      <div>
        <span className="text-lg text-gray-800 dark:text-white">
          {" "}
          در حال بارگذاری{" "}
        </span>
        <Spinner aria-label="Large spinner example" size="lg" />
      </div>
    </div>
  );
}

export default LandingSkeleton;
