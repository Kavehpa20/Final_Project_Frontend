"use client";

import { Banner } from "flowbite-react";
import { HiX } from "react-icons/hi";

export default function BannerComponent() {
  return (
    <Banner>
      <div className="mb-2 flex w-full justify-between border-y border-gray-200 bg-gray-100 p-4 dark:border-gray-900 dark:bg-gray-900">
        <div className="mx-auto flex items-center">
          <p className="flex items-center text-sm font-normal text-brown-500 dark:text-brown-100">
            <span className="text-2xl font-semibold">
              به فروشگاه قهوه آلفا خوش آمدید.
            </span>
          </p>
        </div>
        <Banner.CollapseButton
          color="gray"
          className="border-0 bg-transparent text-gray-500 dark:text-gray-400"
        >
          <HiX className="h-4 w-4" />
        </Banner.CollapseButton>
      </div>
    </Banner>
  );
}
