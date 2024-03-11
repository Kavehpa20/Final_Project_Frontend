"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

const AdminPanelContext = createContext<ICreateContext | null>(null);

const AdminPanelProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <AdminPanelContext.Provider value={{ openModal, setOpenModal }}>
      {children}
    </AdminPanelContext.Provider>
  );
};

const useAdminPanel = () => useContext(AdminPanelContext);

export { AdminPanelProvider, useAdminPanel };
