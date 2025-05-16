import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCategories = createAsyncThunk(
  "categories/fetch",
  async () => {
    const res = await fetch("http://localhost:5001/api/category");

    return await res.json();
  },
);

export const createCategory = createAsyncThunk(
  "categroy/create",
  async (data) => {
    const res = await fetch("http://localhost:5001/api/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await res.json();
  },
);

export const updateCategory = createAsyncThunk(
  "category/update",
  async ({ id, ...data }) => {
    const res = await fetch(`http://localhost:5001/api/category/${id}`, {
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
  "products/delete",
  async (id) => {
    const res = await fetch(`http://localhost:5001/api/products/${id}`, {
      method: "DELETE",
    });
    return await res.json();
  },
);
