import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../provider/authProvider";

const LoginPage = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post("http://localhost:5001/api/login", {
        email,
        password,
      });
      const token = response.data.token;
      setToken(token);
      navigate("/");
    } catch (error) {
      console.error("error al iniciar session", error);
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
                className="!mt-2 bg-gray-50 border-[0.1rem] border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-400 block w-full md:w-11/12 p-2.5"
              />
            </div>

            <div>
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                className="!mt-2 bg-gray-50 border-[0.1rem] border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-400 block w-full md:w-11/12 p-2.5"
              />
            </div>
            <div className="py-4 flex justify-end">
              <Link className="text-blue-400 underline">
                Olvide mi contraseña
              </Link>
            </div>
            <button className="block p-3 rounded-lg bg-gray-800 !text-gray-100">
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
