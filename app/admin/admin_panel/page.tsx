"use client";

import TabsComponent from "@/components/TabsComponent";
import LogoutModal from "@/components/modals/LogoutModal";
import React from "react";

const AdminPanel = () => {
  return (
    <>
      <TabsComponent />
      <LogoutModal />
    </>
  );
};

export default AdminPanel;
