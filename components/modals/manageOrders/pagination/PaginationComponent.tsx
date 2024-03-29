"use client";

import { useAdminPanel } from "@/contexts/AdminPanelContext";
import { Flowbite, Pagination } from "flowbite-react";
import { PaginationTheme } from "./PaginationTheme";

const PaginationComponent = ({ totalPages }: { totalPages: number }) => {
  const { currentPageOrders, setCurrentPageOrders, onPageChangeOrders } =
    useAdminPanel();

  // const onPageChange = (page: number) => setCurrentPage(page);

  return (
    <Flowbite theme={{ theme: PaginationTheme }}>
      <div className="flex justify-center overflow-x-auto">
        <Pagination
          previousLabel="صفحه قبل"
          nextLabel="صفحه بعد"
          currentPage={currentPageOrders}
          totalPages={totalPages}
          onPageChange={onPageChangeOrders}
          showIcons={false}
        />
      </div>
    </Flowbite>
  );
};

export default PaginationComponent;
