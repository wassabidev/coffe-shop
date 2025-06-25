import { createSlice } from "@reduxjs/toolkit";
import { fetchFavorites, toggleFavorite } from "../../hooks/favorites";

const initialState = {
  lista: [],
  loading: false,
  fetchError: null,
  createError: null,
  total: 0,
  page: 1,
  pages: 1,
};

const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite(state, action) {
      const exists = state.lista.some(
        (item) => item._id === action.payload._id,
      );
      if (!exists) {
        state.lista.push(action.payload);
      }
    },
    removeFavorite(state, action) {
      state.lista = state.lista.filter(
        (item) => item._id !== action.payload._id,
      );
    },
    resetFavorites(state) {
      state.lista = [];
      state.total = 0;
      state.page = 1;
      state.pages = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
        state.fetchError = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.lista = action.payload.data.favorite;
        state.total = action.payload.data.total;
        state.page = action.payload.data.page;
        state.pages = action.payload.data.pages;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.fetchError = action.payload?.message || action.error.message;
      })

      .addCase(toggleFavorite.pending, (state) => {
        state.loading = true;
        state.createError = null;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        state.loading = false;
        const { data, action: backendAction } = action.payload;
        if (!data || !data._id) return;

        const exists = state.lista.some((item) => item._id === data._id);

        if (backendAction === "removed") {
          state.lista = state.lista.filter((item) => item._id !== data._id);
        } else {
          if (!exists) {
            state.lista.push(data);
          }
        }
      })
      .addCase(toggleFavorite.rejected, (state, action) => {
        state.loading = false;
        state.createError = action.payload?.message || action.error.message;
      });
  },
});

export const { addFavorite, removeFavorite, resetFavorites } =
  favoriteSlice.actions;
export default favoriteSlice.reducer;
