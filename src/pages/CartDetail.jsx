import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Delete from "../components/ui/Delete";
import Edit from "../components/ui/Edit";
import { formatPrice } from "../utils/price";
import { addItem, removeItem } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

const CartDetail = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAdd = (event, item) => {
    event.stopPropagation();
    dispatch(addItem(item));
  };

  const handleDelete = (event, item) => {
    event.stopPropagation();
    dispatch(removeItem(item));
    console.log(item._id);
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col gap-5">
        <h1 className="text-2xl font-bold">No hay productos en el carrito</h1>
        <p className="text-lg font-bold">
          Agrega productos al carrito para verlos aquí.
        </p>
      </div>
    );
  }

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  console.log(cartItems);
  return (
    <div className="md:max-w-4/5 w-full md:mx-auto">
      <h1 className="text-2xl font-bold">Ver ordenes</h1>
      {cartItems.map((item) => (
        <div
          onClick={() => navigate(`/products/${item._id}`)}
          key={item._id}
          className="flex flex-col gap-2 cursor-pointer rounded-lg shadow-md border-gray-400 p-5 my-5 lg:m-5 w-full"
        >
          <div className="flex gap-4 items-center">
            <img
              src={`/uploads/${item.image}`}
              alt={item.name}
              className="w-25 h-25 rounded-full"
            />
            <div className="w-full">
              <div className="flex gap-2 items-center justify-between">
                <h2 className="text-lg font-bold !mb-1">{item.name}</h2>
                <p className="text-lg font-bold !mb-1">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
              <p className="text-left">{item.description}</p>
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

      <div className="!mt-4 w-full max-w-1/2 ml-auto">
        <div className="mb-3 flex !mt-1 items-end">
          <p className="font-semibold !mb-2">Total</p>
          <div className="flex-grow m-0 h-3 dots"></div>
          <p className="text-lg font-semibold !mb-2">{formatPrice(total)}</p>
        </div>
        <button className="!ml-auto block !mt-4">
          <p className="text-lg font-semibold text-white bg-black px-4 py-2 rounded-md">
            Confirmar compra
          </p>
        </button>
      </div>
    </div>
  );
};

export default CartDetail;
