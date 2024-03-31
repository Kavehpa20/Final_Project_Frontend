"use client";

import { Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { Button } from "flowbite-react";
import RadioButtons from "./RadioButtons";
import OrdersTable from "./tables/ordersTable/allOrdersTable/OrdersTable";
import { useAdminPanel } from "@/contexts/AdminPanelContext";
import DeliveryOrdersTable from "./tables/ordersTable/deliveryOrdersTable/DeliveryOrdersTable";
import NotDeliveryOrdersTable from "./tables/ordersTable/notDeliveryOrdersTable/NotDeliveryOrdersTable";
import InventoryAndPrices from "./tables/inventoryAndPrices/InventoryAndPrices";
import AssetsManager from "./tables/assetsManager/AssetsManager";

const TabsComponent = () => {
  const { selectedValue, setShowAddingModal } = useAdminPanel();
  return (
    <>
      <Tabs
        className="mt-1 inline-flex w-full justify-center gap-x-4"
        aria-label="Default tabs"
        style="default"
      >
        <Tabs.Item title="کالاها" icon={MdDashboard}>
          <div className="mx-10 flex justify-between">
            <span className="font-medium text-gray-800 dark:text-white">
              مدیریت کالاها
            </span>
            <Button color="success" onClick={() => setShowAddingModal(true)}>
              افزودن کالا
            </Button>
          </div>
          <AssetsManager />
        </Tabs.Item>
        <Tabs.Item title="موجودی و قیمت ها" icon={HiAdjustments}>
          <InventoryAndPrices />
        </Tabs.Item>
        <Tabs.Item active title="سفارش ها" icon={HiClipboardList}>
          <div className="item-center mx-10 flex justify-between">
            <span className="text-2xl font-medium text-gray-800 dark:text-white">
              مدیریت سفارش ها
            </span>
            <RadioButtons />
          </div>
          {selectedValue === "option1" && <OrdersTable />}
          {selectedValue === "option2" && <NotDeliveryOrdersTable />}
          {selectedValue === "option3" && <DeliveryOrdersTable />}
        </Tabs.Item>
      </Tabs>
    </>
  );
};

export default TabsComponent;
