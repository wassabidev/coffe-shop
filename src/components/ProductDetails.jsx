import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addItem } from "../features/cart/cartSlice";
import ImagePlaceHolder from "/assets/product-placeholder.png";
import { formatPrice } from "../utils/price";
import CupButton from "./ui/CupButton";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const ProductDetails = ({ product }) => {
  const [loaded, setLoaded] = useState(false);
  const [activeCup, setActiveCup] = useState("");
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleAddItem = (product) => {
    const maxQuantity = 12;
    const currentQuantity = cartItems.reduce(
      (total, item) => total + item.quantity,
      0,
    );
    if (currentQuantity >= maxQuantity) {
      toast.error("No se puede agregar más de 12 productos al carrito", {
        position: "top-center",
      });
      return;
    }
    if (!activeCup) {
      toast("Debe seleccionar un tamano", {
        icon: "❗",
        position: "top-center",
      });
      return;
    }
    dispatch(addItem({ product, size: activeCup }));
    toast(
      () => (
        <>
          <p>
            {product.name} agregado
            <Link to="/cart" className="pl-2 text-blue-500 underline ">
              Ir al carrito
            </Link>
          </p>
        </>
      ),
      {
        icon: "✅",
        position: "top-center",
        duration: 2000,
      },
    );
  };

  const cupSizes = [
    { size: "Pequeño", value: "small" },
    { size: "Mediano", value: "medium" },
    { size: "Grande", value: "large" },
  ];

  return (
    <div className="grid grid-cols-1 w-full">
      <Toaster position="bottom-center" reverseOrder={true} />
      <div className="bg-[#1f3933] p-3 w-full mb-6">
        <div className="w-full flex justify-center">
          {!loaded && (
            <img
              src={ImagePlaceHolder}
              className="absolute top-0 left-0 w-full h-auto opacity-50 animate-pulse"
              alt="placeholder"
            />
          )}
          <img
            src={product.image ? `/uploads/${product.image}` : ImagePlaceHolder}
            alt={product.name}
            onLoad={() => setLoaded(true)}
            className={`rounded-md w-56 h-auto transition-opacity duration-300 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
            style={{ viewTransitionName: `product-${product._id}` }}
          />
        </div>
        <div className="flex items-center flex-col gap-4">
          <h2 className="text-center text-3xl max-w-2/3 text-slate-50 !mb-0 font-bold">
            <span>{product.name}</span>
            <span className="!ml-2 text-sm rounded-md px-3 py-1 bg-green-100 text-green-500 w-fit">
              {product.category.name}
            </span>
          </h2>
          <p className="text-xl !m-0 font-semibold text-center text-slate-50">
            {formatPrice(product.price)}
          </p>
          <p className="text-slate-200 text-base text-center !mt-0">
            {product.description}
          </p>
        </div>
      </div>
      <div className="p-5 min-w-96 mx-auto">
        {product.category.name.toLowerCase() === "bebidas" && (
          <div className="grid grid-cols-1 gap-4justify-start">
            <h3 className="relative font-medium text-lg text-start after:bg-green-100 after:rounded-full after:content-[''] after:w-full after:h-1.5 after:absolute after:-bottom-1 after:left-0 after:opacity-50">
              Opciones de tamaño
            </h3>
            <div className="relative flex items-end justify-center gap-2">
              <div
                className={`absolute transition-transform duration-300 ease-in-out bg-green-50 border-2 border-green-800 rounded-full h-14 w-14 z-0 left-[4.5rem] top-[0.9rem]`}
                style={{
                  transform: `translateX(${cupSizes.findIndex((c) => c.value === activeCup) * 4.5}rem)`,
                  opacity: activeCup ? 1 : 0,
                }}
              ></div>
              {cupSizes.map((cupSize) => (
                <div className="relative my-4" key={cupSize.value}>
                  <CupButton
                    setActiveCup={setActiveCup}
                    imagen={cupSize.value}
                  />
                  <p className="font-medium text-md">{cupSize.size}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        <button
          onClick={() => handleAddItem(product)}
          className="bg-emerald-700 cursor-pointer hover:bg-emerald-600 !text-white py-2 px-4 rounded-md w-full"
        >
          Agregar orden
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
