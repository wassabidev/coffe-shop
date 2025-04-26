import React from "react";
import { useSelector } from "react-redux";
const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems);
  return (
    <div>
      <h1 className="text-2xl font-bold">Ver ordenes</h1>

      {cartItems.map((item) => (
        <div key={item._id}>
          <h2>{item.name}</h2>
          <p>{item.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Cart;
