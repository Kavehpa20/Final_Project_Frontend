"use client";

import { createContext, useContext, useState } from "react";

import { getCategories } from "@/apis/getCategories";
import {
  getInventoryAndPrices,
  getOrders,
  ordersDeliveryFilter,
} from "@/apis/requestsAPI";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const AdminPanelContext = createContext<ICreateContext>({} as ICreateContext);

const AdminPanelProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageOrders, setCurrentPageOrders] = useState(1);
  const [selectedValue, setSelectedValue] = useState("option1");
  const [showAddingModal, setShowAddingModal] = useState(false);
  const [showEditingModal, setShowEditingModal] = useState(false);
  const [productId, setProductId] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [openOrdersModal, setOpenOrdersModal] = useState(false);
  // const [categoryAndSubcategoryList, setCategoryAndSubcategoryList] =
  //   useState(null);
  const [productDetail, setProductDetail] = useState({} as IProduct);

  function onCloseAddingModal() {
    setShowAddingModal(false);
  }

  function onCloseEditingModal() {
    setShowEditingModal(false);
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
      // const myProduct = CategoryAndSubcategoryList.data.products.find(
      //   (product) => product._id === productId,
      // );
      // if (myProduct) {
      //   setCategoryAndSubcategoryList(myProduct.updatedAt);
      //   console.log(categoryAndSubcategoryList);
      // }

      console.log(productId);

      return CategoryAndSubcategoryList;
    } catch (error) {
      // console.log(error.message);
    }
  };

  const CategoryAndSubcategory = useQuery({
    queryKey: [
      "CategoryAndSubcategory",
      currentPage,
      productId,
      isLoading,
      // categoryAndSubcategoryList,
    ],
    queryFn: getCategoryAndSubcategoryData,
    placeholderData: keepPreviousData,
    // enabled: Boolean(productId),
  });

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const onPageChangeOrders = (page: number) => {
    setCurrentPageOrders(page);
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
    queryKey: ["CategoriesNameData", currentPage, productId],
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
        openDeleteModal,
        setOpenDeleteModal,
        productId,
        setProductId,
        showEditingModal,
        setShowEditingModal,
        onCloseEditingModal,
        openOrdersModal,
        setOpenOrdersModal,
        currentPageOrders,
        setCurrentPageOrders,
        onPageChangeOrders,
        orderId,
        setOrderId,
        productDetail,
        setProductDetail,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AdminPanelContext.Provider>
  );
};

const useAdminPanel = () => useContext(AdminPanelContext);

export { AdminPanelProvider, useAdminPanel };
