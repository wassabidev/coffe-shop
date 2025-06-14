import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { API_URL } from "@/api/api";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user: userData, token } = useSelector((state) => state.user);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRole = async () => {
    try {
      const res = await axios.get(`${API_URL}/role/${userData.role}`);
      setRole(res.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      console.error("Error fetching role:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userData && userData.role) {
      fetchRole();
    } else {
      setLoading(false);
    }
  }, [userData]);
  if (!token || !userData) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return (
      <div className="flex w-full flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-gray-700">Cargando...</h1>
      </div>
    );
  }

  if (!allowedRoles.includes(role.name)) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
