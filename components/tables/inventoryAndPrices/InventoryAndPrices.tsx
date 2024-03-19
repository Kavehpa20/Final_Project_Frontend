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

import { getInventoryAndPrices } from "@/apis/requestsAPI";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useAdminPanel } from "@/contexts/AdminPanelContext";
import { TableTheme } from "../../forms/TableTheme";
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

  const { isPending, isError, error, data, isFetching } = useQuery({
    queryKey: ["InventoryAndPricesList", currentPage],
    queryFn: inventoryAndPricesReq,
    placeholderData: keepPreviousData,
  });

  return isPending ? (
    <div>
      <span className="text-lg text-gray-800 dark:text-white">
        {" "}
        در حال بارگذاری{" "}
      </span>
      <Spinner aria-label="Large spinner example" size="lg" />
    </div>
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
          {data.data.products.map((product: IProduct) => (
            <TableBody className="divide-y" key={product._id}>
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
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
        {isFetching ? (
          <>
            <span className="text-lg text-gray-800 dark:text-white">
              {" "}
              در حال بارگذاری{" "}
            </span>
            <Spinner aria-label="Large spinner example" size="lg" />
          </>
        ) : null}{" "}
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
