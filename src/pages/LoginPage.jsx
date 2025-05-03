import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../features/users/userSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5001/api/login", {
        email,
        password,
      });
      const token = response.data.token;
      const user = response.data.user;
      dispatch(setUser({ token, user }));
      navigate("/");
    } catch (error) {
      console.error(
        "error al iniciar sesión",
        error.response?.data?.mensaje || error.message,
      );
      setError(error.response?.data?.mensaje || "Error desconocido");
    }
  };

  return (
    <div className="flex h-dvh gap-3 w-full">
      <div className="bg-[#FFC671] bg-opacity-50 hidden md:flex items-center justify-center w-1/2">
        <img src="/assets/michi.svg" className="w-2xs" alt="" />
      </div>
      <div className="flex justify-center items-center w-full md:w-1/2 relative">
        <img
          src="/assets/logocat.svg"
          alt=""
          className="absolute top-5 left-5"
        />
        <div className="bg-slate-50 rounded-md p-10 w-5/6  lg:w-1/2">
          <div className="!mb-5">
            <h1 className="text-2xl">Iniciar Sesion</h1>
            <p className="text-md text-gray-600">¡Bienvenido! </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div>
              <label htmlFor="email">Correo</label>
              <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                className="!mt-2 bg-gray-50 border-[0.1rem] border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-400 block w-full md:w-11/12 p-2.5"
              />
            </div>

            <div>
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className={`${
                  error
                    ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500"
                    : ""
                } 
                  !mt-2 bg-gray-50 border-[0.1rem] border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-400 block w-full md:w-11/12 p-2.5`}
              />
              {error && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">Oh, snapp!</span> {error}
                </p>
              )}
            </div>
            <div className="py-4 flex justify-end">
              <Link className="text-blue-400 underline">
                Olvide mi contraseña
              </Link>
            </div>
            <button className="block p-3 rounded-lg bg-gray-800 !text-gray-100 cursor-pointer">
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
