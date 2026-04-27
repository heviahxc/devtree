import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorMessage from "../components/ErrorMessage";
import {toast} from 'sonner'
import { isAxiosError } from "axios";
import type { RegisterForm } from "../types";
import api from "../config/axios";

export default function RegisterView() {
  const initialValues: RegisterForm = {
    name: "",
    email: "",
    handle: "",
    password: "",
    password_confirmation: "",
  };

  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const password = watch("password");

  const handleRegister = async(formData: RegisterForm) => {
    try {
      const {data} = await api.post(`/auth/register`, formData);
      toast.success(data.message);
      reset();

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
      Crear cuenta
    </h1>

    <form
      onSubmit={handleSubmit(handleRegister)}
      className="bg-white mt-8 px-6 py-8 rounded-xl border border-gray-200 space-y-6"
    >
      <div className="flex flex-col space-y-2">
        <label
          htmlFor="name"
          className="text-sm font-medium text-gray-600"
        >
          Nombre completo
        </label>
        <input
          id="name"
          type="text"
          placeholder="Tu nombre"
          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          {...register("name", { required: "El nombre es requerido" })}
        />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </div>

      <div className="flex flex-col space-y-2">
        <label
          htmlFor="email"
          className="text-sm font-medium text-gray-600"
        >
          Correo electrónico
        </label>
        <input
          id="email"
          type="email"
          placeholder="Email de registro"
          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          {...register("email", {
            required: "El email es requerido",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Email inválido",
            },
          })}
        />
        {errors.email && (
          <ErrorMessage>{errors.email.message}</ErrorMessage>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <label
          htmlFor="handle"
          className="text-sm font-medium text-gray-600"
        >
          Handle
        </label>
        <input
          id="handle"
          type="text"
          placeholder="Nombre de usuario: sin espacios"
          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          {...register("handle", { required: "El handle es requerido" })}
        />
        {errors.handle && (
          <ErrorMessage>{errors.handle.message}</ErrorMessage>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <label
          htmlFor="password"
          className="text-sm font-medium text-gray-600"
        >
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          placeholder="Password de registro"
          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          {...register("password", {
            required: "La contraseña es requerida",
            minLength: {
              value: 6,
              message: "La contraseña debe tener al menos 6 caracteres",
            },
          })}
        />
        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <label
          htmlFor="password_confirmation"
          className="text-sm font-medium text-gray-600"
        >
          Repetir contraseña
        </label>
        <input
          id="password_confirmation"
          type="password"
          placeholder="Repetir contraseña"
          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          {...register("password_confirmation", {
            required: "La confirmación de la contraseña es requerida",
            validate: (value) =>
              value === password || "Las contraseñas no coinciden",
          })}
        />
        {errors.password_confirmation && (
          <ErrorMessage>
            {errors.password_confirmation.message}
          </ErrorMessage>
        )}
      </div>

      <input
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-md transition cursor-pointer"
        value="Crear cuenta"
      />
    </form>

    <nav className="mt-6">
      <Link
        className="block text-center text-sm text-gray-500 hover:text-blue-600 transition"
        to="/auth/login"
      >
        ¿Ya tienes cuenta? Inicia sesión
      </Link>
    </nav>
  </>
);
}
