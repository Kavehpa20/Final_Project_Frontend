"use client";

import React from "react";
import FooterComponent from "@/components/Footer";
import AdminNavbar from "@/components/AdminNavbar";
import TabsComponent from "@/components/TabsComponent";
import LogoutModal from "@/components/modals/LogoutModal";
import AddingProductModal from "@/components/modals/addingProductModal/AddingProductModal";
import EditingProductModal from "@/components/modals/editingProductModal/EditingProductModal";
import ManageOrdersModal from "@/components/modals/manageOrders/ManageOrdersModal";

export default function AdminPanel() {
  return (
    <div className="bg-gray-50 font-Payda dark:bg-gray-500">
      <AdminNavbar />
      <TabsComponent />
      <LogoutModal />
      <ManageOrdersModal />
      <AddingProductModal />
      <EditingProductModal />
      <FooterComponent />
    </div>
  );
}
