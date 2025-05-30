import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../hooks/categories";

const initialState = {
  lista: [],
  loading: false,
  fetchError: null,
  createError: null,
  updateError: null,
  deleteError: null,
  total: 0,
  page: 1,
  pages: 1,
};

export const CategoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategories: (state, action) => {
      state.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      //fetch
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.fetchError = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.lista = action.payload.data.categories;
        state.total = action.payload.data.total;
        state.page = action.payload.data.page;
        state.pages = action.payload.data.pages;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.fetchError = action.payload?.message || action.error.message;
      })

      //create
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
      })

      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.lista.push(action.payload.data);
      })

      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.createError = action.payload?.message || action.error.message;
      })

      //update
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.updateError = null;
      })

      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.lista.findIndex(
          (t) => t._id === action.payload.data._id,
        );

        if (index !== -1) state.lista[index] = action.payload.data;
      })

      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.updateError = action.payload?.message || action.error.message;
      })

      //delete
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.deleteError = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.lista = state.lista.filter(
          (t) => t._id !== action.payload.data._id,
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.error.message;
      });
  },
});

export const { addCategories } = CategoriesSlice.actions;
export default CategoriesSlice.reducer;
