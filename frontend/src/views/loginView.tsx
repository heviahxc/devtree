import {Link} from "react-router-dom";

export default function LoginView(){
    return(
        <>
     <h1 className="text-4xl text-white font-bold">Iniciar Sesión</h1>
    <nav className="mt-10">
        <Link
        className="text-center text-gray-400 text-lg block mt-5"
        to="/auth/register">¿No tienes cuenta? Regístrate</Link>
    </nav>
        </>
    )
}   