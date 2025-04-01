import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import './App.css'
import ListProducts from './pages/ListProducts'
import Layout from './components/Layout'

import ProductsDetails from './pages/ProductsDetails'

function App() { 

  return (
    <Router>
        <Layout>
      <Routes>
          <Route path="/" element={<ListProducts />} />
          <Route path="/products/:id" element={<ProductsDetails />} /> 
      </Routes>
        </Layout>
    </Router>
  )
}

export default App
