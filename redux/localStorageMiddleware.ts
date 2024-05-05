import { Middleware } from "@reduxjs/toolkit";

const localStorageMiddleware: Middleware =
  ({ getState }) =>
  (next) =>
  (action) => {
    // Check if window is defined (indicating it's running on the client side)
    if (typeof window !== "undefined") {
      // Access localStorage here
      const state: IRootState = getState() as IRootState;
      const dataToStore: IRootState = {
        cart: state.cart,
        user: state.user,
      };

      const serializedState = JSON.stringify(dataToStore);
      localStorage.setItem("reduxState", serializedState);
    }

    return next(action);
  };

export default localStorageMiddleware;
