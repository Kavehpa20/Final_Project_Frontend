import React, { useEffect } from "react";
import {
  Button,
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
import { useAdminPanel } from "@/contexts/AdminPanelContext";
import PaginationComponent from "../../pagination/PaginationComponent";
import { IProduct } from "@/utils/types/global";
import { Avatar } from "flowbite-react";

const moment = require("moment-jalaali");

const AssetsManager = () => {
  const { currentPage } = useAdminPanel();

  const assetsManagerReq = async () => {
    try {
      const assetsList = await getInventoryAndPrices(currentPage);
      return assetsList;
    } catch (error) {
      // console.log(error.message);
    }
  };

  const { isPending, isError, error, data, isFetching, isPlaceholderData } =
    useQuery({
      queryKey: ["assetsManager", currentPage],
      queryFn: assetsManagerReq,
      placeholderData: keepPreviousData,
    });

  return isPending ? (
    <p>Loading ...</p>
  ) : isError ? (
    <div>Error: {error.message}</div>
  ) : (
    <Flowbite theme={{ theme: TableTheme }}>
      <div className="mx-4 mt-2 overflow-x-auto">
        <Table striped>
          <TableHead>
            <TableHeadCell>تصویر</TableHeadCell>
            <TableHeadCell>نام کالا</TableHeadCell>
            <TableHeadCell>دسته بندی</TableHeadCell>
            <TableHeadCell></TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            {data.data.products.map((product: IProduct) => (
              <TableRow
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={product._id}
              >
                <TableCell>
                  <Avatar
                    img={`http://localhost:8000/images/products/thumbnails/${product.thumbnail}`}
                    rounded
                    bordered
                    color="gray"
                    size="lg"
                  />
                </TableCell>
                <TableCell className="font-IRANSans">{product.name}</TableCell>
                <TableCell className="font-IRANSans">
                  {product.quantity}
                </TableCell>
                <TableCell>
                  <div className="inline-flex gap-x-5">
                    <Button color="failure" pill>
                      حذف
                    </Button>
                    <Button color="warning" pill>
                      ویرایش
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
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

export default AssetsManager;
