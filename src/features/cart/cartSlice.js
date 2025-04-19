import { createSlice } from '@reduxjs/toolkit'

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
            const existingItem = state.items.find((item) => item._id === action.payload._id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
            state = calculateTotals(state);
        },
        removeItem: (state, action) => {
            const existingItem = state.items.find((item) => item._id === action.payload._id);
            if (existingItem) {
                if (existingItem.quantity > 1) {
                    existingItem.quantity -= 1;
                } else {
                    const index = state.items.findIndex((item) => item._id === action.payload._id);
                    state.items.splice(index, 1);
                }
            }
            state = calculateTotals(state);
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
})
export const { addItem, removeItem, clearCart, setDiscount } = cartSlice.actions;
export default cartSlice.reducer;

const calculateTotals = (state) => {
    const subtotal = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const total = subtotal - state.discount;
    return {
        ...state,
        subtotal: subtotal.toFixed(2),
        total: total.toFixed(2),
    }
}