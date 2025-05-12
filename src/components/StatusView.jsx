import Loading from "./ui/Loading";

const StatusView = ({ loading, error, empty }) => {
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex justify-center flex-col items-center grow w-full">
        <img src="/assets/404.png" alt="" />
        <h2 className="text-4xl font-bold text-gray-900">Oops!</h2>
        <p className="text-lg text-center min-w-3xs text-gray-500">
          Hubo un error al cargar los productos. Por favor, intenta de nuevo más
          tarde.
        </p>
      </div>
    );
  }
  if (empty) {
    return (
      <div className="flex justify-center items-center grow w-full">
        <h2 className="text-2xl font-bold text-gray-500">
          No hay productos disponibles
        </h2>
      </div>
    );
  }
  return null;
};

export default StatusView;
