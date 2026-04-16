import { Link } from "react-router-dom";
import {useForm} from 'react-hook-form'
import ErrorMessage from "../components/ErrorMessage";
export default function RegisterView() {
 
  const initialValues = {
    name: '',
    email: '',
    handle: '',
    password: '',
    password_confirmation: ''
  }

   const { register, watch, handleSubmit, formState: { errors } } = useForm({defaultValues: initialValues});

   const password = watch('password');
  const handleRegister = (data: any) => {
    console.log(data);
  }
  return (
    <>
      <h1 className="text-4xl text-white font-bold">Crear Cuenta</h1>
  <form 
    onSubmit={handleSubmit(handleRegister)}
    className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
>
  <div className="space-y-2">
    <label htmlFor="name" className="block text-sm font-medium text-slate-700">
      Nombre completo
    </label>
    <input
      id="name"
      type="text"
      placeholder="Tu Nombre"
     className="w-full px-4 py-2.5 bg-slate-50 text-slate-900 border-2 border-slate-200 rounded-lg placeholder-slate-400 focus:outline-none focus:bg-white focus:border-cyan-400 transition-colors"
   {...register('name', {required: 'El nombre es requerido'})}
    />
      {errors.name && <ErrorMessage> {errors.name.message}   </ErrorMessage>}

  </div>

  <div className="space-y-2">
    <label htmlFor="email" className="block text-sm font-medium text-slate-700">
      Email
    </label>
    <input
      id="email"
      type="email"
      placeholder="Email de Registro"
    className="w-full px-4 py-2.5 bg-slate-50 text-slate-900 border-2 border-slate-200 rounded-lg placeholder-slate-400 focus:outline-none focus:bg-white focus:border-cyan-400 transition-colors"
   {...register('email', {required: 'El email es requerido', pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Email inválido'}})}
   />
     {errors.email && <ErrorMessage> {errors.email.message}   </ErrorMessage>}
  </div>

  <div className="space-y-2">
    <label htmlFor="handle" className="block text-sm font-medium text-slate-700">
      Handle
    </label>
    <input
      id="handle"
      type="text"
      placeholder="Nombre de usuario: sin espacios"
      className="w-full px-4 py-2.5 bg-slate-50 text-slate-900 border-2 border-slate-200 rounded-lg placeholder-slate-400 focus:outline-none focus:bg-white focus:border-cyan-400 transition-colors"
    {...register('handle', {required: 'El handle es requerido'})}
     
   />
    {errors.handle && <ErrorMessage> {errors.handle.message}   </ErrorMessage>}
  </div>

  <div className="space-y-2">
    <label htmlFor="password" className="block text-sm font-medium text-slate-700">
      Password
    </label>
    <input
      id="password"
      type="password"
      placeholder="Password de Registro"
    className="w-full px-4 py-2.5 bg-slate-50 text-slate-900 border-2 border-slate-200 rounded-lg placeholder-slate-400 focus:outline-none focus:bg-white focus:border-cyan-400 transition-colors"
     {...register('password', {required: 'La contraseña es requerida', minLength: {value: 6, message: 'La contraseña debe tener al menos 6 caracteres'}})}
     
  />
    {errors.password && <ErrorMessage> {errors.password.message}   </ErrorMessage>}
  </div>

  <div className="space-y-2">
    <label htmlFor="password_confirmation" className="block text-sm font-medium text-slate-700">
      Repetir Password
    </label>
    <input
      id="password_confirmation"
      type="password"
      placeholder="Repetir Password"
     className="w-full px-4 py-2.5 bg-slate-50 text-slate-900 border-2 border-slate-200 rounded-lg placeholder-slate-400 focus:outline-none focus:bg-white focus:border-cyan-400 transition-colors"
     {...register('password_confirmation', {required: 'La confirmación de la contraseña es requerida', validate: value => value === password || 'Las contraseñas no coinciden'})}
   />
       {errors.password_confirmation && <ErrorMessage> {errors.password_confirmation.message}   </ErrorMessage>}
  </div>

  <input
    type="submit"
    className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:shadow-lg hover:shadow-cyan-400/30 p-3 text-lg text-white rounded-lg font-bold cursor-pointer transition-all active:scale-95"
    value="Crear Cuenta"
  />
</form>

      <nav>
        <Link
          className="text-center text-gray-400 text-lg block mt-5"
          to="/auth/login"
        >
          ¿Ya tienes cuenta? Inicia sesión
        </Link>
      </nav>
    </>
  );
}
