import React, { useEffect } from "react";
import {
  Flowbite,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { TableTheme } from "../../forms/TableTheme";
import { getInventoryAndPrices, getOrders } from "@/apis/requestsAPI";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { IOrders } from "@/utils/types/global";
import { useAdminPanel } from "@/contexts/AdminPanelContext";
import PaginationComponent from "../../pagination/PaginationComponent";

const moment = require("moment-jalaali");

const InventoryAndPrices = () => {
  const { currentPage } = useAdminPanel();

  const inventoryAndPricesReq = async () => {
    try {
      const InventoryAndPricesList = await getInventoryAndPrices(currentPage);
      return InventoryAndPricesList;
    } catch (error) {
      // console.log(error.message);
    }
  };

  const { isPending, isError, error, data, isFetching, isPlaceholderData } =
    useQuery({
      queryKey: ["InventoryAndPricesList", currentPage],
      queryFn: inventoryAndPricesReq,
      placeholderData: keepPreviousData,
    });

  // if (!isPlaceholderData && data) {
  //   setCurrentPage((currentPage: number) => currentPage + 1);
  // }

  return isPending ? (
    <p>Loading ...</p>
  ) : isError ? (
    <div>Error: {error.message}</div>
  ) : (
    <Flowbite theme={{ theme: TableTheme }}>
      <div className="mx-4 mt-2 overflow-x-auto">
        <Table striped>
          <TableHead>
            <TableHeadCell>کالا</TableHeadCell>
            <TableHeadCell>قیمت</TableHeadCell>
            <TableHeadCell>موجودی</TableHeadCell>
          </TableHead>
          {data.data.products.map((product) => (
            <TableBody className="divide-y" key={product._id}>
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {/* <TableName id={order.user} /> */}
                  {product.name}
                </TableCell>
                <TableCell className="font-IRANSans">
                  {product.price.toLocaleString()}
                </TableCell>
                <TableCell className="font-IRANSans">
                  {product.quantity}
                </TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>
        {isFetching ? <span> Loading...</span> : null}{" "}
        {data.total_pages === 1 ? (
          ""
        ) : (
          <PaginationComponent totalPages={data.total_pages} />
        )}
      </div>
    </Flowbite>
  );
};

export default InventoryAndPrices;
