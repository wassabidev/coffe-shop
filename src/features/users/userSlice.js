import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: null,
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.token = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, setToken, logout } = userSlice.actions;

export default userSlice.reducer;
