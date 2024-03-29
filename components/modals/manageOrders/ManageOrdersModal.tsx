"use client";

import { Button, CustomFlowbiteTheme, Modal } from "flowbite-react";
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

import { getInventoryAndPrices, getOrderById } from "@/apis/requestsAPI";
import { useAdminPanel } from "@/contexts/AdminPanelContext";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { TableTheme } from "../manageOrders/TableTheme";
import PaginationComponent from "../manageOrders/pagination/PaginationComponent";

const ModalManagerOrdersTheme: CustomFlowbiteTheme = {
  modal: {
    root: {
      base: "fixed inset-x-0 top-0 z-50 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
      show: {
        on: "flex bg-gray-900 bg-opacity-50 dark:bg-opacity-80",
        off: "hidden",
      },
      sizes: {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        "2xl": "max-w-2xl",
        "3xl": "max-w-3xl",
        "4xl": "max-w-4xl",
        "5xl": "max-w-5xl",
        "6xl": "max-w-6xl",
        "7xl": "max-w-7xl",
      },
      positions: {
        "top-left": "items-start justify-start",
        "top-center": "items-start justify-center",
        "top-right": "items-start justify-end",
        "center-left": "items-center justify-start",
        center: "items-center justify-center",
        "center-right": "items-center justify-end",
        "bottom-right": "items-end justify-end",
        "bottom-center": "items-end justify-center",
        "bottom-left": "items-end justify-start",
      },
    },
    content: {
      base: "relative h-full w-full p-4 md:h-auto",
      inner:
        "relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-gray-600",
    },
    body: {
      base: "flex-1 overflow-auto px-4 py-2",
      popup: "pt-0",
    },
    header: {
      base: "flex items-start justify-between rounded-t border-b p-5 dark:border-gray-600",
      popup: "border-b-0 p-2",
      title: "text-xl font-medium text-gray-900 dark:text-white",
      close: {
        base: "inline-flex items-start items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white",
        icon: "h-5 w-5",
      },
    },
    footer: {
      base: "flex items-center justify-center space-x-2 rounded-b border-gray-200 p-6 dark:border-gray-600",
      popup: "border-t",
    },
  },
};

const moment = require("moment-jalaali");

const ManageOrdersModal = () => {
  const { openOrdersModal, setOpenOrdersModal, currentPageOrders, orderId } =
    useAdminPanel();

  const orderDetailsData = async () => {
    try {
      const orderDetails = await getOrderById(orderId as string);
      return orderDetails;
    } catch (error) {
      console.log(error);
    }
  };

  const { isPending, isError, error, data, isFetching } = useQuery({
    queryKey: ["orderDetailsData", { activeOrder: orderId }],
    queryFn: async () => await orderDetailsData(),
    enabled: Boolean(orderId),
  });

  // !isPending && !isError && console.log(data);
  // console.log(orderId);

  return orderId ? (
    <Flowbite theme={{ theme: ModalManagerOrdersTheme }}>
      {isPending ? (
        <div>
          {/* <span className="text-lg text-gray-800 dark:text-white">
            {" "}
            در حال بارگذاری{" "}
          </span>
          <Spinner aria-label="Large spinner example" size="lg" /> */}
        </div>
      ) : isError ? (
        <div>Error: {error?.message}</div>
      ) : (
        <Modal
          dismissible
          show={openOrdersModal}
          onClose={() => setOpenOrdersModal(false)}
          size="3xl"
        >
          <Modal.Header>نمایش سفارش</Modal.Header>
          <Modal.Body>
            <div className="space-y-6 text-center">
              <p className="text-base font-semibold leading-relaxed text-brown-900 dark:text-brown-200">
                نام مشتری: <span>{data.user.firstname}</span>
                <span> </span>
                <span>{data.user.lastname} 🧑🏻</span>
              </p>
              <p className="text-base font-semibold leading-relaxed text-brown-900 dark:text-brown-200">
                آدرس: <span>{data.user.address} 📌</span>
              </p>
              <p className="text-base font-semibold leading-relaxed text-brown-900 dark:text-brown-200">
                تلفن: <span>{data.user.phoneNumber} 📞</span>
              </p>
              <p className="text-base font-semibold leading-relaxed text-brown-900 dark:text-brown-200">
                زمان تحویل:{" "}
                <span>
                  {moment(data.deliveryDate.split("T")[1], "HH:mm").format(
                    "HH:mm",
                  )}
                  ⌚
                </span>{" "}
                <span>
                  {moment(data.deliveryDate.split("T")[0], "YYYY-MM-DD").format(
                    "jYYYY/jMM/jDD",
                  )}
                  📅
                </span>
              </p>
              <p className="text-base font-semibold leading-relaxed text-brown-900 dark:text-brown-200">
                زمان سفارش:{" "}
                <span>
                  {moment(data.createdAt.split("T")[1], "HH:mm").format(
                    "HH:mm",
                  )}
                  ⌚
                </span>{" "}
                <span>
                  {moment(data.createdAt.split("T")[0], "YYYY-MM-DD").format(
                    "jYYYY/jMM/jDD",
                  )}
                  📅
                </span>
              </p>
            </div>
            {isFetching ? (
              <div>
                <span className="text-base font-semibold leading-relaxed text-brown-900 dark:text-brown-200">
                  {" "}
                  در حال بارگذاری{" "}
                </span>
                <Spinner aria-label="Large spinner example" size="lg" />
              </div>
            ) : null}
            <Flowbite theme={{ theme: TableTheme }}>
              <div className="mx-4 mt-8 overflow-x-auto">
                <Table striped>
                  <TableHead>
                    <TableHeadCell>کالا</TableHeadCell>
                    <TableHeadCell>قیمت</TableHeadCell>
                    <TableHeadCell>موجودی</TableHeadCell>
                  </TableHead>
                  {data.products.map((product: IProducts) => (
                    <TableBody className="divide-y" key={product.product._id}>
                      <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {product.product.name}
                        </TableCell>
                        <TableCell className="font-IRANSans">
                          {product.product.price.toLocaleString()}
                        </TableCell>
                        <TableCell className="font-IRANSans">
                          {product.count}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  ))}
                </Table>
                {/* {isFetching ? (
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
              )} */}
              </div>
            </Flowbite>
          </Modal.Body>
          <Modal.Footer>
            {!data.deliveryStatus ? (
              <Button color="success" onClick={() => setOpenOrdersModal(false)}>
                تحویل شد
              </Button>
            ) : (
              <p className="text-lg font-bold leading-relaxed text-brown-900 dark:text-brown-200">
                زمان تحویل به مشتری:{" "}
                <span>
                  {moment(data.deliveryDate.split("T")[1], "HH:mm").format(
                    "HH:mm",
                  )}
                  ⌚
                </span>{" "}
                <span>
                  {moment(data.deliveryDate.split("T")[0], "YYYY-MM-DD").format(
                    "jYYYY/jMM/jDD",
                  )}
                  📅
                </span>
              </p>
            )}
          </Modal.Footer>
        </Modal>
      )}
    </Flowbite>
  ) : (
    ""
  );
};

export default ManageOrdersModal;
