import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "../features/cart/cartSlice";
import favoriteReducer from "../features/favorites/favoriteSlice";
import userReducer from "../features/users/userSlice";
import ProductsReducer from "../features/products/productSlice";
import CategoriesReducer from "../features/categories/categorySlice";
import SubcategoriesReducer from "../features/subcategories/subcategorySlice";
import RolesReducer from "../features/roles/roleSlice";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["product", "category", "subcategory"],
};

const rootReducer = combineReducers({
  cart: cartReducer,
  favorites: favoriteReducer,
  user: userReducer,
  product: ProductsReducer,
  category: CategoriesReducer,
  role: RolesReducer,
  subcategory: SubcategoriesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
        ignoredPaths: ["register"],
      },
    }),
});

export const persistor = persistStore(store);
