import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import AdminLayout from "./pages/AdminLayout";
import AdminProducts from "./admin/pages/Products";
import AdminCategories from "./admin/pages/Categories";

import NoFound from "./pages/NotFound";

import LoginPage from "./pages/LoginPage";
import Cart from "./pages/CartDetail";
import ListProducts from "./pages/ListProducts";
import ProductsDetails from "./pages/ProductsDetails";
import Favorite from "./pages/Favorites";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<NoFound />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Cliente */}
        <Route element={<Layout />}>
          <Route path="/" element={<ListProducts />} />
          <Route path="/products/:id" element={<ProductsDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favorites" element={<Favorite />} />
        </Route>

        {/* Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="products" element={<AdminProducts />} />
          <Route path="categories" element={<AdminCategories />} />
          {/* <Route path="users" element={<AdminUsers />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
