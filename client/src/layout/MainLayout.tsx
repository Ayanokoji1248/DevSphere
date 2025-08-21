import { PlusCircle } from "lucide-react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import NavBar from "../components/NavBar"
import userStore from "../store/userStore"
import Button from "../components/Button"
import { useState } from "react"

const MainLayout = () => {
    const { user, userFollowing } = userStore();
    const navigate = useNavigate();

    const location = useLocation()

    const [activeTab, setActiveTab] = useState("");

    return (
        <div className="bg-black relative">
            <NavBar />
            <div className="md:w-[90%] h-fit border-white mx-auto flex gap-5 relative">
                <div className="md:w-[25%] min-h-screen p-3 pt-8 px-4 hidden md:block">

                    <div className="sticky top-20 border-[1px] border-zinc-500  p-5 flex flex-col gap-4 rounded-xl text-white">
                        <h1 className="text-3xl font-medium">Quick Actions</h1>
                        <div className="flex flex-col gap-2">
                            {/* <button className="p-2 text-lg font-medium font-[Albert_Sans] tracking-tighter bg-[#00FF9C] hover:bg-[#60f0bbea] transition-all duration-300 hover:-translate-y-0.5 text-white rounded-md cursor-pointer"> AI Code Review</button> */}
                            <Button variant="green" text="AI Code Review" widthFull={true} size="md" className="text-lg font-medium" onClick={() => navigate('/code-review')} />
                            {/* <button onClick={() => navigate('/create-post')} className="p-2 text-lg font-medium font-[Albert_Sans] tracking-tighter border-2 text-white rounded-md cursor-pointer flex justify-center items-center gap-3"><PlusCircle strokeWidth={2} /> New Post</button> */}
                            <Button
                                text="New Post"
                                size="md"
                                variant="outline"
                                className="text-lg font-medium flex items-center justify-center gap-3 hover:bg-zinc-900" widthFull={true}
                                leftIcon={<PlusCircle strokeWidth={2} />}
                                onClick={() => navigate('/create-post')} />
                            {/* <button className="p-2 text-lg font-medium font-[Albert_Sans] tracking-tighter border-2 text-white rounded-md cursor-pointer">Showcase Project</button> */}
                            <Button
                                size="md"
                                text="Showcase Project"
                                variant="outline"
                                widthFull={true}
                                className="text-lg font-medium hover:bg-zinc-900"
                            />
                            {/* <button className="p-2 text-lg font-medium font-[Albert_Sans] tracking-tighter border-2 text-white rounded-md cursor-pointer">Message</button> */}
                            <Button variant="outline" size="md" widthFull={true} text="Message" className="font-medium text-lg hover:bg-zinc-900" onClick={() => navigate('/message')} />
                        </div>
                    </div>
                </div>
                <div className="md:w-[45%] w-full pt-20 relative">
                    <Outlet />
                </div>
                <div className="md:w-[30%] hidden md:block min-h-screen border-2 p-7">
                    {location.pathname.startsWith("/message") ?
                        <div className="sticky top-20 border-[1px] border-zinc-500 p-5 flex flex-col gap-3 rounded-lg text-white">
                            <div>
                                <h1 className="text-2xl font-semibold">Following List</h1>
                            </div>

                            <div className="mt-2 flex flex-col gap-3">
                                {userFollowing.length > 0 && userFollowing.map((follow) =>
                                    <button
                                        onClick={() => {
                                            setActiveTab(follow._id)
                                            navigate(`/message/${follow._id}`)
                                        }}
                                        className={`w-full flex items-center gap-5 hover:bg-neutral-900 transition-all duration-300 cursor-pointer p-2 px-3.5 rounded-md ${activeTab === follow._id ? "bg-neutral-900" : "bg-[#030303] border-[1px] border-zinc-700 shadow-[1px_1px_5px_0px] shadow-zinc-700"} `}>
                                        <div className="w-12 h-12 bg-white rounded-full overflow-auto">
                                            <img src={follow.profilePic} alt="" />
                                        </div>
                                        <div className="flex flex-col gap-1 items-start">
                                            <h1 className="text-lg font-medium tracking-tight text-gray-200 leading-none">{follow.fullName}</h1>
                                            <p className="text-sm leading-none text-zinc-400 italic">{follow.username}</p>
                                        </div>
                                    </button>
                                )}

                            </div>
                        </div>
                        :
                        <div className="sticky top-20 border-[1px] border-zinc-500 p-5 flex flex-col gap-3 rounded-lg text-white">
                            <div className="flex gap-3 items-center">
                                <div className="w-10 h-10 bg-zinc-700 rounded-full flex shrink-0">
                                    <img src={user?.profilePic} alt="profile pic" className="w-full h-full object-cover rounded-full" />
                                </div>
                                <div className="font-[Albert_Sans] flex flex-col">
                                    <h1 className="font-bold text-lg tracking-tighter">{user?.fullName}</h1>
                                    <p className="text-sm font-medium text-zinc-500">@{user?.username}</p>
                                </div>
                            </div>
                            <div className="px-3 font-[Albert_Sans]">
                                <div className="flex justify-between">
                                    <h1>Following</h1>
                                    <p className="font-bold">{user?.followingCount}</p>
                                </div>
                                <div className="flex justify-between">
                                    <h1>Follower</h1>
                                    <p className="font-bold">{user?.followerCount}</p>
                                </div>
                                <div className="flex justify-between">
                                    <h1>Post</h1>
                                    <p className="font-bold">{user?.posts.length}</p>
                                </div>
                                <div className="flex justify-between">
                                    <h1>Project</h1>
                                    <p className="font-bold">{user?.projects.length}</p>
                                </div>
                            </div>

                            <Button text="View Profile" variant="info" size="md" widthFull={true} className="rounded-md font-medium" onClick={() => navigate('/profile')} />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default MainLayout