import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    subtotal: 0,
    discount: 0,
    total: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const { product, size } = action.payload;
      const { _id } = product;

      const existingItem = state.items.find(
        (item) => item.product._id === _id && item.size === size,
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      const { subtotal, total } = calculateTotals(state);
      state.subtotal = subtotal;
      state.total = total;
    },
    removeItem: (state, action) => {
      const existingItem = state.items.find(
        (item) => item._id === action.payload._id,
      );
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          const index = state.items.findIndex(
            (item) => item._id === action.payload._id,
          );
          state.items.splice(index, 1);
        }
      }
      const { subtotal, total } = calculateTotals(state);
      state.subtotal = subtotal;
      state.total = total;
    },
    clearCart: (state) => {
      state.items = [];
      state.subtotal = 0;
      state.total = 0;
      state.discount = 0;
    },
    setDiscount: (state, action) => {
      state.discount = action.payload;
      state = calculateTotals(state);
    },
  },
});
export const { addItem, removeItem, clearCart, setDiscount } =
  cartSlice.actions;
export default cartSlice.reducer;

const calculateTotals = (state) => {
  const subtotal = state.items.reduce(
    (acc, item) => acc + Number(item.product.price) * item.quantity,
    0,
  );
  const total = subtotal - state.discount;
  return {
    subtotal: subtotal,
    total: total,
  };
};
