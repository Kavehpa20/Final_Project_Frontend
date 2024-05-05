import { PayloadAction, createSlice } from "@reduxjs/toolkit";
export const cartSlice_KEY = "Cart Slice";
export const count_KEY = "Count";

// Utility functions for localStorage interactions
export function getCartCountFromLocalStorage(): number {
  if (typeof window !== "undefined") {
    // Check for browser environment
    const countString = localStorage.getItem(count_KEY);
    return countString ? Number(JSON.parse(countString)) : 0;
  } else {
    // Optional: Handle server-side behavior (e.g., return default value)
    return 0; // Or any default value you prefer for SSR
  }
}

export function getCartProductsFromLocalStorage(): IProduct[] {
  if (typeof window !== "undefined") {
    const productString = localStorage.getItem(cartSlice_KEY);
    return productString ? JSON.parse(productString) : [];
  } else {
    // Optional: Handle server-side behavior (e.g., return default value)
    return []; // Or any default value you prefer for SSR
  }
}

const initialState: ICartSlice = {
  productCount: getCartCountFromLocalStorage(),
  productAddingCount: 1,
  product: getCartProductsFromLocalStorage(),
};

function addToCart(state: { productCount: number }) {
  const existingCount = getCartCountFromLocalStorage();
  let existingCountNumber = existingCount;
  existingCountNumber += 1;
  const updatedCountNumber = JSON.stringify(existingCountNumber);
  window.localStorage.setItem(count_KEY, updatedCountNumber);
  state.productCount += 1;
}

function removeFromCart(state: { productCount: number }) {
  const existingCount = getCartCountFromLocalStorage();
  let existingCountNumber = existingCount;
  existingCountNumber -= 1;
  const updatedCountNumber = JSON.stringify(existingCountNumber);
  window.localStorage.setItem(count_KEY, updatedCountNumber);
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

function addingProduct(state: ICartSlice, action: PayloadAction<IProduct>) {
  const existingCartSlice = getCartProductsFromLocalStorage();
  const existingCartSliceArray = existingCartSlice;
  existingCartSliceArray.push(action.payload);
  const updatedArrayString = JSON.stringify(existingCartSliceArray);
  window.localStorage.setItem(cartSlice_KEY, updatedArrayString);
  if (state.product) state.product.push(action.payload);
}

function removeProduct(state: ICartSlice, action: PayloadAction<IProduct[]>) {
  window.localStorage.removeItem(cartSlice_KEY);
  state.product = action.payload;
  window.localStorage.setItem(cartSlice_KEY, JSON.stringify(action.payload));
}

function editCountProduct(state: ICartSlice, action: PayloadAction<IProduct>) {
  const { productId, newCount } = action.payload;

  const existingCartSlice = getCartProductsFromLocalStorage();
  const existingCartSliceArray = existingCartSlice;

  const productToUpdateIndex = existingCartSliceArray.findIndex(
    (pro: IProduct) => pro._id === productId,
  );

  if (productToUpdateIndex !== -1) {
    existingCartSliceArray[productToUpdateIndex].count = newCount;

    const updatedArrayString = JSON.stringify(existingCartSliceArray);

    window.localStorage.setItem(cartSlice_KEY, updatedArrayString);

    const productToUpdateState = state.product?.find(
      (pro) => pro._id === productId,
    );
    if (productToUpdateState) {
      productToUpdateState.count = Number(newCount) || 0;
    }
  }
}

function resetToInitialState(state: ICartSlice) {
  window.localStorage.removeItem(cartSlice_KEY);
  window.localStorage.removeItem(count_KEY);
  state.product = [];
  state.productCount = 0;
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
    removeProduct,
    editCountProduct,
    resetToInitialState,
  },
});

export const {
  addToCart: addToCartAction,
  removeFromCart: removeFromCartAction,
  addingCountProduct: addingCountProductAction,
  removingCountProduct: removingCountProductAction,
  addingProduct: addingProductAction,
  resetCountProduct: resetCountProductAction,
  removeProduct: removeProductAction,
  editCountProduct: editCountProductAction,
  resetToInitialState: resetToInitialStateAction,
} = cartSlice.actions;

export default cartSlice.reducer;
