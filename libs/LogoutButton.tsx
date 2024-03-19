"use client";

import { useAdminPanel } from "@/contexts/AdminPanelContext";

export default function LogoutButton() {
  const { setOpenModal } = useAdminPanel();

  return (
    <button
      type="button"
      onClick={() => {
        setOpenModal(true);
      }}
      className="ml-2 inline-flex items-center justify-center border-b-2 border-transparent px-4 pt-1 text-sm font-normal text-brown-900 hover:border-brown-200 hover:text-brown-500 dark:text-brown-200 dark:hover:border-brown-50 dark:hover:text-brown-100"
    >
      <span className="ml-1 whitespace-nowrap">خروج</span>
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
          d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
        />
      </svg>
    </button>
  );
}
