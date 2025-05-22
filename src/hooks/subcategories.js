import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "@/api/api";

export const fetchsubCategories = createAsyncThunk(
  "subcategories/fetch",
  async ({ page = 1, limit = 10 }) => {
    const res = await fetch(
      `${API_URL}/subcategory?page=${page}&limit=${limit}`,
    );

    return await res.json();
  },
);

export const createsubCategory = createAsyncThunk(
  "subcategroy/create",
  async (data) => {
    const res = await fetch(`${API_URL}/subcategory`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await res.json();
  },
);

export const updatesubCategory = createAsyncThunk(
  "subcategory/update",
  async ({ id, ...data }) => {
    const res = await fetch(`${API_URL}/subcategory/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await res.json();
  },
);
export const deletesubCategory = createAsyncThunk(
  "subcategory/delete",
  async (id) => {
    const res = await fetch(`${API_URL}/subcategory/${id}`, {
      method: "DELETE",
    });
    return await res.json();
  },
);
