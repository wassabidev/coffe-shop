import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "@/api/api";

export const fetchCategories = createAsyncThunk(
  "categories/fetch",
  async ({ page = 1, limit = 10 }) => {
    try {
      const res = await fetch(
        `${API_URL}/category?page=${page}&limit=${limit}`,
      );

      return await res.json();
    } catch (err) {
      throw new Error(err.message || "Error del servidor");
    }
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
  async ({ id, ...data }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/category/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        return rejectWithValue(json);
      }

      return json;
    } catch (err) {
      console.error(err);
      return rejectWithValue({ message: "Error al actulizar la categoria" });
    }
  },
);
export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/category/${id}`, {
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
        message: "Error de red al eliminar la categoria",
      });
    }
  },
);
