import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import SideBar from "../components/SideBar";
import Search from "../components/Search";
import StatusView from "../components/StatusView";
import { fetchProducts } from "../hooks/products";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const ListProducts = () => {
  const products = useSelector((state) => state.product.lista);
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/category");
      setCategories(res.data.data);
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
  console.log("searchterm", searchTerm);

  const filtered = products.filter((product) => {
    const nameMatch = product.name
      ?.toLowerCase()
      .includes(activeSearch.toLowerCase());

    const subMatch = product.subcategory?.name
      ?.toLowerCase()
      .includes(activeSearch.toLowerCase());
    console.log("namematch:", nameMatch, "submatch", subMatch);

    return nameMatch || subMatch;
  });

  console.log("filtro:", filtered, "productos: ", products);

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
            <ul className="justify-center lg:justify-start flex gap-5 flex-wrap">
              {filtered.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))}
            </ul>
          </div>
        </main>
      )}
    </>
  );
};

export default ListProducts;
