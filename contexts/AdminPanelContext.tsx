"use client";

import { getOrders, ordersDeliveryFilter } from "@/apis/requestsAPI";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { createContext, useContext, useState } from "react";

const AdminPanelContext = createContext<ICreateContext | null>(null);

const AdminPanelProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedValue, setSelectedValue] = useState("option1");

  const getOrdersData = async () => {
    try {
      const ordersList = await getOrders(currentPage);

      return ordersList;
    } catch (error) {
      // console.log(error.message);
    }
  };

  const OrdersTableData = useQuery({
    queryKey: ["ordersList", currentPage],
    queryFn: getOrdersData,
    placeholderData: keepPreviousData,
  });

  const getOrdersDeliveryData = async () => {
    try {
      const ordersList = await ordersDeliveryFilter(true, currentPage);
      return ordersList;
    } catch (error) {
      // console.log(error.message);
    }
  };

  const OrdersDeliveryData = useQuery({
    queryKey: ["OrdersDeliveryData", currentPage],
    queryFn: getOrdersDeliveryData,
    placeholderData: keepPreviousData,
  });

  const getNoOrdersDeliveryData = async () => {
    try {
      const ordersList = await ordersDeliveryFilter(false, currentPage);

      return ordersList;
    } catch (error) {
      // console.log(error.message);
    }
  };

  const NoOrdersDeliveryData = useQuery({
    queryKey: ["NoOrdersDeliveryData", currentPage],
    queryFn: getNoOrdersDeliveryData,
    placeholderData: keepPreviousData,
  });

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <AdminPanelContext.Provider
      value={{
        openModal,
        setOpenModal,
        currentPage,
        setCurrentPage,
        onPageChange,
        selectedValue,
        setSelectedValue,
        handleRadioChange,
        OrdersTableData,
        OrdersDeliveryData,
        NoOrdersDeliveryData
      }}
    >
      {children}
    </AdminPanelContext.Provider>
  );
};

const useAdminPanel = () => useContext(AdminPanelContext);

export { AdminPanelProvider, useAdminPanel };
