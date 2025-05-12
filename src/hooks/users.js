import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const res = await fetch("http://localhost:5001/api/users");

  return await res.json();
});

export const createUser = createAsyncThunk("user/create", async (data) => {
  const res = await fetch("http://localhost:5001/api/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await res.json();
});

export const updateUser = createAsyncThunk("user/update", async (data) => {
  const res = await fetch("http://localhost:5001/api/user", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await res.json();
});
