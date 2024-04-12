import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counter/counterSlice";
import postReducer from "./slices/post/postSlice";
import cartReducer from "./slices/cart/cartSlice";
import userReducer from "./slices/user/userSlice";
import paymentReducer from "./slices/payment/payment";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postReducer,
    cart: cartReducer,
    user: userReducer,
    payment: paymentReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
