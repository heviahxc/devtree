
import { Outlet } from "react-router-dom"
import {Toaster} from 'sonner'

export default function AuthLayout(){ 
    return(
        <>
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md px-4">
                
                <div className="bg-white rounded-2xl shadow-md p-8">
                    
                    <div className="flex justify-center mb-6">
                        <img src="/logo.svg" alt="logotipo" className="h-10" />
                    </div>

                    <div>
                        <Outlet />
                    </div>

                </div>

            </div>
        </div>

        <Toaster position="top-right" />
        </>
    )
}