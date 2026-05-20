import { useForm } from "react-hook-form";
import ErrorMessage from "../components/ErrorMessage";
import { useQueryClient } from "@tanstack/react-query";
import type { ProfileForm, User } from "../types";

export default function ProfileView() {
  const queryClient = useQueryClient();
  const data: User = queryClient.getQueryData(['user'])!
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileForm>({
    defaultValues: {
      handle: data.handle ,
      description: data.description,
    },
  });

  const handleUserProfileForm = (formData: ProfileForm) => {};

  return (
    <form
      className="bg-white p-6 rounded-xl border border-gray-200 space-y-6"
      onSubmit={handleSubmit(handleUserProfileForm)}
    >
      <legend className="text-xl font-semibold text-gray-800 text-center">
        Editar información
      </legend>

      <div className="flex flex-col space-y-2">
        <label htmlFor="handle" className="text-sm font-medium text-gray-600">
          Handle
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          placeholder="Handle o nombre de usuario"
          {...register("handle", { required: "El handle es requerido" })}
        />
        {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
      </div>

      <div className="flex flex-col space-y-2">
        <label
          htmlFor="description"
          className="text-sm font-medium text-gray-600"
        >
          Descripción
        </label>
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none"
          placeholder="Tu descripción"
          {...register("description", {
            required: "La descripción es requerida",
          })}
        />
        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="image" className="text-sm font-medium text-gray-600">
          Imagen
        </label>
        <input
          id="image"
          type="file"
          name="handle"
          className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-3 file:rounded-md file:border-0 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 transition"
          accept="image/*"
          onChange={() => {}}
        />
      </div>

      <input
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-md transition cursor-pointer"
        value="Guardar cambios"
      />
    </form>
  );
}
