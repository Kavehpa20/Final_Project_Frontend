import { classNames } from "@/libs/tools";
import { Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { Button } from "flowbite-react";
import Link from "next/link";
import TableComponent from "./forms/TableComponent";

const TabsComponent = () => {
  return (
    <>
      <div className="item-center flex justify-center">
        <p
          className={classNames(
            "my-4 grow whitespace-nowrap text-center text-2xl",
            "font-black text-brown-500 dark:text-brown-100",
          )}
        >
          پنل مدیریت قهوه آلفا
        </p>
        <Link
          href="/"
          className="ml-10 hidden grow-0 items-center font-medium text-brown-900 hover:border-brown-200 hover:text-brown-500 hover:underline dark:text-brown-200 dark:hover:border-brown-50 dark:hover:text-brown-100 sm:flex"
        >
          بازگشت به سایت
        </Link>
      </div>

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
          This is{" "}
          <span className="font-medium text-gray-800 dark:text-white">
            سفارش ها
          </span>
          . Clicking another tab will toggle the visibility of this one for the
          next. The tab JavaScript swaps classes to control the content
          visibility and styling.
        </Tabs.Item>
      </Tabs>
    </>
  );
};

export default TabsComponent;
