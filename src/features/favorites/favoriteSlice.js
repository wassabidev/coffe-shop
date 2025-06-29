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

export const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite(state, action) {
      const listaActual = Array.isArray(state.lista) ? state.lista : [];
      const exists = listaActual.some(
        (item) => item._id === action.payload._id,
      );
      if (!exists) {
        state.lista = [...listaActual, action.payload];
      }
    },
    removeFavorite(state, action) {
      if (!Array.isArray(state.lista)) {
        state.lista = [];
      }
      state.lista = state.lista.filter(
        (item) => item._id !== action.payload._id,
      );
    },
    resetFavorites: (state) => {
      state.lista = [];
      state.total = 0;
      state.page = 1;
      state.pages = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      //fetch
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
        state.fetchError = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        //console.log("Fetched favorites:", action.payload.data.favorite);
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

      //create
      .addCase(toggleFavorite.pending, (state) => {
        state.loading = true;
        state.createError = null;
      })

      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const { data, action: backendAction } = action.payload;
        if (!data || !data._id) return;
        const currentList = Array.isArray(state.lista) ? state.lista : [];

        if (backendAction === "removed") {
          state.lista = currentList.filter((item) => item._id !== data._id);
        } else {
          const exists = currentList.some((item) => item._id === data._id);
          if (!exists) {
            state.lista = [...currentList, data];
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
