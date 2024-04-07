import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counter/counterSlice";
import postReducer from "./slices/post/postSlice";

const store = configureStore({
  reducer: { counter: counterReducer, posts: postReducer },
});

export default store;
