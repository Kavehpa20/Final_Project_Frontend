import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

function increment(state: { value: number }) {
  state.value += 1;
}
function decrement(state: { value: number }) {
  state.value -= 1;
}

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment,
    decrement,
  },
});

export const { increment: incrementAction, decrement: decrementAction } =
  counterSlice.actions;
export default counterSlice.reducer;
