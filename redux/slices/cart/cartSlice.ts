import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productCount: 0,
  productAddingCount: 1,
  product: [],
};

function addToCart(state: { productCount: number }) {
  state.productCount += 1;
}
function removeFromCart(state: { productCount: number }) {
  state.productCount -= 1;
}

function addingCountProduct(state: { productAddingCount: number }) {
  state.productAddingCount += 1;
}
function removingCountProduct(state: { productAddingCount: number }) {
  state.productAddingCount -= 1;
}
function resetCountProduct(state: { productAddingCount: number }) {
  state.productAddingCount = 1;
}
function addingProduct(state: { product: [] }, action) {
  state.product.push(action.payload);
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart,
    removeFromCart,
    addingCountProduct,
    removingCountProduct,
    addingProduct,
    resetCountProduct,
  },
});

export const {
  addToCart: addToCartAction,
  removeFromCart: removeFromCartAction,
  addingCountProduct: addingCountProductAction,
  removingCountProduct: removingCountProductAction,
  addingProduct: addingProductAction,
  resetCountProduct: resetCountProductAction,
} = cartSlice.actions;
export default cartSlice.reducer;
