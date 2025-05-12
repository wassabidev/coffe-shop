import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user: userData, token } = useSelector((state) => state.user);

  if (!token || !userData) {
    return <Navigate to="/login" />;
  }
  if (!allowedRoles.includes(userData.role)) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
