import React, { useEffect, useState } from "react";
import {
  Flowbite,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { TableTheme } from "../../../forms/TableTheme";

import { useAdminPanel } from "@/contexts/AdminPanelContext";
import PaginationComponent from "../../../pagination/PaginationComponent";
import TableCellFullName from "./TableCellFullName";

const moment = require("moment-jalaali");
let page: number = 2;

const OrdersTable = () => {
  const { OrdersTableData } = useAdminPanel();

  return OrdersTableData.isPending ? (
    <p>Loading ...</p>
  ) : OrdersTableData.isError ? (
    <div>Error: {OrdersTableData.error.message}</div>
  ) : (
    <Flowbite theme={{ theme: TableTheme }}>
      <div className="mx-4 mt-2 overflow-x-auto">
        <Table striped>
          <TableHead>
            <TableHeadCell>نام کاربر</TableHeadCell>
            <TableHeadCell>مجموع مبلغ</TableHeadCell>
            <TableHeadCell>زمان سفارش</TableHeadCell>
            <TableHeadCell>
              <span className="sr-only">بررسی سفارش</span>
            </TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            {OrdersTableData.data.data.orders.map((order, index: number) => (
              <TableRow
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={order._id}
              >
                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  <TableCellFullName index={index} />
                </TableCell>
                <TableCell className="font-IRANSans">
                  {order.totalPrice.toLocaleString()}
                </TableCell>
                <TableCell className="font-IRANSans">
                  {moment(order.createdAt.split("T")[0], "YYYY-MM-DD").format(
                    "jYYYY/jMM/jDD",
                  )}
                </TableCell>
                <TableCell>
                  <a
                    href="#"
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    بررسی سفارش
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {OrdersTableData.isFetching ? <span> Loading...</span> : null}{" "}
        {OrdersTableData.data.total_pages === 1 ? (
          ""
        ) : (
          <PaginationComponent totalPages={OrdersTableData.data.total_pages} />
        )}
      </div>
    </Flowbite>
  );
};

export default OrdersTable;
