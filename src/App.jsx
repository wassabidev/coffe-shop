import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout";

import AdminLayout from "./pages/AdminLayout";
import AdminProducts from "./admin/pages/ProductsPage";
import AdminCategories from "./admin/pages/CategoriesPage";
import AdminSubcategoriesPage from "./admin/pages/SubcategoriesPage";
import AdminUsers from "./admin/pages/UsersPage";
import AdminRoles from "./admin/pages/RolesPage";

import NoFound from "./pages/NotFound";

import LoginPage from "./pages/LoginPage";
import Cart from "./pages/CartDetail";
import ListProducts from "./pages/ListProducts";
import ProductsDetailsPage from "./pages/ProductsDetailsPage";
import Favorite from "./pages/Favorites";
import History from "./pages/HistoryPage";
import SignUpPage from "./pages/SignUpPage";
import UserPage from "./pages/UserPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";
import AboutUsPage from "./pages/AboutUsPage";
import ContactUsPage from "./pages/ContactUsPage";

function App() {
  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <Router>
      <Routes>
        <Route path="*" element={<NoFound />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Cliente */}
        <Route element={<Layout />}>
          <Route path="/" element={<ListProducts />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favorites" element={<Favorite />} />
          <Route path="/history" element={<History />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route
            path="/user"
            element={<UserPage isAuthenticated={isAuthenticated} />}
          />
        </Route>

        <Route element={<Layout noPadding={true} />}>
          <Route path="/products/:id" element={<ProductsDetailsPage />} />
        </Route>

        {/* Admin */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["admin", "cashier", "manager"]} />
          }
        >
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="products" replace />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="subcategories" element={<AdminSubcategoriesPage />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="roles" element={<AdminRoles />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
