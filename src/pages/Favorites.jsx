import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchFavorites } from "@/hooks/favorites";

import ProductCard from "@/components/ProductCard";
import { Loader2 } from "lucide-react";

const Favorites = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  const allProducts = useSelector((state) => state.product.lista || []);
  const authFavorites = useSelector((state) => state.favorites.lista || []);
  const guestFavoritesIds = JSON.parse(
    localStorage.getItem("guestFavorites") || "[]",
  );
  const { loading: loadingFavorites } = useSelector((state) => state.favorites);
  const { loading: loadingProducts } = useSelector((state) => state.product);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchFavorites());
    }
  }, [dispatch, isAuthenticated]);

  const getFavoritesItems = () => {
    return isAuthenticated
      ? authFavorites
      : allProducts.filter((p) => guestFavoritesIds.includes(p._id));
  };

  if (
    (isAuthenticated && loadingFavorites) ||
    (!isAuthenticated && loadingProducts)
  ) {
    return (
      <div className="flex items-center w-full justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-gray-900" />
      </div>
    );
  }

  if (getFavoritesItems().length === 0) {
    return (
      <div className="flex flex-col gap-5">
        <h2 className="text-3xl font-bold text-left my-4">
          Agrega tus favoritos
        </h2>
        <div className="max-w-80">
          <img src="/assets/fav-tapes.png" alt="" className="w-full mb-3" />
          <h2 className="text-2xl font-bold text-left my-4">
            Guarda tus favoritos
          </h2>
          <p className="text-gray-500 font-medium text-left">
            Usa el corazon para guardar tus favoritos, y que aparezcan aqui.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section>
      <h2 className="text-3xl font-bold text-left my-4">Mis favoritos</h2>
      <div className="container">
        {getFavoritesItems().map((favorite) => (
          <ProductCard product={favorite} key={favorite._id} />
        ))}
      </div>
    </section>
  );
};

export default Favorites;
