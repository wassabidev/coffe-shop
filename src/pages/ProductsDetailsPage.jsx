import { useState, useEffect } from "react";
import ProductDetails from "../components/ProductDetails";
import { useParams } from "react-router-dom";
import Loading from "@/components/ui/Loading";
import axios from "axios";
import { API_URL } from "@/api/api";

const ProductsDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/products/${id}`);
        setProduct(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError(error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <Loading />;
  if (error) {
    return (
      <div className="flex w-full flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-red-500">
          Opps! Algo salio mal
        </h1>
        <p className="text-lg text-gray-700">Intentelo de vuelta luego</p>
      </div>
    );
  }

  return <ProductDetails product={product} />;
};

export default ProductsDetailsPage;
