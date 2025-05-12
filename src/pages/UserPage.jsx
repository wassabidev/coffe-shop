import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { formatDate } from "@/utils/date";

const UserPage = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const { user: userData } = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/order/user/${userData._id}`,
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, [userData._id]);

  if (!isAuthenticated) {
    return navigate("/");
  }

  return (
    //a mejorar, usar tablas
    <div>
      {userData.name} <br />
      {userData.email}
      <br />
      {userData.rol}
      <div className="mt-3">
        {orders && orders.length > 0 ? (
          <div>
            <h2>Orders:</h2>
            {orders.map((order) => (
              <div key={order._id} className="p-3 bg-green-100 rounded-md my-3">
                <p>Order ID: {order._id}</p>
                <p>Total: {order.total}</p>
                <span>Fecha: {formatDate(order.createdAt)}</span>

                <p>Items:</p>
                <ul>
                  {order.items.map((item) => (
                    <li key={item._id}>{item.product.name}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <h2 className="text-lg font-medium">No orders found.</h2>
        )}
      </div>
    </div>
  );
};

export default UserPage;
