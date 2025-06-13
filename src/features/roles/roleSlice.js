import { createSlice } from "@reduxjs/toolkit";
import {
  fetchRoles,
  createRole,
  updateRole,
  deleteRole,
} from "../../hooks/roles";

const initialState = {
  lista: [],
  loading: false,
  fetchError: null,
  createError: null,
  updateError: null,
  deleteError: null,
  total: 0,
  page: 1,
  pages: 2,
};

export const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    addRoles: (state, action) => {
      state.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      //fetch
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
        state.fetchError = null;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.lista = action.payload.data.roles;
        state.total = action.payload.data.total;
        state.page = action.payload.data.page;
        state.pages = action.payload.data.pages;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
        state.fetchError = action.payload?.message || action.error.message;
      })

      //create
      .addCase(createRole.pending, (state) => {
        state.loading = true;
        state.createError = null;
      })
      .addCase(createRole.fulfilled, (state, action) => {
        state.loading = false;
        state.lista.push(action.payload.data);
      })
      .addCase(createRole.rejected, (state, action) => {
        state.loading = false;
        state.createError = action.payload?.message || action.error.message;
      })

      //update
      .addCase(updateRole.pending, (state) => {
        state.loading = true;
        state.updateError = null;
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.lista.findIndex(
          (role) => role._id === action.payload.data._id,
        );
        if (index !== -1) state.lista[index] = action.payload.data;
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.loading = false;
        state.updateError = action.payload?.message || action.error.message;
      })

      //delete
      .addCase(deleteRole.pending, (state) => {
        state.loading = true;
        state.deleteError = null;
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.loading = false;
        state.lista = state.lista.filter(
          (role) => role._id !== action.payload.data._id,
        );
      })
      .addCase(deleteRole.rejected, (state, action) => {
        state.loading = false;
        state.deleteError = action.payload?.message || action.error.message;
      });
  },
});

export const { addRoles } = roleSlice.actions;

export default roleSlice.reducer;
