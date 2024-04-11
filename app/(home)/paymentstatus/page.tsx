"use client";

import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

export default function PaymentPageStatus() {
  const paymentStatus = useSelector(
    (state: IPaymentState) => state.payment.payment,
  );

  return paymentStatus ? (
    <div className="my-5 mr-4 inline-flex h-fit gap-x-8 text-xl font-semibold text-gray-800 dark:text-white">
      <Image
        className="h-56"
        src="/Assets/pictures/successIcon.svg"
        height={500}
        width={500}
        alt="success"
      />
      <p className="item-center mt-10 flex justify-center">
        با تشکر از پرداخت شما. سفارش شما ثبت شده است و جهت هماهنگی ارسال با شما
        تماس گرفته خواهد گرفت.
      </p>
    </div>
  ) : (
    <div className="my-5 mr-4 inline-flex h-56 gap-x-8 text-xl font-semibold text-gray-800 dark:text-white">
      <Image
        src="/Assets/pictures/faiel.svg"
        height={500}
        width={500}
        alt="success"
      />
      <p className="item-center mt-10 flex justify-center">
        پرداخت موفقیت آمیز نبود. سفارش شما در انتظار پرداخت است.
      </p>
    </div>
  );
}
