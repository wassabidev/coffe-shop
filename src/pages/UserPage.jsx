import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { User } from "lucide-react";

const UserPage = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const { user: userData } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  return (
    //a mejorar, usar tablas
    <div className="w-full">
      <div className="w-20 h-20 bg-gray-200 rounded-full flex justify-center items-center">
        <User className="w-10 h-10" />
      </div>
      <h1 className="text-2xl font-semibold text-left my-4">
        {userData?.name}
      </h1>

      <p className="font-medium">{userData?.email}</p>
      <p>{userData?.role}</p>
    </div>
  );
};

export default UserPage;
