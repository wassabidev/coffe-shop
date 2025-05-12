import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import SideBar from "../components/SideBar";
import Search from "../components/Search";
import StatusView from "../components/StatusView";

import axiosInstance from "./api/axiosInstance";

const ListProducts = () => {
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      axiosInstance.get("/products").then((res) => setProducts(res.data));
      setLoading(false);
    } catch (error) {
      setError(error);
      console.error("Error al obtener los productos", error);
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      axiosInstance.get("/category").then((res) => setCategories(res.data));
      setLoading(false);
    } catch (error) {
      setError(error);
      console.error("Error al obtener los productos", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);
  const activeSearch = inputValue !== "" ? inputValue : searchTerm;

  const filtered = products.filter(
    (product) =>
      product.name?.toLowerCase().includes(activeSearch.toLowerCase()) ||
      product.category?.toLowerCase().includes(activeSearch.toLowerCase()) ||
      product.type?.toLowerCase().includes(activeSearch.toLowerCase()),
  );

  return (
    <>
      <StatusView
        loading={loading}
        error={error}
        empty={products.length === 0}
      />
      {!loading && !error && products.length !== 0 && (
        <main className="flex p-3 flex-grow sm:w-full sm:mx-auto md:m-0 md:w-11/12">
          <SideBar
            data={categories}
            setSearchTerm={setSearchTerm}
            resetInput={setInputValue}
          />
          <div className="flex flex-col w-full">
            <Search
              className="flex justify-end mb-2"
              searchTerm={inputValue}
              setSearchTerm={setInputValue}
              resetTerm={setSearchTerm}
            />
            <ul className="flex gap-5 flex-wrap ">
              {filtered.map((product) => (
                <li key={product._id} className="cursor-pointer">
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          </div>
        </main>
      )}
    </>
  );
};

export default ListProducts;
