import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  postList: [],
  fetchingPosts: false,
  errorMessage: "",
};

// Define your async thunk separately
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();
  return data;
});

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.fetchingPosts = true;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.errorMessage = "Something went wrong";
        state.fetchingPosts = false;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.postList = action.payload;
        state.fetchingPosts = false;
      });
  },
});

export default postSlice.reducer;
