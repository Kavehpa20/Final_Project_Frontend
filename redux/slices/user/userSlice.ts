import { PayloadAction, createSlice } from "@reduxjs/toolkit";
export const userSlice_KEY = "User Slice";

const initialState: IUserSlice = {
  user: JSON.parse(localStorage.getItem(userSlice_KEY) || "[]") ?? [],
};

function userFunc(state: IUserSlice, action: PayloadAction<IUser>) {
  const existingUserSlice = localStorage.getItem("User Slice");
  const existingUserSliceArray = existingUserSlice
    ? JSON.parse(existingUserSlice)
    : [];
  existingUserSliceArray.push(action.payload);
  const updatedArrayString = JSON.stringify(existingUserSliceArray);
  localStorage.setItem(userSlice_KEY, updatedArrayString);
  state.user.push(action.payload);
}

function resetUserFunc(state: IUserSlice) {
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
