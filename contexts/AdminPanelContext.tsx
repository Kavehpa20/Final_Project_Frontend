"use client";

import {
  getInventoryAndPrices,
  getNameSubcategoryById,
  getOrders,
  ordersDeliveryFilter,
} from "@/apis/requestsAPI";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { createContext, useContext, useState } from "react";

const AdminPanelContext = createContext<ICreateContext>({} as ICreateContext);

const AdminPanelProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedValue, setSelectedValue] = useState("option1");
  const [showAddingModal, setShowAddingModal] = useState(false);
  const [email, setEmail] = useState("");

  function onCloseAddingModal() {
    setShowAddingModal(false);
    setEmail("");
  }

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

  const getCategoryAndSubcategoryData = async () => {
    try {
      const CategoryAndSubcategoryList =
        await getInventoryAndPrices(currentPage);

      return CategoryAndSubcategoryList;
    } catch (error) {
      // console.log(error.message);
    }
  };

  const CategoryAndSubcategory = useQuery({
    queryKey: ["CategoryAndSubcategory", currentPage],
    queryFn: getCategoryAndSubcategoryData,
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
        NoOrdersDeliveryData,
        CategoryAndSubcategory,
        showAddingModal,
        setShowAddingModal,
        email,
        setEmail,
        onCloseAddingModal,
      }}
    >
      {children}
    </AdminPanelContext.Provider>
  );
};

const useAdminPanel = () => useContext(AdminPanelContext);

export { AdminPanelProvider, useAdminPanel };
