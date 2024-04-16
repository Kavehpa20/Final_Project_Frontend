"use client";
import React from "react";
import { Button, Flowbite, Modal } from "flowbite-react";
import { useState } from "react";
import SearchInput from "./SearchInput";
import { SearchModalTheme } from "./SearchModalTheme";
import Link from "next/link";

const SearchModal = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
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
        <button
          onClick={() => setOpenModal(true)}
          type="button"
          id="default-search"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-64 py-4 ps-10 text-sm text-gray-900 hover:bg-gray-100 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:hover:bg-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        >
          جستجو
        </button>
      </div>
      <Flowbite theme={{ theme: SearchModalTheme }}>
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>جستجو در قهوه آلفا</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <SearchInput />
              <Link href="/"></Link>
            </div>
          </Modal.Body>
        </Modal>
      </Flowbite>
    </>
  );
};

export default SearchModal;
