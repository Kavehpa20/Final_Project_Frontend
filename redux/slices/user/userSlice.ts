import { PayloadAction, createSlice } from "@reduxjs/toolkit";
export const userSlice_KEY = "User Slice";

// Utility functions for localStorage interactions
export function getUserFromLocalStorage(): IUser[] {
  if (typeof window !== "undefined") {
    const userString = localStorage.getItem(userSlice_KEY);
    return userString ? JSON.parse(userString) : [];
  } else {
    // Optional: Handle server-side behavior (e.g., return default value)
    return []; // Or any default value you prefer for SSR
  }
}

const initialState: IUserSlice = {
  user: getUserFromLocalStorage(),
};

function userFunc(state: IUserSlice, action: PayloadAction<IUser>) {
  const existingUserSlice = getUserFromLocalStorage();
  const existingUserSliceArray = existingUserSlice;
  existingUserSliceArray.push(action.payload);
  const updatedArrayString = JSON.stringify(existingUserSliceArray);
  window.localStorage.setItem(userSlice_KEY, updatedArrayString);
  state.user.push(action.payload);
}

function resetUserFunc(state: IUserSlice) {
  window.localStorage.removeItem(userSlice_KEY);
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
