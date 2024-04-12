import { PayloadAction, createSlice } from "@reduxjs/toolkit";
export const cartSlice_KEY = "Cart Slice";
export const count_KEY = "Count";

const initialState: ICartSlice = {
  productCount: JSON.parse(localStorage.getItem(count_KEY) || "0") ?? 0,
  productAddingCount: 1,
  product:
    JSON.parse(localStorage.getItem(cartSlice_KEY) || "[]") ??
    ([] as IProduct[]),
};

function addToCart(state: { productCount: number }) {
  const existingCount = localStorage.getItem("Count");
  let existingCountNumber = existingCount
    ? Number(JSON.parse(existingCount))
    : 0;
  existingCountNumber += 1;
  const updatedCountNumber = JSON.stringify(existingCountNumber);
  localStorage.setItem(count_KEY, updatedCountNumber);
  state.productCount += 1;
}

function removeFromCart(state: { productCount: number }) {
  const existingCount = localStorage.getItem("Count");
  let existingCountNumber = existingCount
    ? Number(JSON.parse(existingCount))
    : 0;
  existingCountNumber -= 1;
  const updatedCountNumber = JSON.stringify(existingCountNumber);
  localStorage.setItem(count_KEY, updatedCountNumber);

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
  const existingCartSlice = localStorage.getItem("Cart Slice");
  const existingCartSliceArray = existingCartSlice
    ? JSON.parse(existingCartSlice)
    : [];
  existingCartSliceArray.push(action.payload);
  const updatedArrayString = JSON.stringify(existingCartSliceArray);
  localStorage.setItem(cartSlice_KEY, updatedArrayString);
  if (state.product) state.product.push(action.payload);
}

function removeProduct(state: ICartSlice, action: PayloadAction<IProduct[]>) {
  localStorage.removeItem(cartSlice_KEY);
  state.product = action.payload;
  localStorage.setItem(cartSlice_KEY, JSON.stringify(action.payload));
}

function editCountProduct(state: ICartSlice, action: PayloadAction<IProduct>) {
  const { productId, newCount } = action.payload;

  const existingCartSlice = localStorage.getItem(cartSlice_KEY);
  const existingCartSliceArray = existingCartSlice
    ? JSON.parse(existingCartSlice)
    : [];

  const productToUpdateIndex = existingCartSliceArray.findIndex(
    (pro: IProduct) => pro._id === productId,
  );

  if (productToUpdateIndex !== -1) {
    existingCartSliceArray[productToUpdateIndex].count = newCount;

    const updatedArrayString = JSON.stringify(existingCartSliceArray);

    localStorage.setItem(cartSlice_KEY, updatedArrayString);

    const productToUpdateState = state.product?.find(
      (pro) => pro._id === productId,
    );
    if (productToUpdateState) {
      productToUpdateState.count = Number(newCount) || 0;
    }
  }
}

function resetToInitialState(state: ICartSlice) {
  localStorage.removeItem(cartSlice_KEY);
  localStorage.removeItem(count_KEY);
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
