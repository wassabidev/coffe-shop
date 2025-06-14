import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "@/api/api";

export const fetchFavorites = createAsyncThunk(
  "favorites/fetch",
  async ({ page = 1, limit = 10 } = {}, { getState, rejectWithValue }) => {
    const token = getState().user.token;

    try {
      const res = await fetch(
        `${API_URL}/favorites?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const json = await res.json();
      if (!res.ok) {
        return rejectWithValue(json);
      }
      return json;
    } catch (err) {
      return rejectWithValue({
        message: "Error al obtener favoritos",
        error: err.message,
      });
    }
  },
);

export const toggleFavorite = createAsyncThunk(
  "favorites/create",
  async (product, { getState, rejectWithValue }) => {
    console.log("JSON:", product);
    try {
      const token = getState().user.token;
      const res = await fetch(`${API_URL}/favorites`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ product: product }),
      });

      const json = await res.json();

      if (!res.ok) {
        return rejectWithValue(json);
      }
      return json;
    } catch (err) {
      return rejectWithValue({
        message: "Error al agregar el prodcuto a favoritos",
        error: err.message,
      });
    }
  },
);
