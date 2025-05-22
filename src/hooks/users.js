import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "@/api/api";

export const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const res = await fetch(`${API_URL}/users`);

  return await res.json();
});

export const createUser = createAsyncThunk("user/create", async (data) => {
  const res = await fetch(`${API_URL}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await res.json();
});

export const updateUser = createAsyncThunk(
  "user/update",
  async ({ id, ...data }) => {
    const res = await fetch(`${API_URL}/user/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await res.json();
  },
);
