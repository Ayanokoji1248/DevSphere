import { PlusCircle } from "lucide-react"
import { Outlet, useNavigate } from "react-router-dom"
import NavBar from "../components/NavBar"
import userStore from "../store/userStore"


const MainLayout = () => {
    const { user } = userStore();
    const navigate = useNavigate()

    return (
        <div className="bg-black">
            <NavBar />
            <div className="md:w-[90%] min-h-screen  mx-auto flex gap-5 relative pt-18">
                <div className="md:w-[25%] min-h-screen p-3 pt-8 px-4 hidden md:block">

                    <div className="sticky top-20 border-[1px] border-zinc-500  p-5 flex flex-col gap-4 rounded-xl text-white">
                        <h1 className="text-3xl font-medium">Quick Actions</h1>
                        <div className="flex flex-col gap-2">
                            <button className="p-2 text-lg font-medium font-[Albert_Sans] tracking-tighter bg-[#00FF9C] hover:bg-[#60f0bbea] transition-all duration-300 hover:-translate-y-0.5 text-white rounded-md cursor-pointer"> AI Code Review</button>
                            <button onClick={() => navigate('/create-post')} className="p-2 text-lg font-medium font-[Albert_Sans] tracking-tighter border-2 text-white rounded-md cursor-pointer flex justify-center items-center gap-3"><PlusCircle strokeWidth={2} /> New Post</button>
                            <button className="p-2 text-lg font-medium font-[Albert_Sans] tracking-tighter border-2 text-white rounded-md cursor-pointer">Showcase Project</button>
                        </div>
                    </div>
                </div>
                <div className="md:w-[45%] w-full pt-4">
                    <Outlet />
                </div>
                <div className="md:w-[30%] hidden md:block min-h-screen border-2 p-7">
                    {user &&
                        <div className="sticky top-20 border-[1px] border-zinc-500 p-5 flex flex-col gap-3 rounded-lg text-white">
                            <div className="flex gap-3 items-center">
                                <div className="w-10 h-10 bg-zinc-700 rounded-full flex shrink-0"></div>
                                <div className="font-[Albert_Sans] flex flex-col">
                                    <h1 className="font-bold text-lg tracking-tighter">{user.fullName}</h1>
                                    <p className="text-sm font-medium text-zinc-500">@{user.username}</p>
                                </div>
                            </div>
                            <div className="px-3 font-[Albert_Sans]">
                                <div className="flex justify-between">
                                    <h1>Following</h1>
                                    <p className="font-bold">{user.following.length}</p>
                                </div>
                                <div className="flex justify-between">
                                    <h1>Follower</h1>
                                    <p className="font-bold">{user.follower.length}</p>
                                </div>
                                <div className="flex justify-between">
                                    <h1>Post</h1>
                                    <p className="font-bold">{user.posts.length}</p>
                                </div>
                                <div className="flex justify-between">
                                    <h1>Project</h1>
                                    <p className="font-bold">{user.projects.length}</p>
                                </div>
                            </div>
                            <button onClick={() => navigate("/profile")} className="bg-[#0D92F4] hover:bg-blue-500 transition-all duration-300 hover:-translate-y-0.5 text-white p-3 py-2 rounded-md font-medium cursor-pointer font-[Albert_Sans]">View Profile</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default MainLayout