"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrementAction, incrementAction } from "../counterSlice";

const Counter = () => {
  const dispatch = useDispatch();
  const value = useSelector((state) => state.counter.value);
  return (
    <div>
      {value}
      <br />
      <button onClick={() => dispatch(incrementAction())}>increment</button>
      <button onClick={() => dispatch(decrementAction())}>decrement</button>
    </div>
  );
};

export default Counter;
