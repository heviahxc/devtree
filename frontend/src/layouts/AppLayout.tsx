import { Link, Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { useQuery } from '@tanstack/react-query'
import NavigationTabs from '../components/NavigationsTab';
import { getUser } from "../api/DevTreeApi";

export default function AppLayout() {

    const {data, isLoading, error,isError} = useQuery({
        queryFn: getUser,
        queryKey: ['user'],
        retry: 1,
        refetchOnWindowFocus: false,
    })
    console.log(data);
    console.log(isLoading);
      console.log(error);
    console.log(isError);
  

    return (
        <>
            <header className="bg-white border-b border-gray-200 py-4">
                <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center md:justify-between px-4">
                    
                    <div className="w-full md:w-1/3 flex justify-center md:justify-start">
                        <img src="/logo.svg" className="h-8" />
                    </div>

                    <div className="md:w-1/3 flex justify-center md:justify-end mt-4 md:mt-0">
                        <button
                            className="px-4 py-1.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 transition cursor-pointer"
                            onClick={() => {}}
                        >
                            Cerrar sesión
                        </button>
                    </div>

                </div>
            </header>

            <div className="bg-gray-100 min-h-screen py-8">
                <main className="mx-auto max-w-5xl px-4">

                    <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
                        <NavigationTabs />
                    </div>

                    <div className="flex justify-end mb-4">
                        <Link 
                            className="text-sm font-medium text-blue-600 hover:underline"
                            to={''}
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            Visitar mi perfil
                        </Link>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6">
                        
                        <div className="flex-1 bg-white border border-gray-200 rounded-xl p-6">
                            <Outlet />
                        </div>

                        <div className="w-full md:w-80 bg-white border border-gray-200 rounded-xl p-5 space-y-4">
                        </div>

                    </div>

                </main>
            </div>

            <Toaster position="top-right" />
        </>
    )
}