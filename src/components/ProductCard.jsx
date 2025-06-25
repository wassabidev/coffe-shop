import { useNavigate } from "react-router-dom";
import HeartICon from "./ui/HeartICon";
import { useDispatch, useSelector } from "react-redux";
import { formatPrice } from "../utils/price";
import {
  addFavorite,
  removeFavorite,
  //resetFavorites,
} from "../features/favorites/favoriteSlice";
import { toggleFavorite } from "../hooks/favorites";
import DefaulImage from "/assets/product-placeholder.png";

const ProductCard = ({ product }) => {
  const favorites = useSelector((state) => state.favorites.lista || []);
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //console.log("ProductCard", favorites);

  const toggleGuestFavorite = (productId) => {
    const stored = JSON.parse(localStorage.getItem("guestFavorites") || "[]");
    const updated = stored.includes(productId)
      ? stored.filter((id) => id !== productId)
      : [...stored, productId];
    localStorage.setItem("guestFavorites", JSON.stringify(updated));
  };

  const isProductGuestFavorite = (productId) => {
    const stored = JSON.parse(localStorage.getItem("guestFavorites") || "[]");
    return stored.includes(productId);
  };

  const isFavorited = isAuthenticated
    ? favorites.some((favorite) => favorite._id === product._id)
    : isProductGuestFavorite(product._id);

  const handleFavorite = (event, product) => {
    event.stopPropagation();
    if (isAuthenticated) {
      dispatch(toggleFavorite(product._id));
    } else {
      toggleGuestFavorite(product._id);
      if (isFavorited) {
        dispatch(removeFavorite(product));
      } else {
        dispatch(addFavorite(product));
      }
    }
  };

  const handleNavigate = () => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        navigate(`/products/${product._id}`);
      });
    } else {
      navigate(`/products/${product._id}`);
    }
  };

  return (
    <li
      key={product._id}
      className="cursor-pointer flex flex-col gap-2 p-3 rounded-md border-[0.1rem] border-gray-200 w-full shadow-md hover:shadow-lg transition-all duration-300"
      onClick={handleNavigate}
    >
      <div className="relative">
        <img
          src={!product.image ? DefaulImage : `/uploads/${product.image}`}
          className="rounded-lg object-cover h-52 w-full"
          alt={product.name || "Default Image"}
        />
        <button
          className={`absolute cursor-pointer -top-4 -right-3 `}
          onClick={(event) => handleFavorite(event, product)}
        >
          <span className={`heart ${isFavorited && "heart_animate"}`}></span>
        </button>
      </div>
      <div className="flex items-start flex-col">
        <h5>{product.name}</h5>
        <p className="font-semibold">{formatPrice(product.price)}</p>
      </div>
    </li>
  );
};

export default ProductCard;
