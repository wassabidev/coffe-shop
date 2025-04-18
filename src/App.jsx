
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import './App.css'
import ListProducts from './pages/ListProducts'
import Layout from './components/Layout'
import Cart from './pages/CartDetail'
import ProductsDetails from './pages/ProductsDetails'
import AdminDashboard from './pages/AdminLayout'

function App() {

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<ListProducts />} />
          <Route path="/products/:id" element={<ProductsDetails />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
