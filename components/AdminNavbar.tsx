"use client";

import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { DarkThemeToggle } from "flowbite-react";
import Link from "next/link";
import LogoutButtonMobile from "@/libs/LogoutButtonMobile";
import LogoutButton from "@/libs/LogoutButton";

const AdminNavbar = () => {
  return (
    <Disclosure
      as="nav"
      className="mb-2 rounded-lg bg-gray-50 dark:bg-gray-700"
    >
      {({ open }) => (
        <>
          <div className="mx-auto px-4 py-2 sm:px-6 lg:px-8">
            <div className="flex h-16 w-full items-center ">
              <div className="flex w-full items-center justify-between">
                <Link href="/">
                  <div className="flex grow items-center">
                    <Image
                      width={500}
                      height={500}
                      className="block h-16 w-auto dark:hidden"
                      src="/Assets/pictures/alpha-coffee-logo.png"
                      alt="Logo"
                    />
                    <Image
                      width={500}
                      height={500}
                      className="hidden h-16 w-auto dark:block"
                      src="/Assets/pictures/alpha-coffee-logo-dark.png"
                      alt="Logo"
                    />
                  </div>
                </Link>
                  <Link href="/">
                <div className=" flex grow items-center justify-center">
                    <p className="hidden whitespace-nowrap text-right text-4xl font-black text-brown-900 dark:text-brown-200 sm:block">
                      پنل مدیریت قهوه آلفا
                    </p>
                </div>
                  </Link>

                <div className="hidden items-center justify-between rounded-2xl sm:flex">
                  <Link
                    href="/"
                    className="ml-2 inline-flex items-center justify-center border-b-2 border-transparent px-4 pt-1 text-sm font-normal text-brown-900 hover:border-brown-200 hover:text-brown-500 dark:text-brown-200 dark:hover:border-brown-50 dark:hover:text-brown-100"
                  >
                    <span className="ml-1">خانه</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                      />
                    </svg>
                  </Link>
                  <LogoutButton />
                </div>
                <div className="ml-3">
                  <DarkThemeToggle />
                </div>
              </div>

              <div className="-mr-2 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="mt-4 space-y-4 bg-gray-200 py-4 pt-2 dark:bg-gray-900">
              <Link
                href="/"
                className="dark:hover:border-50 inline-flex w-full border-l-4 py-2 pl-3 pr-4 text-base font-medium text-brown-900 hover:border-brown-500 hover:bg-brown-50 hover:text-brown-500
                    dark:text-brown-200  dark:hover:text-brown-900"
              >
                <span className="ml-2"> خانه</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
              </Link>
              <LogoutButtonMobile />
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default AdminNavbar;
