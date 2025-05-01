import { useNavigate } from "react-router-dom";
import HeartICon from "./ui/HeartICon";
import { useDispatch, useSelector } from "react-redux";
import { formatPrice } from "../utils/price";
import {
  addFavorite,
  removeFavorite,
} from "../features/favorites/favoriteSlice";

import DefaulImage from "/assets/product-placeholder.png";

const ProductCard = ({ product }) => {
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isFavorited = favorites.some(
    (favorite) => favorite._id === product._id,
  );

  const handleFavorite = (event, product) => {
    event.stopPropagation();
    if (isFavorited) {
      dispatch(removeFavorite(product));
    } else {
      dispatch(addFavorite(product));
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
    <div
      className="cursor-pointer flex flex-col gap-2 p-3 rounded-md border-[0.1rem] border-gray-200"
      onClick={handleNavigate}
    >
      <div className="relative">
        <button
          className={`absolute cursor-pointer top-2 right-2`}
          onClick={(event) => handleFavorite(event, product)}
        >
          <HeartICon color={isFavorited} />
        </button>
        <img
          src={!product.image ? DefaulImage : `/uploads/${product.image}`}
          className="w-3xs rounded-lg"
          alt=""
          style={{ viewTransitionName: `product-${product._id}` }}
        />
      </div>
      <div className="flex items-start flex-col">
        <h5>{product.name}</h5>
        <p className="font-semibold">{formatPrice(product.price)}</p>
      </div>
    </div>
  );
};

export default ProductCard;
