import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { formatDate } from "@/utils/date";
import { formatPrice } from "@/utils/price";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { API_URL } from "@/api/api";
import { useSelector } from "react-redux";
import Loading from "../components/ui/Loading";

const HistoryPage = () => {
  const { user: userData } = useSelector((state) => state.user);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    if (!userData?._id) return;

    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          `${API_URL}/order/user/${userData._id}?page=${page}&limit=${limit}`,
        );
        setOrders(response.data.data.orders);
        setPage(response.data.data.page);
        setTotalPages(response.data.data.pages);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error);
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, [userData?._id, page]);

  return (
    <div>
      <div>
        <h2 className="text-3xl font-bold text-left my-4">Historial </h2>
      </div>
      {loading && <Loading></Loading>}

      <div className="mt-3 ">
        {orders && orders.length > 0 ? (
          <div>
            <h2 className="text-xl font-semibold text-left my-4">Orders:</h2>
            <div className="container">
              {!error ? (
                orders.map((order) => (
                  <div
                    key={order._id}
                    className="p-3 bg-gray-100 rounded-mdshadow-md"
                  >
                    <p className="ellipsis">
                      <strong>Order ID:</strong> {order._id}
                    </p>
                    <p>
                      <strong>Total:</strong> {formatPrice(order.total)}
                    </p>
                    <span>
                      <strong>Fecha:</strong> {formatDate(order.createdAt)}
                    </span>

                    <p>
                      <strong>Items:</strong>
                    </p>
                    <ul>
                      {order.items.map((item) => (
                        <li key={item._id}>{item.product.name}</li>
                      ))}
                    </ul>
                  </div>
                ))
              ) : (
                <>
                  <p>Opps!</p>
                  <p> Ocurrio un error</p>
                </>
              )}
            </div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  />
                </PaginationItem>

                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href="#"
                      isActive={i + 1 === page}
                      onClick={() => setPage(i + 1)}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={() =>
                      setPage((prev) => Math.min(prev + 1, totalPages))
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        ) : (
          <div>
            <img src="/assets/moon-phases.gif" alt="" />

            <div>
              <h3 className="text-2xl font-semibold text-left mt-3 mb-2">
                Cuando la historia se repite
              </h3>
              <p className="text-base font-medium text-gray-700">
                Aqui se mostraran tus compras anterios
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
