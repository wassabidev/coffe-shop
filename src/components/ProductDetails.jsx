import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addItem } from "../features/cart/cartSlice";
import ImagePlaceHolder from "/assets/product-placeholder.png";
import { formatPrice } from "../utils/price";
import CupButton from "./ui/CupButton";
import toast, { Toaster } from "react-hot-toast";

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
      toast.error("No se puede agregar más de 12 productos al carrito");

      return;
    }
    dispatch(addItem(product, activeCup));
    toast.success(`${product.name} agregado`);
  };

  const cupSizes = [
    { size: "Pequeño", value: "small" },
    { size: "Mediano", value: "medium" },
    { size: "Grande", value: "large" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 items-start max-w-4xl mx-auto">
      <div className="w-full flex justify-center">
        {!loaded && (
          <img
            src={ImagePlaceHolder}
            className="absolute top-0 left-0 w-full h-auto opacity-50 animate-pulse"
            alt="placeholder"
          />
        )}
        <Toaster position="bottom-center" reverseOrder={true} />
        <img
          src={product.image ? `/uploads/${product.image}` : ImagePlaceHolder}
          alt={product.name}
          onLoad={() => setLoaded(true)}
          className={`rounded-md min-w-full h-auto transition-opacity duration-300 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          style={{ viewTransitionName: `product-${product._id}` }}
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-4 items-center">
          <h2 className="text-2xl !mb-0 font-bold text-left">{product.name}</h2>
          <span className="rounded-md px-3 py-1 bg-green-100 text-green-500 w-fit">
            {product.category.name}
          </span>
        </div>
        <p className="text-base text-gray-700 text-left">
          {product.description}
        </p>
        <p className="text-xl font-semibold text-left">
          {formatPrice(product.price)}
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1 justify-start">
            <label htmlFor="cantidad" className="font-medium text-start">
              Tamaño
            </label>
            <div className="flex items-end justify-center gap-2">
              {cupSizes.map((cupSize) => (
                <div className="relative" key={cupSize.value}>
                  <div
                    className={`bg-green-50 -z-10 transition-all ease-in-out border-2 border-green-800 rounded-full ${activeCup === cupSize.value ? "opacity-100" : "opacity-0"} h-14 w-14 absolute`}
                  ></div>
                  <label htmlFor="">
                    <input
                      type="text"
                      name="size"
                      className="absolute h-28 appearance-none top-0 w-16 -z-10"
                    />
                  </label>
                  <CupButton
                    setActiveCup={setActiveCup}
                    imagen={cupSize.value}
                  />
                  <p>{cupSize.size}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="cantidad" className="font-medium text-start">
              Cantidad
            </label>
            <input
              type="number"
              id="cantidad"
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
        </div>
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
