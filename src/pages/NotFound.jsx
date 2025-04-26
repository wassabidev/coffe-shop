import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="flex flex-col items-center justify-center h-screen px-4 text-center bg-white">
      <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
        Página no encontrada
      </h1>
      <p className="text-gray-500 text-lg mb-8">
        Lo sentimos, no pudimos encontrar la página que buscás.
      </p>
      <img
        src="/assets/no-found-page.webp"
        alt="404"
        className="w-64 md:w-96 mb-8"
      />
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
      >
        Volver al inicio
      </Link>
    </main>
  );
};

export default NotFound;
