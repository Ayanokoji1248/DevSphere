import { Outlet } from "react-router-dom"
import { TbWorld } from "react-icons/tb";
import { CodeXml, Users, Star, Zap } from "lucide-react"


const AuthLayout = () => {
    return (
        <div className="w-ful flex">
            <div className="bg-[linear-gradient(-20deg,#b721ff_0%,#21d4fd_100%)] w-[50%] h-screen p-12 px-24 flex flex-col gap-5">

                <div className="flex items-center">
                    <TbWorld size={65} className="text-white" />
                    <div>
                        <h1 className="text-white font-bold font-[Albert_Sans] text-3xl">DevSphere</h1>
                        <p className="text-sm text-zinc-100 font-medium">Connect • Code • Create</p>
                    </div>
                </div>

                <div className="w-108 flex flex-col gap-3 mt-8">
                    <h1 className="text-6xl font-bold tracking-tighter font-[Albert_Sans] text-white ">Join the future of <span className="text-yellow-400">developer collaboration</span></h1>
                    <p className="text-white font-medium font-[Albert_Sans] text-xl tracking-tighter leading-tight">Share your projects, learn from others, and build amazing things together. Join thousands of passionate developers already making connections.</p>
                </div>

                <div className="flex flex-col gap-5 mt-3">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-zinc-100/30 shadow w-fit rounded-md">
                            <CodeXml size={22} className="text-white" />
                        </div>
                        <p className="text-white font-[Albert_Sans] font-medium">
                            Share your coding journey
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-zinc-100/30 shadow w-fit rounded-md">
                            <Users size={22} className="text-white" />
                        </div>
                        <p className="text-white font-[Albert_Sans] font-medium">
                            Connect with like-minded developers
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-zinc-100/30 shadow w-fit rounded-md">
                            <Star size={22} className="text-white" />
                        </div>
                        <p className="text-white font-[Albert_Sans] font-medium">
                            Showcase your best projects
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-zinc-100/30 shadow w-fit rounded-md">
                            <Zap size={22} className="text-white" />
                        </div>
                        <p className="text-white font-[Albert_Sans] font-medium">
                            Learn from experienced developers
                        </p>
                    </div>
                </div>

            </div>
            <div className="h-screen w-[50%] flex justify-center items-center bg-black">
                <Outlet />
            </div>
        </div>
    )
}

export default AuthLayout