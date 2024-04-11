"use client";

import { useAdminPanel } from "@/contexts/AdminPanelContext";
import { Flowbite, Pagination } from "flowbite-react";
import { PaginationTheme } from "./PaginationTheme";

const PaginationComponent = ({ totalPages }: { totalPages: number }) => {
  const { currentPage, onPageChange } = useAdminPanel();

  return (
    <Flowbite theme={{ theme: PaginationTheme }}>
      <div className="flex justify-center overflow-x-auto">
        <Pagination
          previousLabel="صفحه قبل"
          nextLabel="صفحه بعد"
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          showIcons={false}
        />
      </div>
    </Flowbite>
  );
};

export default PaginationComponent;
