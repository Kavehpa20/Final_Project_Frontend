"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Payment = () => {
  const paymentStatus = useSelector((state) => state.payment.payment);
  console.log(paymentStatus);

  const dispatch = useDispatch();

  return <div>Payment</div>;
};

export default Payment;
