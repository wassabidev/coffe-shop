import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "@/api/api";

export const fetchUsers = createAsyncThunk(
  "users/fetch",
  async ({ page = 1, limit, all = false }, { rejectWithValue }) => {
    try {
      const url = all
        ? `${API_URL}/user?all=true`
        : `${API_URL}/user?page=${page}&limit=${limit}`;
      const res = await fetch(url);
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data);
      return data;
    } catch (err) {
      return rejectWithValue({
        message: err.message || "Error del servidor",
      });
    }
  },
);

export const createUser = createAsyncThunk(
  "user/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) return rejectWithValue(json);
      return json;
    } catch (err) {
      return rejectWithValue({
        message: err.message || "Error del servidor",
      });
    }
  },
);

export const updateUser = createAsyncThunk(
  "user/update",
  async ({ id, ...data }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/user/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) return rejectWithValue(json);
      return json;
    } catch (err) {
      return rejectWithValue({
        message: err.message || "Error del servidor",
      });
    }
  },
);

export const deleteUser = createAsyncThunk(
  "user/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/user/${id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (!res.ok) {
        return rejectWithValue(json);
      }
      return json;
    } catch (err) {
      console.log(err);
      return rejectWithValue({
        message: "Error de red al eliminar subcategoría",
      });
    }
  },
);
