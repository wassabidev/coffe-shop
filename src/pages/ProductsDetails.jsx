import { useState, useEffect } from 'react'
import ProductDetails from '../components/ProductDetails'
import { useParams } from 'react-router-dom'

const ProductsDetails = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/products/${id}`)
        const data = await response.json()
        setProduct(data)
      } catch (error) {
        console.error('Error fetching product:', error)
      }
    }
    fetchProduct()
  }, [id])
  if (!product) return <div>Loading...</div>
  return (
    <ProductDetails product={product} />
  )
}

export default ProductsDetails
