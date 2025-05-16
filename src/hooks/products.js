import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  try {
    const res = await fetch("http://localhost:5001/api/products");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("FETCH FAIL:", error);
    throw new Error(error.message || "Error del servidor");
  }
});

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

    const res = await fetch("http://localhost:5001/api/products", {
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

    const res = await fetch(`http://localhost:5001/api/products/${id}`, {
      method: "PUT",
      body: formData,
    });

    return await res.json();
  },
);

export const deleteProduct = createAsyncThunk("products/delete", async (id) => {
  const res = await fetch(`http://localhost:5001/api/products/${id}`, {
    method: "DELETE",
  });
  return await res.json();
});
