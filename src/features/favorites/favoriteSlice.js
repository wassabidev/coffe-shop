import { createSlice } from "@reduxjs/toolkit";

export const favoriteSlice = createSlice({
  name: "favorites",
  initialState: [],

  reducers: {
    addFavorite: (state, action) => {
      const existingItem = state.find((item) => item._id == action.payload._id);
      if (!existingItem) {
        state.push(action.payload);
      }
    },
    removeFavorite: (state, action) => {
      return state.filter((item) => item._id !== action.payload._id);
    },
  },
});
export const { addFavorite, removeFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
