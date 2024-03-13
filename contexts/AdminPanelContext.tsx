"use client";

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
      }}
    >
      {children}
    </AdminPanelContext.Provider>
  );
};

const useAdminPanel = () => useContext(AdminPanelContext);

export { AdminPanelProvider, useAdminPanel };
