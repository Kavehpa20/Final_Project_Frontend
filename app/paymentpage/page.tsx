"use client";

import React, { useState } from "react";
import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { paymentAction } from "@/redux/slices/payment/payment";
import Image from "next/image";
import { resetToInitialStateAction } from "@/redux/slices/cart/cartSlice";
import { createNewOrder } from "@/apis/requestsAPI";
import { toast } from "react-toastify";

export default function PaymentPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // const paymentStatus = useSelector((state) => state.payment.payment);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const body = sessionStorage.getItem("body order");
    if (body) {
      setIsLoading(true);
      try {
        const res = await createNewOrder(JSON.parse(body));
        if (res.status === "success") {
          toast.success("پرداخت شما با موفقیت انجام شد.", { theme: "colored" });
          sessionStorage.removeItem("body order");
          setIsLoading(false);
          dispatch(paymentAction(true));
          dispatch(resetToInitialStateAction());
          router.push("/paymentstatus");
        }
      } catch (error) {
        // console.log(error);
        setIsLoading(false);
      }
    } else {
      handleCancel();
    }
  };

  const handleCancel = () => {
    dispatch(paymentAction(false));
    router.push("/paymentstatus");
  };

  return (
    <>
      <div className="my-5 mr-4 text-3xl font-semibold text-gray-800 dark:text-white">
        <Image
          className="h-screen w-full"
          src="/Assets/pictures/payment.jpg"
          width={500}
          height={500}
          alt="paymentpage"
        />
      </div>
      <div className="absolute left-1/2 top-2/3 mx-8 inline-flex gap-x-5">
        {!isLoading ? (
          <Button className="w-4/6" color="success" onClick={handleSubmit}>
            پرداخت
          </Button>
        ) : (
          <Button
            className="w-4/6"
            color="success"
            isProcessing
            onClick={handleSubmit}
          >
            پرداخت
          </Button>
        )}
        <Button className="w-2/6" color="warning" onClick={handleCancel}>
          انصراف
        </Button>
      </div>
    </>
  );
}
