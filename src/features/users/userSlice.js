import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../hooks/users";

const initialState = {
  token: null,
  user: null,
  isAuthenticated: false,
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

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
    },
    resetUsers: (state) => {
      state.lista = [];
      state.total = 0;
      state.page = 1;
      state.pages = 1;
      state.loading = false;
      state.fetchError = null;
      state.createError = null;
      state.updateError = null;
      state.deleteError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //fetch
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.fetchError = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        const data = action.payload?.data || {};

        state.lista = data.users || [];
        state.total = data.total || 0;
        state.page = data.page || 1;
        state.pages = data.pages || 1;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.fetchError = action.payload?.message || action.error.message;
      })

      //create
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.createError = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        const createdUser = action.payload?.data || action.payload;
        state.lista.push(createdUser);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.createError = action.payload?.message || action.error.message;
      })

      //update
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.updateError = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.lista.findIndex(
          (user) => user._id === action.payload.data._id,
        );
        if (index !== -1) state.lista[index] = action.payload.data;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.updateError = action.payload?.message || action.error.message;
      })

      //delete
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.deleteError = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.lista = state.lista.filter(
          (user) => user._id !== action.payload.data._id,
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.deleteError = action.payload?.message || action.error.message;
      });
  },
});

export const { setUser, logout, resetUsers } = userSlice.actions;

export default userSlice.reducer;
