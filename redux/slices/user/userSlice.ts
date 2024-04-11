import { createSlice } from "@reduxjs/toolkit";
export const userSlice_KEY = "User Slice";

const initialState = {
  user: JSON.parse(localStorage.getItem(userSlice_KEY)) ?? [],
};

function userFunc(state: { user: [] }, action) {
  const existingUserSlice = localStorage.getItem("User Slice");
  const existingUserSliceArray = existingUserSlice
    ? JSON.parse(existingUserSlice)
    : [];
  existingUserSliceArray.push(action.payload);
  const updatedArrayString = JSON.stringify(existingUserSliceArray);
  localStorage.setItem(userSlice_KEY, updatedArrayString);
  state.user.push(action.payload);
}

function resetUserFunc(state: { user: [] }) {
  localStorage.removeItem(userSlice_KEY);
  state.user = [];
}

const userSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    userFunc,
    resetUserFunc,
  },
});

export const { userFunc: userFuncAction, resetUserFunc: resetUserFuncAction } =
  userSlice.actions;
export default userSlice.reducer;
