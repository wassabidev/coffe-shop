import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "@/api/api";

export const fetchCategories = createAsyncThunk(
  "categories/fetch",
  async ({ page = 1, limit = 10 }) => {
    const res = await fetch(`${API_URL}/category?page=${page}&limit=${limit}`);

    return await res.json();
  },
);

export const createCategory = createAsyncThunk(
  "category/create",
  async (data, { rejectWithValue }) => {
    const res = await fetch(`${API_URL}/category`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (!res.ok) {
      return rejectWithValue(json.message || "Error desconocido");
    }

    return json;
  },
);

export const updateCategory = createAsyncThunk(
  "category/update",
  async ({ id, ...data }) => {
    const res = await fetch(`${API_URL}/category/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await res.json();
  },
);
export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (id) => {
    const res = await fetch(`${API_URL}/category/${id}`, {
      method: "DELETE",
    });
    return await res.json();
  },
);
