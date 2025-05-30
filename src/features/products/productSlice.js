import { createSlice } from "@reduxjs/toolkit";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../hooks/products";

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

export const ProductsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProducts: (state, action) => {
      state.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      //fetch
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.fetchError = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.lista = action.payload.data.products;
        state.total = action.payload.data.total;
        state.page = action.payload.data.page;
        state.pages = action.payload.data.pages;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.fetchError = action.payload?.message || action.error.message;
      })

      //create
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })

      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.lista.push(action.payload.data);
      })

      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.createError = action.payload?.message || action.error.message;
      })

      //update
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.lista.findIndex(
          (t) => t._id === action.payload.data._id,
        );

        if (index !== -1) state.lista[index] = action.payload.data;
      })

      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.updateError = action.payload?.message || action.error.message;
      })

      //delete
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.lista = state.lista.filter(
          (t) => t._id !== action.payload.data._id,
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.deleteError = action.payload?.message || action.error.message;
      });
  },
});

export const { addProducts } = ProductsSlice.actions;
export default ProductsSlice.reducer;
