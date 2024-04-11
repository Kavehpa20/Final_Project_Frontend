import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: IPayment = {
  payment: false,
};

function payment(state: IPayment, action: PayloadAction<boolean>) {
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
