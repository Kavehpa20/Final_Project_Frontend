import { classNames } from "@/libs/tools";
import { Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { Button } from "flowbite-react";
import Link from "next/link";
import TableComponent from "./forms/TableComponent";
import RadioButtons from "./RadioButtons";

const TabsComponent = () => {
  return (
    <Tabs
      className="mt-1 inline-flex w-full justify-center gap-x-4"
      aria-label="Default tabs"
      style="default"
    >
      <Tabs.Item active title="کالاها" icon={MdDashboard}>
        <div className="mx-10 flex justify-between">
          <span className="font-medium text-gray-800 dark:text-white">
            مدیریت کالاها
          </span>
          <Button color="success">افزودن کالا</Button>
        </div>
        <TableComponent />
      </Tabs.Item>
      <Tabs.Item title="موجودی و قیمت ها" icon={HiAdjustments}>
        <div className="mx-10 flex justify-between">
          <span className="font-medium text-gray-800 dark:text-white">
            مدیریت موجودی و قیمت ها
          </span>
          <Button color="success">ذخیره</Button>
        </div>
        <TableComponent />
      </Tabs.Item>
      <Tabs.Item title="سفارش ها" icon={HiClipboardList}>
        <div className="item-center mx-10 flex justify-between">
          <span className="text-2xl font-medium text-gray-800 dark:text-white">
            مدیریت سفارش ها
          </span>
          <RadioButtons />
        </div>
        <TableComponent />
      </Tabs.Item>
    </Tabs>
  );
};

export default TabsComponent;
