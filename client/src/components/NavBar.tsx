import { CodeXml } from "lucide-react"
import { NavLink, useNavigate } from "react-router-dom"

const NavBar = () => {
    const navigate = useNavigate()
    return (
        <div className="w-full h-16 fixed bg-black border-b-[1px] border-zinc-600 z-[99]">
            <div className="border-2 max-w-7xl h-full mx-auto border-white flex items-center justify-between">
                {/* Logo */}
                <div className="text-white flex items-center gap-2">
                    <div className="p-1.5 bg-[linear-gradient(-20deg,#b721ff_0%,#21d4fd_100%)] rounded-md"><CodeXml /></div>
                    <h1 className="text-2xl font-bold font-[Albert_Sans]">DevSphere</h1>
                </div>

                <div className="font-[Albert_Sans] text-white flex gap-8 ">
                    <NavLink
                        to="/home"
                        className={({ isActive }) =>
                            `tracking-tighter font-medium ${isActive ? "font-black border-b-2" : ""}`
                        }
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/projects"
                        className={({ isActive }) =>
                            `tracking-tighter font-medium ${isActive ? "font-bold" : ""}`
                        }
                    >
                        Projects
                    </NavLink>

                    <NavLink
                        to="/search"
                        className={({ isActive }) =>
                            `tracking-tighter font-medium ${isActive ? "font-bold" : ""}`
                        }
                    >
                        Search
                    </NavLink>

                    <NavLink
                        to="/code-review"
                        className={({ isActive }) =>
                            `tracking-tighter font-medium ${isActive ? "font-bold" : ""}`
                        }
                    >
                        Code Review
                    </NavLink>

                </div>

                <div className="text-white font-[Albert_Sans]">
                    <button onClick={() => navigate('/register')} className="bg-[linear-gradient(-20deg,#b721ff_0%,#21d4fd_100%)] p-2 px-4 font-medium tracking-tight rounded-md cursor-pointer hover:-translate-y-0.5 transition-all duration-300">Get Started</button>
                </div>
            </div>
        </div>
    )
}

export default NavBar