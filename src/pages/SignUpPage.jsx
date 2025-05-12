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

const SignUpPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.user);

  const formSchema = z
    .object({
      name: z.string().min(2, "Elnombre debe tener al menos 2 caracteres"),
      password: z
        .string()
        //cambiar minimo a 8
        .min(1, "La contraseña debe tener al menos 8 caracteres")
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
      await axios.post("http://localhost:5001/api/register", data);
      toast.success("Usuario creado con éxito");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      console.error(
        "error al iniciar sesión",
        error.response?.data?.mensaje || error.message,
      );
    }
  };

  return (
    <div className=" h-dvh grid grid-rows-[1fr_auto] place-items-center items-center w-full md:w-1/2 relative">
      <img src="/assets/logocat.svg" alt="" className="absolute top-3 left-3" />
      <div className="bg-slate-50 self-center rounded-md p-10 w-5/6 sm:w-2/4 lg:w-1/2">
        <div className="!mb-5">
          <h1 className="text-2xl">Crear usuario</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <div>
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              {...register("name")}
              onChange={() => clearErrors("name")}
              className={`${
                errors.name
                  ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500"
                  : "bg-gray-50 border-[0.1rem] border-gray-300 focus:border-blue-400"
              } !mt-2  text-gray-900 text-sm rounded-lg  block w-full md:w-11/12 p-2.5`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="email">Correo</label>
            <input
              type="text"
              {...register("email")}
              onChange={() => clearErrors("email")}
              className={`${
                errors.email
                  ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500"
                  : "bg-gray-50 border-[0.1rem] border-gray-300 focus:border-blue-400"
              } !mt-2  text-gray-900 text-sm rounded-lg  block w-full md:w-11/12 p-2.5`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              {...register("password")}
              onChange={() => clearErrors("password")}
              className={`${
                errors.password
                  ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500"
                  : "bg-gray-50 border-[0.1rem] border-gray-300 focus:border-blue-400"
              } !mt-2 text-gray-900 text-sm rounded-lg  block w-full md:w-11/12 p-2.5`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="password">Confirmar contraseña</label>
            <div className="flex relative items-center justify-center">
              <input
                type="password"
                {...register("confirmPassword")}
                onChange={() => clearErrors("confirmPassword")}
                className={`${
                  errors.confirmPassword
                    ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500"
                    : "bg-gray-50 border-[0.1rem] border-gray-300 focus:border-blue-400"
                } !mt-2  text-gray-900 text-sm rounded-lg  block w-full md:w-11/12 p-2.5`}
              />
              <button
                className="cursor-pointer  bg-white absolute right-2 top-7 -translate-y-1/2"
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
  );
};

export default SignUpPage;
