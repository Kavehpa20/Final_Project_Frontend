import { TableTheme } from "../../../forms/TableTheme";
import {
  Flowbite,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";

import { useAdminPanel } from "@/contexts/AdminPanelContext";
import PaginationComponent from "../../../pagination/PaginationComponent";
import TableCellFullName from "./TableCellFullName";

const moment = require("moment-jalaali");
let page: number = 2;

const DeliveryOrdersTable = () => {
  const { OrdersDeliveryData } = useAdminPanel();

  // if (!isPlaceholderData && data) {
  //   setCurrentPage((currentPage: number) => currentPage + 1);
  // }

  return OrdersDeliveryData.isPending ? (
    <div>
      <span className="text-lg text-gray-800 dark:text-white"> Loading </span>
      <Spinner aria-label="Large spinner example" size="lg" />
    </div>
  ) : OrdersDeliveryData.isError ? (
    <div>Error: {OrdersDeliveryData.error.message}</div>
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
          {OrdersDeliveryData.data.data.orders.map(
            (order: IOrders, index: number) => (
              <TableBody className="divide-y" key={order._id}>
                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <TableCellFullName index={index} />
                  </TableCell>
                  <TableCell className="font-IRANSans">
                    {order.totalPrice.toLocaleString()}
                  </TableCell>
                  <TableCell>
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
              </TableBody>
            ),
          )}
        </Table>
        {OrdersDeliveryData.isFetching ? (
          <>
            <span className="text-lg text-gray-800 dark:text-white">
              {" "}
              Loading{" "}
            </span>
            <Spinner aria-label="Large spinner example" size="lg" />
          </>
        ) : null}{" "}
        {OrdersDeliveryData.data.total_pages === 1 ? (
          ""
        ) : (
          <PaginationComponent
            totalPages={OrdersDeliveryData.data.total_pages}
          />
        )}
      </div>
    </Flowbite>
  );
};

export default DeliveryOrdersTable;
