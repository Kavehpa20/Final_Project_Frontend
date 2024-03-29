import { useState } from "react";
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
import { classNames } from "@/libs/tools";

const moment = require("moment-jalaali");

const InventoryAndPrices = () => {
  const { currentPage } = useAdminPanel();
  const [hidden, setHidden] = useState(false);
  const [productId, setProductId] = useState(null);

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
          <TableBody className="divide-y">
            {data.data.products.map((product: IProduct) => (
              <TableRow
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={product._id}
              >
                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {product.name}
                </TableCell>
                <TableCell
                  id={product._id}
                  className={classNames("cursor-pointer font-IRANSans")}
                  onClick={(e) => {
                    console.log(e.target.id);
                    setHidden(true);
                  }}
                  onKeyDown={(e) => console.log(e.target)}
                >
                  <span id={product._id} className={hidden ? "hidden" : ""}>
                    {product.price.toLocaleString()}
                  </span>
                  <input
                    className={!hidden ? "hidden" : ""}
                    onChange={(e) => e.target.value}
                    value={product.price.toLocaleString()}
                  />
                </TableCell>

                <TableCell className="font-IRANSans">
                  {product.quantity}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
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
