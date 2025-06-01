import { useSelector, useDispatch } from "react-redux";
import { fetchFavorites } from "../hooks/favorites";
import ProductCard from "@/components/ProductCard";

const Favorites = () => {
  const favoritesItems = useSelector((state) => state.favorites.lista);
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  if (isAuthenticated) {
    dispatch(fetchFavorites());
  }

  if (favoritesItems.length === 0 || !favoritesItems) {
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
        {favoritesItems.map((favorite) => (
          <ProductCard product={favorite} />
        ))}
      </div>
    </section>
  );
};

export default Favorites;
