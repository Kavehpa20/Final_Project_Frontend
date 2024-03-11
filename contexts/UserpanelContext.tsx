"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";


const UserPanelContext = createContext<IUserPanelContext | null>(null);

const UserPanelProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [hello, setHello] = useState("hello");
  return (
    <UserPanelContext.Provider value={{ hello, setHello }}>
      {children}
    </UserPanelContext.Provider>
  );
};

const useUserPanel = () => useContext(UserPanelContext);

export { UserPanelProvider, useUserPanel };
