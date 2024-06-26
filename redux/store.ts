import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import {
  configureStore,
  createListenerMiddleware,
  isAnyOf,
} from "@reduxjs/toolkit";
import counterReducer from "./slices/counter/counterSlice";
import postReducer from "./slices/post/postSlice";
import cartReducer, {
  addingProductAction,
  removeProductAction,
  addToCartAction,
  removeFromCartAction,
  editCountProductAction,
  resetToInitialStateAction,
} from "./slices/cart/cartSlice";
import userReducer, {
  userFuncAction,
  resetUserFuncAction,
} from "./slices/user/userSlice";
import paymentReducer from "./slices/payment/payment";

const localStorageMiddleware = createListenerMiddleware();

localStorageMiddleware.startListening({
  matcher: isAnyOf(
    addingProductAction,
    removeProductAction,
    addToCartAction,
    removeFromCartAction,
    editCountProductAction,
    resetToInitialStateAction,
    userFuncAction,
    resetUserFuncAction,
  ),
  effect: (action, listenerApi) => {
    const state: IRootState = listenerApi.getState() as IRootState;
    const dataToStore: IRootState = {
      cart: state.cart,
      user: state.user,
    };
  },
});

const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postReducer,
    cart: cartReducer,
    user: userReducer,
    payment: paymentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(localStorageMiddleware.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
