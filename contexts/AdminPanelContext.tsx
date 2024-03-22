"use client";

import { getCategories } from "@/apis/getCategories";
import {
  getInventoryAndPrices,
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

  function onCloseAddingModal() {
    setShowAddingModal(false);
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

  const getCategoriesName = async () => {
    try {
      const categories = await getCategories();
      return categories.data.categories;
    } catch (error) {
      // console.log(error.message);
    }
  };

  const CategoriesNameData = useQuery({
    queryKey: ["CategoriesNameData"],
    queryFn: getCategoriesName,
    placeholderData: keepPreviousData,
  });

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
        onCloseAddingModal,
        CategoriesNameData,
      }}
    >
      {children}
    </AdminPanelContext.Provider>
  );
};

const useAdminPanel = () => useContext(AdminPanelContext);

export { AdminPanelProvider, useAdminPanel };
