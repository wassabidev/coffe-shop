import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "@/api/api";

export const fetchRoles = createAsyncThunk(
  "roles/fetch",
  async ({ page = 1, limit, all = false }) => {
    try {
      const url = all
        ? `${API_URL}/role?all=true`
        : `${API_URL}/role?page=${page}&limit=${limit}`;
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      return data;
    } catch (err) {
      throw new Error(err.message || "Error del servidor");
    }
  },
);

export const createRole = createAsyncThunk("role/create", async (data) => {
  const res = await fetch(`${API_URL}/role`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await res.json();
});

export const updateRole = createAsyncThunk(
  "role/update",
  async ({ id, ...data }) => {
    const res = await fetch(`${API_URL}/role/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await res.json();
  },
);

export const deleteRole = createAsyncThunk(
  "role/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/role/${id}`, {
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
        message: "Error de red al eliminar rol",
      });
    }
  },
);
