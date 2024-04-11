import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  payment: false,
};

function payment(state: { payment: boolean }, action) {
  state.payment = action.payload;
}

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    payment,
  },
});

export const { payment: paymentAction } = paymentSlice.actions;
export default paymentSlice.reducer;
