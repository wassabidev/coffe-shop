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
  async (data, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/subcategory`, {
        method: "POST",
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
    } catch (error) {
      return rejectWithValue({ message: "Error de red al crear subcategoría" });
    }
  },
);

export const updatesubCategory = createAsyncThunk(
  "subcategory/update",
  async ({ id, ...data }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/subcategory/${id}`, {
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
      return rejectWithValue({
        message: "Error de red al actulizar subcategoría",
      });
    }
  },
);
export const deletesubCategory = createAsyncThunk(
  "subcategory/delete",
  async (id) => {
    try {
      const res = await fetch(`${API_URL}/subcategory/${id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al eliminar subcategoría");
      }
      return json;
    } catch (err) {
      return {
        message: "Error de red al eliminar subcategoría",
      };
    }
  },
);
