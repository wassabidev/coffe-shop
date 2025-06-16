import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import EyeInpunt from "../components/ui/EyeInpunt";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { API_URL } from "@/api/api";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.user);

  const formSchema = z
    .object({
      name: z.string().min(2, "Elnombre debe tener al menos 2 caracteres"),
      password: z
        .string()
        //cambiar minimo a 8
        .min(5, "La contraseña debe tener al menos 5 caracteres")
        .regex(/[a-zA-Z]/, "La contraseña debe contener al menos una letra")
        .regex(/[0-9]/, "La contraseña debe contener al menos un número"),
      email: z.string().email("Correo no válido"),
      confirmPassword: z.string().min(1, "Debes confirmar la contraseña"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Las contraseñas no coinciden",
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
    return navigate("/");
  }
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await axios.post(`${API_URL}/user/register`, data);
      toast.success("Usuario creado con éxito");
      setTimeout(() => {
        setLoading(false);
      }, "800");
      setError("");

      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "Error al iniciar sesión");
      setTimeout(() => {
        setLoading(false);
      }, "500");
    }
  };

  return (
    <div className="flex h-dvh w-full justify-center">
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
          </div>
        </div>
      )}
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
            <h1 className="text-2xl">Crear usuario</h1>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            {error && (
              <div className="border-red-500 border bg-red-100 text-red-500 p-3 rounded-md">
                {error}
              </div>
            )}
            <div>
              <label htmlFor="name">Nombre</label>
              <input
                id="name"
                type="text"
                {...register("name")}
                onChange={() => clearErrors("name")}
                className={`${
                  errors.name
                    ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500"
                    : "bg-gray-50 border-[0.1rem] border-gray-300 focus:border-blue-400"
                } !mt-2  text-gray-900 text-sm rounded-lg  block w-full p-2.5`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="email">Correo</label>
              <input
                id="email"
                type="text"
                {...register("email")}
                onChange={() => clearErrors("email")}
                className={`${
                  errors.email
                    ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500"
                    : "bg-gray-50 border-[0.1rem] border-gray-300 focus:border-blue-400"
                } !mt-2  text-gray-900 text-sm rounded-lg  block w-full  p-2.5`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password">Contraseña</label>
              <div className="relative w-full">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  onChange={() => clearErrors("password")}
                  className={`${
                    errors.password
                      ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500"
                      : "bg-gray-50 border-[0.1rem] border-gray-300 focus:border-blue-400"
                  } !mt-2 text-gray-900 text-sm rounded-lg  block w-full p-2.5`}
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
            <div>
              <label htmlFor="confirmPassword">Confirmar contraseña</label>
              <div className="relative items-center justify-center">
                <input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  {...register("confirmPassword")}
                  onChange={() => clearErrors("confirmPassword")}
                  className={`${
                    errors.confirmPassword
                      ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500"
                      : "bg-gray-50 border-[0.1rem] border-gray-300 focus:border-blue-400"
                  } !mt-2  text-gray-900 text-sm rounded-lg  block w-full p-2.5`}
                />
                <button
                  className="cursor-pointer bg-transparent absolute right-2 top-5 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <EyeInpunt showPassword={showPassword} />
                </button>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
            <div className="py-4 flex justify-end">
              <Link
                to={"/login"}
                className="text-blue-400 underline font-regular"
              >
                Iniciar sesión
              </Link>
            </div>
            <button className="block p-3 rounded-lg bg-gray-800 !text-gray-100 cursor-pointer">
              Crear
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
