import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../features/users/userSlice";
import LoginFooter from "../components/LoginFooter";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toaster } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import EyeInpunt from "../components/ui/EyeInpunt";
import { useState } from "react";
import { API_URL } from "@/api/api";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const formSchema = z.object({
    email: z.string().email("Correo no válido"),
    password: z
      .string()
      //cambiar minimo a 8
      .min(1, "La contraseña debe tener al menos 8 caracteres")
      .regex(/[a-zA-Z]/, "La contraseña debe contener al menos una letra")
      .regex(/[0-9]/, "La contraseña debe contener al menos un número"),
  });

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/login`, {
        email: data.email,
        password: data.password,
      });
      const token = response.data.token;
      const user = response.data.user;
      const refreshToken = response.data.refreshToken;
      dispatch(setUser({ token, user, refreshToken }));
      setTimeout(() => {
        setLoading(false);
      }, "800");
      navigate("/");
    } catch (error) {
      //esto  cambiar por un div en la parte superior
      // del form
      setError(error.response?.data?.mensaje || "Error al iniciar sesión");
      setTimeout(() => {
        setLoading(false);
      }, "800");
    }
  };

  return (
    <div className="flex h-dvh w-full">
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
          </div>
        </div>
      )}
      <Toaster />
      <div className="bg-[#FFC671] bg-opacity-50 hidden md:flex items-center justify-center w-1/2">
        <img src="/assets/michi.svg" className="w-2xs" alt="" />
      </div>
      <div className="grid grid-rows-[1fr_auto] place-items-center items-center w-full md:w-1/2 relative">
        <img
          src="/assets/logocat.svg"
          alt=""
          className="absolute top-3 left-3"
        />
        <div className="bg-slate-50 self-center rounded-md p-10 w-5/6 sm:w-2/4 lg:w-1/2">
          <div className="!mb-5">
            <h1 className="text-2xl">Iniciar Sesion</h1>
            <p className="text-md text-gray-600">¡Bienvenido! </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            {error && (
              <div className="border-red-500 border text-red-400 bg-red-100 p-3 rounded-md">
                {error}
              </div>
            )}
            <div>
              <label htmlFor="email">Correo</label>
              <input
                type="text"
                {...register("email")}
                onChange={() => clearErrors("email")}
                className={`${
                  errors.email
                    ? "bg-red-50 border focus:outline-red-500 border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500"
                    : "bg-gray-50 border-[0.1rem] border-gray-300 focus:border-blue-400"
                } !mt-2 text-gray-900 text-sm rounded-lg  block w-full md:w-11/12 p-2.5`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password">Contraseña</label>
              <div className="relative">
                <input
                  type="password"
                  autoComplete="current-password"
                  {...register("password")}
                  onChange={() => clearErrors("email")}
                  className={`${
                    errors.password
                      ? "bg-red-50 border focus:outline-red-500 border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500"
                      : "bg-gray-50 border-[0.1rem] border-gray-300 focus:border-blue-400"
                  } !mt-2  text-gray-900 text-sm rounded-lg  block w-full md:w-11/12 p-2.5`}
                />
                <button
                  className="cursor-pointer bg-transparent absolute right-2 top-5 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <EyeInpunt showPassword={showPassword} />
                </button>
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
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
        <LoginFooter />
      </div>
    </div>
  );
};

export default LoginPage;
