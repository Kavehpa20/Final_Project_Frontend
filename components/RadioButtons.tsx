"use client";

import { useAdminPanel } from "@/contexts/AdminPanelContext";
import React, { useState } from "react";

const RadioButtons = () => {
  const { selectedValue, setSelectedValue, handleRadioChange } =
    useAdminPanel();
  return (
    <div className="grid place-items-center">
      <div className="grid w-fit grid-cols-3 gap-2 rounded-xl bg-gray-200 p-1 text-gray-900 dark:bg-gray-900 dark:text-gray-200">
        <div>
          <input
            type="radio"
            name="option"
            id="1"
            value="option1"
            checked={selectedValue === "option1"}
            onChange={() => handleRadioChange("option1")}
            className="peer hidden"
          />
          <label
            htmlFor="1"
            className="dark:peer-checked:text- block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
          >
            همه
          </label>
        </div>

        <div>
          <input
            type="radio"
            name="option"
            id="2"
            value="option2"
            checked={selectedValue === "option2"}
            onChange={() => handleRadioChange("option2")}
            className="peer hidden"
          />
          <label
            htmlFor="2"
            className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
          >
            در انتظار ارسال
          </label>
        </div>

        <div>
          <input
            type="radio"
            name="option"
            id="3"
            value="option3"
            checked={selectedValue === "option3"}
            onChange={() => handleRadioChange("option3")}
            className="peer hidden"
          />
          <label
            htmlFor="3"
            className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
          >
            تحویل شده
          </label>
        </div>
      </div>
    </div>
  );
};

export default RadioButtons;
