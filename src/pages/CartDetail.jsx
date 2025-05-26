import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Delete from "../components/ui/Delete";
import Edit from "../components/ui/Edit";
import { formatPrice } from "../utils/price";
import { addItem, removeItem, clearCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./api/axiosInstance";
import toast, { Toaster } from "react-hot-toast";
import Modal from "@/components/ui/Modal";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

const CartDetail = () => {
  const [showModal, setShowModal] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);

  const { items: cartItems, total } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.user);

  const handleAdd = (event, item) => {
    event.stopPropagation();
    dispatch(addItem(item));
  };

  const handleDelete = (event, item) => {
    event.stopPropagation();
    dispatch(removeItem(item));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!isAuthenticated) {
      toast.error("Debes iniciar sesión para confirmar la compra", {
        position: "top-center",
      });
      return;
    }
    try {
      const res = await axiosInstance.post("/order", {
        items: cartItems,
        total,
      });
      setLastOrder(res.data);
      setShowModal(true);
      dispatch(clearCart());
      setTimeout(() => {
        setIsLoading(false);
      }, 5000);
    } catch (error) {
      setIsLoading(false);
      console.error(
        "error al confirmar la orden",
        error.response?.data?.mensaje || error.message,
      );
      toast.error(`Opps! Hubo un error al crear la orden`, {
        position: "top-center",
      });
    }
  };

  return (
    <div className="md:max-w-4/5 w-full md:mx-auto">
      <Toaster />
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
          </div>
        </div>
      )}
      {showModal && lastOrder && (
        <Modal order={lastOrder} setShowModal={setShowModal} />
      )}
      {cartItems.length == 0 && (
        <div className="flex h-full flex-col items-center justify-center">
          <h1 className="text-3xl text-center font-semibold mb-2">
            No hay productos en el carrito
          </h1>
          <p className="text-lg text-center text-gray-600 font-semibold">
            Agrega productos al carrito para verlos aquí.
          </p>
          <Link
            to={"/"}
            className="text-medium mt-3 font-regular text-white bg-green-900 px-4 py-2 rounded-md"
          >
            Volver al inicio
          </Link>
        </div>
      )}
      {cartItems.length > 0 && (
        <>
          <h1 className="text-2xl font-bold">Ver ordenes</h1>
          {cartItems.map((item) => (
            <div
              onClick={() => navigate(`/products/${item.product._id}`)}
              key={item.product._id}
              className="flex flex-col gap-2 cursor-pointer rounded-lg shadow-md border-gray-400 p-5 my-5 lg:m-5 w-full"
            >
              <div className="flex gap-4 items-center">
                <img
                  src={`/uploads/${item.product.image}`}
                  alt={item.product.name}
                  className="w-25 h-25 rounded-full"
                />
                <div className="w-full">
                  <div className="flex lg:gap-2 flex-wrap items-center justify-between">
                    <h2 className="text-lg font-bold !mb-1">
                      {item.product.name}
                    </h2>
                    <p className="text-lg font-bold  !mb-1">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                  <p className="text-left text-gray-500">
                    {item.product.description}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  className="cursor-pointer"
                  onClick={(event) => handleDelete(event, item)}
                >
                  <Delete />
                </button>
                <p className="flex items-end !mb-0">{item.quantity}</p>
                <button
                  className="cursor-pointer"
                  onClick={(event) => handleAdd(event, item)}
                >
                  <Edit />
                </button>
              </div>
            </div>
          ))}

          <hr className="my-4 border-t border-gray-200" />

          <div className="my-4 w-full md:max-w-1/2 ml-auto">
            <div className="mb-3 flex !mt-1 items-end">
              <p className="font-semibold !mb-2">Total</p>
              <div className="flex-grow m-0 h-3 dots"></div>
              <p className="text-lg font-semibold !mb-2">
                {formatPrice(total)}
              </p>
            </div>
            <button
              onClick={handleSubmit}
              className="ml-auto block !mt-4 cursor-pointer"
            >
              <span className="text-lg font-semibold text-white bg-green-900 px-4 py-2 rounded-md">
                Confirmar compra
              </span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartDetail;
