"use client";

import React, { useState } from "react";
import { Datepicker, Flowbite, Textarea } from "flowbite-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { classNames } from "@/libs/tools";
import { DatePickerTheme } from "./DatePickerTheme";
import { cartBuyerSchema } from "@/libs/validations/cartBuyerSchema";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import parse from "html-react-parser";

const moment = require("moment-jalaali");

const BuyerFormComponent = () => {
  const router = useRouter();

  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 4);

  const maxDeliveryDate = new Date();
  maxDeliveryDate.setDate(currentDate.getDate() + 20);

  const [selectedDate, setSelectedDate] = useState(
    moment(currentDate.toISOString().split("T")[0], "YYYY-MM-DD").format(
      "jYYYY/jMM/jDD",
    ),
  );

  const handleDatePickerChange = (date: Date) => {
    setSelectedDate(
      moment(date.toLocaleString().split("T")[0], "MM/DD/YYYY").format(
        "jYYYY/jMM/jDD",
      ),
    );
  };

  const user: IUser[] = useSelector((state: IRootState) => state.user.user);
  const productStore = useSelector((state: IRootState) => state.cart.product);

  const extractedData = productStore?.map(({ count, _id }) => ({
    count,
    product: _id,
  }));

  const handleOpenNewTab = () => {
    // Open a new tab
    window.open("/paymentpage", "_blank");
  };

  const { handleSubmit, formState, control, register } = useForm<IBuyerCart>({
    mode: "all",
    resolver: zodResolver(cartBuyerSchema),
  });

  const onSubmitHandler = (data: IBuyerCart) => {
    const body = {
      user: user[0]._id,
      products: extractedData,
      deliveryStatus: false,
      deliveryDate: moment(selectedDate, "jYYYY/jMM/jDD").format("YYYY/MM/DD"),
    };
    sessionStorage.setItem("body order", JSON.stringify(body));
    handleOpenNewTab();
  };

  return user[0] ? (
    <form
      className="relative mx-8 grid grid-cols-1 gap-5 pb-14 lg:grid-cols-2"
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <div>
        <label
          htmlFor="firstName"
          className="mb-2 block text-sm font-medium text-brown-900 dark:text-brown-200"
        >
          نام
        </label>
        <Controller
          name="firstName"
          control={control}
          defaultValue={user[0].firstname}
          render={({ field }) => (
            <input
              type="text"
              id="firstName"
              disabled
              placeholder="نام"
              className={classNames(
                "block w-full rounded-lg border",
                "border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 disabled:text-gray-700 disabled:opacity-50",
                "focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white disabled:dark:text-gray-200",
                "dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm",
                !!formState.errors.firstName?.message
                  ? "border-red-300 focus:border-red-600 focus:ring-red-600 dark:focus:border-red-500 dark:focus:ring-red-500"
                  : "",
              )}
              {...field}
              onChange={(e) => field.onChange(e.target.value)}
              value={field.value}
            />
          )}
        />
        <p className="mt-1 text-xs font-semibold text-red-600">
          {formState.errors.firstName?.message}
        </p>
      </div>
      <div>
        <label
          htmlFor="lastName"
          className="mb-2 block text-sm font-medium text-brown-900 dark:text-brown-200"
        >
          نام خانوادگی
        </label>
        <Controller
          name="lastName"
          disabled
          control={control}
          defaultValue={user[0].lastname}
          render={({ field }) => (
            <input
              type="text"
              id="lastName"
              placeholder="نام خانوادگی"
              className={classNames(
                "block w-full rounded-lg border",
                "border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 disabled:text-gray-700 disabled:opacity-50",
                "focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white disabled:dark:text-gray-200",
                "dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm",
                !!formState.errors.lastName?.message
                  ? "border-red-300 focus:border-red-600 focus:ring-red-600 dark:focus:border-red-500 dark:focus:ring-red-500"
                  : "",
              )}
              {...field}
              onChange={(e) => field.onChange(e.target.value)}
              value={field.value}
            />
          )}
        />
        <p className="mt-1 text-xs font-semibold text-red-600">
          {formState.errors.lastName?.message}
        </p>
      </div>
      <div>
        <label
          htmlFor="address"
          className="mb-2 block text-sm font-medium text-brown-900 dark:text-brown-200"
        >
          آدرس
        </label>

        <Textarea
          id="address"
          defaultValue={user[0].address}
          placeholder="توضیحات محصول"
          rows={8}
          className={classNames(
            "rounded-t-0 block w-full rounded-b-lg border",
            "border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600",
            "focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white",
            "dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm",
            !!formState.errors.address?.message
              ? "border-red-300 focus:border-red-600 focus:ring-red-600 dark:focus:border-red-500 dark:focus:ring-red-500"
              : "",
          )}
          {...register("address")}
        />
        <p className="mt-1 text-xs font-semibold text-red-600">
          {formState.errors.address?.message}
        </p>
      </div>
      <div>
        <label
          htmlFor="phoneNumber"
          className="mb-2 block text-sm font-medium text-brown-900 dark:text-brown-200"
        >
          تلفن همراه:{" "}
          <span className="text-xs font-light text-brown-800 dark:text-brown-100">
            جهت هماهنگی ارسال سفارش
          </span>
        </label>
        <Controller
          name="phoneNumber"
          control={control}
          defaultValue={user[0].phoneNumber}
          render={({ field }) => (
            <input
              type="text"
              id="phoneNumber"
              placeholder="تلفن همراه"
              className={classNames(
                "block w-full rounded-lg border font-IRANSans",
                "border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 disabled:text-gray-700 disabled:opacity-50",
                "focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white disabled:dark:text-gray-200",
                "dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm",
                !!formState.errors.phoneNumber?.message
                  ? "border-red-300 focus:border-red-600 focus:ring-red-600 dark:focus:border-red-500 dark:focus:ring-red-500"
                  : "",
              )}
              {...field}
              onChange={(e) => field.onChange(e.target.value)}
              value={field.value}
            />
          )}
        />
        <p className="mt-1 text-xs font-semibold text-red-600">
          {formState.errors.phoneNumber?.message}
        </p>
      </div>
      <div className="mb-5">
        <label
          htmlFor="deliveryDate"
          className="mb-2 block text-sm font-medium text-brown-900 dark:text-brown-200"
        >
          تاریخ تحویل
        </label>

        <Flowbite theme={{ theme: DatePickerTheme }}>
          <Datepicker
            className="font-IRANSans"
            value={selectedDate}
            onSelectedDateChanged={handleDatePickerChange}
            language="fa-PERSIAN"
            labelTodayButton="تایید"
            labelClearButton="کنسل"
            weekStart={6}
            minDate={currentDate}
            maxDate={maxDeliveryDate}
          />
        </Flowbite>
        <p className="mt-1 text-xs font-semibold text-red-600">
          {formState.errors.deliveryDate?.message}
        </p>
      </div>
      <button
        type="submit"
        className="absolute bottom-0 left-1/2 mb-2 rounded-lg bg-green-600 px-8 py-3 text-center text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        پرداخت
      </button>
    </form>
  ) : (
    <div className="flex flex-col gap-8">
      <p className="mb-5 mt-14 text-center text-xl font-medium text-brown-900 dark:text-brown-200">
        لطفا اول وارد حساب کاربری خود شوید
      </p>
      <div className="mb-10 flex items-center justify-center">
        <button
          onClick={() => router.push("/admin")}
          className="mb-2 rounded-lg bg-primary-600 px-8 py-3 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          وارد حساب خود شوید
        </button>
      </div>
    </div>
  );
};

export default BuyerFormComponent;
