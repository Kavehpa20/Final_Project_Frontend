import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  return (
    <Disclosure as="nav" className="">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
            <div className="flex h-16 w-full items-center ">
              <div className="flex w-full items-center justify-between">
                <div className="flex grow items-center">
                  <Image
                    width={1000}
                    height={1000}
                    className="block h-16 w-auto lg:hidden"
                    src="/Assets/pictures/alpha-coffee-logo.png"
                    alt="Logo"
                  />

                  <Image
                    width={1000}
                    height={1000}
                    className="hidden h-16 w-auto lg:block"
                    src="/Assets/pictures/alpha-coffee-logo.png"
                    alt="Logo"
                  />
                </div>

                <div className="hidden grow sm:flex">
                  <p className="text-right text-4xl font-black text-brown-900">
                    قهوه آلفا
                  </p>
                </div>

                <div className="hidden items-center justify-between sm:flex">
                  <a
                    href="#"
                    className="text-brown-500 hover:border-brown-300 ml-6 inline-flex items-center border-b-2 border-transparent px-4 pt-1 text-sm font-normal hover:text-brown-900"
                  >
                    <span> ادمین</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-brown-500 hover:border-brown-300 ml-6 inline-flex items-center border-b-2 border-transparent px-4 pt-1 text-sm font-normal hover:text-brown-900"
                  >
                    <span> کاربر</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                      />
                    </svg>
                  </a>
                </div>
                <a
                  href="#"
                  className="text-brown-500 hover:border-brown-300 ml-6 inline-flex items-center border-b-2 border-transparent px-4 pt-1 text-sm font-normal hover:text-brown-900"
                >
                  <span>سبد خرید </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                  </svg>
                </a>
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
            <div className="mt-4 space-y-4 bg-gray-200 py-4 pt-2">
              <Disclosure.Button
                as="a"
                href="#"
                className="hover:border-brown-500 hover:bg-brown-50 inline-flex w-full border-l-4 py-2 pl-3 pr-4 text-base font-medium hover:text-brown-900"
              >
                <span> ادمین</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="hover:border-brown-500 hover:bg-brown-50 inline-flex w-full border-l-4 py-2 pl-3 pr-4 text-base font-medium hover:text-brown-900"
              >
                <span> کاربر</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
