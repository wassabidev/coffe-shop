import { useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { API_URL } from "@/api/api";

function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const forgotHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/forgot-password`, {
        email: email,
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
        onSubmit={forgotHandler}
        className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded"
      >
        <h1 className="text-2xl font-bold mb-4">Contrasenha olvidada</h1>
        <p className="mb-2">Porfavor ingresa tu correo.</p>
        {error && (
          <div className="border-red-500 border text-red-400 bg-red-100 p-3 rounded-md">
            {error}
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            Ingresa tu correo
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>

        <button
          type="submit"
          className="cursor-pointer w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Enviar Email
        </button>
        <p className="mt-4 text-sm">
          Recuerdas tu contraseña{" "}
          <a href="/login" className=" text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </form>
    </>
  );
}

export default ForgotPassword;
