import { createSlice } from "@reduxjs/toolkit";
import {
  fetchsubCategories,
  createsubCategory,
  updatesubCategory,
  deletesubCategory,
} from "../../hooks/subcategories";

const initialState = {
  lista: [],
  loading: false,
  error: null,
  total: 0,
  page: 1,
  pages: 1,
};

export const subCategoriesSlice = createSlice({
  name: "subcategories",
  initialState,
  reducers: {
    addSubCategories: (state, action) => {
      state.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      //fetch
      .addCase(fetchsubCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchsubCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.lista = action.payload.data.subcategories;
        state.total = action.payload.data.total;
        state.page = action.payload.data.page;
        state.pages = action.payload.data.pages;
      })
      .addCase(fetchsubCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //create
      .addCase(createsubCategory.pending, (state) => {
        state.loading = true;
      })

      .addCase(createsubCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.lista.push(action.payload.data);
      })

      .addCase(createsubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //update
      .addCase(updatesubCategory.pending, (state) => {
        state.loading = true;
      })

      .addCase(updatesubCategory.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.lista.findIndex(
          (t) => t._id === action.payload.data._id,
        );

        if (index !== -1) state.lista[index] = action.payload.data;
      })

      .addCase(updatesubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //delete
      .addCase(deletesubCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletesubCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.lista = state.lista.filter(
          (t) => t._id !== action.payload.data.subcategories._id,
        );
      })
      .addCase(deletesubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addSubCategories } = subCategoriesSlice.actions;
export default subCategoriesSlice.reducer;
