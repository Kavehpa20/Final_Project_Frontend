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
import { getOrders, ordersDeliveryFilter } from "@/apis/requestsAPI";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { IOrders } from "@/utils/types/global";
import TableName from "../../forms/TableName";
import { useAdminPanel } from "@/contexts/AdminPanelContext";
import PaginationComponent from "../../pagination/PaginationComponent";

const moment = require("moment-jalaali");
let page: number = 2;

const NotDeliveryOrdersTable = () => {
  const { currentPage } = useAdminPanel();

  const { selectedValue, setSelectedValue, handleRadioChange } =
    useAdminPanel();

  const getOrdersData = async () => {
    try {
      const ordersList = await ordersDeliveryFilter(false, currentPage);

      return ordersList;
    } catch (error) {
      // console.log(error.message);
    }
  };

  const { isPending, isError, error, data, isFetching, isPlaceholderData } =
    useQuery({
      queryKey: ["ordersList", currentPage],
      queryFn: getOrdersData,
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
            <TableHeadCell>نام کاربر</TableHeadCell>
            <TableHeadCell>مجموع مبلغ</TableHeadCell>
            <TableHeadCell>زمان سفارش</TableHeadCell>
            <TableHeadCell>
              <span className="sr-only">بررسی سفارش</span>
            </TableHeadCell>
          </TableHead>
          {data.data.orders.map((order: IOrders) => (
            <TableBody className="divide-y" key={order._id}>
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {/* <TableName id={order.user} /> */}
                  {order.user}
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

export default NotDeliveryOrdersTable;
