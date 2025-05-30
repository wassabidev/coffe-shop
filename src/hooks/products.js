import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "@/api/api";

export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async ({ page = 1, limit = 10, all = false }) => {
    try {
      const url = all
        ? `${API_URL}/products?all=true`
        : `${API_URL}/products?page=${page}&limit=${limit}`;

      const res = await fetch(url);
      const data = await res.json();

      return data;
    } catch (error) {
      console.error("FETCH FAIL:", error);
      throw new Error(error.message || "Error del servidor");
    }
  },
);

export const createProduct = createAsyncThunk(
  "products/create",
  async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("stock", data.stock);
    formData.append("subcategory", data.subcategory);
    formData.append("category", data.category);
    formData.append("price", data.price);
    if (data.imagen) {
      formData.append("image", data.imagen);
    }

    const res = await fetch(`${API_URL}/products`, {
      method: "POST",
      body: formData,
    });

    return await res.json();
  },
);

export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, ...data }) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description || "");
    formData.append("stock", data.stock);
    formData.append("subcategory", data.subcategory);
    formData.append("category", data.category);
    formData.append("price", data.price);
    if (data.imagen) {
      formData.append("image", data.imagen);
    }

    const res = await fetch(`${API_URL}/products/${id}`, {
      method: "PUT",
      body: formData,
    });

    return await res.json();
  },
);

export const deleteProduct = createAsyncThunk("products/delete", async (id) => {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
  });
  return await res.json();
});
