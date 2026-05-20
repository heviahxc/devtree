import { Link, Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import NavigationTabs from '../components/NavigationsTab';
import type { User } from "../types";
import { ExternalLink } from 'lucide-react'
type DevTreeProps = {
    data:  User
}

const DevTree = ({data}: DevTreeProps) => {
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
                to=""
                target="_blank"
                rel="noreferrer noopener"
                className="
                    group
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-cyan-500/20
                    bg-zinc-900/60
                    px-4
                    py-2
                    font-medium
                    tracking-wide
                    text-zinc-300
                    backdrop-blur
                    transition-all
                    duration-300
                    hover:border-cyan-400/60
                    hover:bg-zinc-800
                    hover:text-cyan-300
                    hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]
                "
            >
                <span className="font-['Space_Grotesk']">
                    Visitar mi perfil
                </span>

                <span className="text-cyan-400">
                    /{data.handle}
                </span>

                <ExternalLink
                    size={16}
                    className="
                        transition-transform
                        duration-300
                        group-hover:translate-x-1
                        group-hover:-translate-y-1
                    "
                />
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

export default DevTree