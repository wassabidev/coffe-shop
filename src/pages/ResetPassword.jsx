import { useState } from "react";
import axios from "axios";
import { API_URL } from "@/api/api";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useParams } from "react-router-dom";

function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useParams();
  const decodedToken = decodeURIComponent(token);

  const formSchema = z
    .object({
      password: z
        .string()
        .min(5, "La contraseña debe tener al menos 5 caracteres")
        .regex(/[a-zA-Z]/, "La contraseña debe contener al menos una letra")
        .regex(/[0-9]/, "La contraseña debe contener al menos un número"),
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

  const onSubmit = async (data) => {
    console.log("Enviando datos:", data);

    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/reset-password`, {
        token: decodedToken,
        newPassword: data.password,
      });
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.error("❌ Error enviando email:", error);
      setError(error?.response?.data?.message || "Error desconocido");
      setLoading(false);
    }
  };
  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
          </div>
        </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded"
      >
        <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
        <p className="mb-6">Please enter your new password.</p>
        {error && (
          <div className="border-red-500 border text-red-400 bg-red-100 p-3 rounded-md">
            {error}
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            Nueva contrasenha
          </label>
          <input
            {...register("password")}
            onChange={() => clearErrors("password")}
            type="password"
            id="password"
            name="password"
            required
            className={`${
              errors.password
                ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500"
                : "bg-gray-50 border-[0.1rem] border-gray-300 focus:border-blue-400"
            } !mt-2  text-gray-900 text-sm rounded-lg  block w-full p-2.5`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="confirm-password"
            className="block text-sm font-medium mb-2"
          >
            Confirmar Contrasena
          </label>
          <input
            {...register("confirmPassword")}
            onChange={() => clearErrors("confirmPassword")}
            type="password"
            id="confirm-password"
            name="confirmPassword"
            required
            className={`${
              errors.confirmPassword
                ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500"
                : "bg-gray-50 border-[0.1rem] border-gray-300 focus:border-blue-400"
            } !mt-2  text-gray-900 text-sm rounded-lg  block w-full p-2.5`}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="cursor-pointer w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Resetear Contrasena
        </button>
        <p className="mt-4 text-sm">
          Recuerdas tu contrasena?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </form>
    </>
  );
}

export default ResetPassword;
