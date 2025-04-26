import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../features/cart/cartSlice";
import ImagePlaceHolder from "/assets/product-placeholder.png";

const ProductDetails = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleAddItem = (product) => {
    const maxQuantity = 12;
    const currentQuantity = cartItems.reduce(
      (total, item) => total + item.quantity,
      0,
    );
    if (currentQuantity >= maxQuantity) {
      alert("No se puede agregar más de 12 productos al carrito");
      return;
    }
    dispatch(addItem(product));
    console.log("add item: ", product);
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 items-start max-w-4xl mx-auto">
      <div className="w-full flex justify-center">
        <img
          src={product.image ? `/uploads/${product.image}` : ImagePlaceHolder}
          alt={product.name}
          className="rounded-md min-w-full h-auto"
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 items-center">
          <h2 className="text-2xl !mb-0 font-bold text-left">{product.name}</h2>
          <span className="rounded-md px-3 py-1 bg-green-100 text-green-500 w-fit">
            {product.category}
          </span>
        </div>
        <p className="text-base text-gray-700 text-left">
          {product.description}
        </p>
        <p className="text-xl font-semibold text-left">{product.price}</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1 justify-start">
            <label htmlFor="cantidad" className="font-medium text-start">
              Tamaño
            </label>
            <input
              type="number"
              id="cantidad"
              className="border border-gray-300 rounded-md p-2 w-full"
            />
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
          className="bg-emerald-700 cursor-pointer hover:bg-emerald-600 text-white py-2 px-4 rounded-md w-full"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
