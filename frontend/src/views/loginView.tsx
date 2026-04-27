import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorMessage from "../components/ErrorMessage";
import type { LoginForm } from "../types";
import api from "../config/axios";
import { toast } from "sonner";
import { isAxiosError } from "axios";

export default function LoginView() {
  const initialValues: LoginForm = {
    email: "",
    password: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const handleLogin = async (formData: LoginForm) => {
    try {
      const { data } = await api.post(`/auth/login`, formData);
      localStorage.setItem("AUTH_TOKEN", data.token);
      toast.success(data.message);

    } catch (error) {
      if (isAxiosError(error) && error.response) {
        console.error("Error en la solicitud:", error.response.data.error);
        toast.error(error.response.data.error);
      }
    }
  };

  return (
  <>
    <h1 className="text-3xl font-semibold text-gray-800 text-center">
      Iniciar sesión
    </h1>

    <form
      onSubmit={handleSubmit(handleLogin)}
      className="bg-white mt-8 px-6 py-8 rounded-xl border border-gray-200 space-y-6"
      noValidate
    >
      <div className="flex flex-col space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-gray-600">
          Correo electrónico
        </label>
        <input
          id="email"
          type="email"
          placeholder="Email de registro"
          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          {...register("email", {
            required: "El Email es obligatorio",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "E-mail no válido",
            },
          })}
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="password" className="text-sm font-medium text-gray-600">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          placeholder="Password de registro"
          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          {...register("password", {
            required: "El Password es obligatorio",
          })}
        />
        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}
      </div>

      <input
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-md transition cursor-pointer"
        value="Iniciar sesión"
      />
    </form>

    <nav className="mt-6">
      <Link
        className="block text-center text-sm text-gray-500 hover:text-blue-600 transition"
        to="/auth/register"
      >
        ¿No tienes cuenta? Regístrate
      </Link>
    </nav>
  </>
);
}
