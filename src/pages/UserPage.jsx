import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { formatDate } from "@/utils/date";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { API_URL } from "@/api/api";

const UserPage = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const { user: userData } = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 5;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (!userData?._id) return;

    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/order/user/${userData._id}?page=${page}&limit=${limit}`,
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, [userData?._id]);

  if (!isAuthenticated) return null;

  return (
    //a mejorar, usar tablas
    <div>
      {userData?.name} <br />
      {userData?.email}
      <br />
      {userData?.rol}
      <div className="mt-3 ">
        {orders && orders.length > 0 ? (
          <div>
            <h2>Orders:</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="p-3 bg-green-100 rounded-md my-3"
                >
                  <p className="ellipsis">Order ID: {order._id}</p>
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
          </div>
        ) : (
          <h2 className="text-lg font-medium">No orders found.</h2>
        )}
      </div>
    </div>
  );
};

export default UserPage;
