import { NavLink, useNavigate } from "react-router-dom"
import userStore from "../store/userStore"
import { TbWorld } from "react-icons/tb"
import { useEffect, useRef, useState } from "react";

const NavBar = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const divRef = useRef<HTMLDivElement>(null);

    const navigate = useNavigate()
    const { user } = userStore();

    useEffect(() => {

        const handleClickOutside = (event: MouseEvent) => {
            if (divRef.current && !divRef.current.contains(event.target as Node)) {
                setModalOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);


        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, [])

    return (
        <div className="w-full h-16 fixed bg-black border-b-[1px] border-zinc-600 z-[99] px-5 md:px-0">
            <div className="max-w-7xl h-full mx-auto border-white flex items-center justify-between">
                {/* Logo */}
                <div className="text-white flex items-center gap-2">
                    <div className="p-1.5 bg-[linear-gradient(-20deg,#b721ff_0%,#21d4fd_100%)] rounded-md"><TbWorld size={30} strokeWidth={1} /></div>
                    <h1 className="text-2xl font-bold font-[Albert_Sans]">DevSphere</h1>
                </div>

                <div className="font-[Albert_Sans] text-white gap-8 hidden md:flex">
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
                    {user ?
                        <div ref={divRef} onClick={() => setModalOpen(!modalOpen)}>

                            <div className="bg-white w-10 h-10 rounded-full overflow-auto">
                                <img src={user.profilePic} className="w-full h-full" alt="profile pic" />
                            </div>

                            {modalOpen &&
                                <div className={`absolute top-16 border-[2px] border-zinc-500 right-1 xl:right-18 bg-black rounded-md shadow-xs shadow-white px-3 py-2 flex flex-col items-center gap-2 z-50`}>
                                    <button onClick={() => {
                                        navigate('/profile')
                                        setModalOpen(false);
                                    }} className="p-2 hover:bg-zinc-800 transition-all duration-300 cursor-pointer w-full rounded-md text-sm font-medium">My Profile</button>
                                    <button onClick={() => {
                                        navigate('/edit-profile')
                                        setModalOpen(false);
                                    }} className="p-2 hover:bg-zinc-800 transition-all duration-300 cursor-pointer w-full rounded-md text-sm font-medium">Edit Profile</button>
                                    <button onClick={() => {
                                        navigate('/edit-profile')
                                        setModalOpen(false);
                                    }} className="p-2 hover:bg-red-800/30 text-red-500 transition-all duration-300 cursor-pointer w-full rounded-md text-sm font-medium">Logout</button>
                                </div>
                            }
                        </div>
                        :
                        <button onClick={() => navigate('/register')} className="bg-[linear-gradient(-20deg,#b721ff_0%,#21d4fd_100%)] p-2 px-4 font-medium tracking-tight rounded-md cursor-pointer hover:-translate-y-0.5 transition-all duration-300">Get Started</button>
                    }

                </div>
            </div>
        </div>
    )
}

export default NavBar