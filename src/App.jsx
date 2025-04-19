import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ListProducts from './pages/ListProducts'
import Cart from './pages/CartDetail'
import ProductsDetails from './pages/ProductsDetails'
import AdminLayout from './pages/AdminLayout'
import AdminProducts from './admin/pages/Products'
import AdminCategories from './admin/pages/Categories'
import Favorite from './pages/Favorites'
import NoFound from './pages/NotFound'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='*' element={<NoFound />} />

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
  )
}

export default App
