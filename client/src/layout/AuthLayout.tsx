import { Outlet } from "react-router-dom"
import { TbWorld } from "react-icons/tb";
import { CodeXml, Users, Star, Zap } from "lucide-react";
import type { ReactNode } from "react";

const AuthLayout = () => {
    return (
        <div className="w-full min-h-screen flex flex-col sm:flex-row ">
            {/* Left Section with Gradient & Floating Circles */}
            <div className="relative bg-[linear-gradient(-20deg,#b721ff_0%,#21d4fd_100%)] sm:w-[50%] min-h-full p-12 px-5 sm:px-24 flex flex-col gap-5 overflow-hidden">

                {/* Floating Circles Background */}
                <ul className="absolute inset-0 overflow-hidden z-0">
                    <li className="absolute list-none bg-white/20 bottom-[-150px] animate-float left-[25%] w-[80px] h-[80px]" style={{ animationDelay: "0s" }}></li>
                    <li className="absolute list-none bg-white/20 bottom-[-150px] animate-float left-[10%] w-[20px] h-[20px]" style={{ animationDelay: "2s", animationDuration: "12s" }}></li>
                    <li className="absolute list-none bg-white/20 bottom-[-150px] animate-float left-[70%] w-[20px] h-[20px]" style={{ animationDelay: "4s" }}></li>
                    <li className="absolute list-none bg-white/20 bottom-[-150px] animate-float left-[40%] w-[60px] h-[60px]" style={{ animationDelay: "0s", animationDuration: "18s" }}></li>
                    <li className="absolute list-none bg-white/20 bottom-[-150px] animate-float left-[65%] w-[20px] h-[20px]" style={{ animationDelay: "0s" }}></li>
                    <li className="absolute list-none bg-white/20 bottom-[-150px] animate-float left-[75%] w-[110px] h-[110px]" style={{ animationDelay: "3s" }}></li>
                    <li className="absolute list-none bg-white/20 bottom-[-150px] animate-float left-[35%] w-[150px] h-[150px]" style={{ animationDelay: "7s" }}></li>
                    <li className="absolute list-none bg-white/20 bottom-[-150px] animate-float left-[50%] w-[25px] h-[25px]" style={{ animationDelay: "15s", animationDuration: "45s" }}></li>
                    <li className="absolute list-none bg-white/20 bottom-[-150px] animate-float left-[20%] w-[15px] h-[15px]" style={{ animationDelay: "2s", animationDuration: "35s" }}></li>
                    <li className="absolute list-none bg-white/20 bottom-[-150px] animate-float left-[85%] w-[150px] h-[150px]" style={{ animationDelay: "0s", animationDuration: "11s" }}></li>
                </ul>

                {/* Content Above Circles */}
                <div className="relative z-10">
                    <div className="flex items-center">
                        <TbWorld size={65} className="text-white" />
                        <div>
                            <h1 className="text-white font-bold font-[Albert_Sans] text-3xl">DevSphere</h1>
                            <p className="text-sm text-zinc-100 font-medium">Connect • Code • Create</p>
                        </div>
                    </div>

                    <div className="sm:w-108 flex flex-col sm:gap-6 gap-5 mt-8">
                        <h1 className="sm:text-6xl text-5xl font-bold tracking-tighter font-[Albert_Sans] text-white">
                            Join the future of <span className="text-yellow-400">developer collaboration</span>
                        </h1>
                        <p className="text-white font-medium font-[Albert_Sans] text-xl tracking-tighter leading-tight">
                            Share your projects, learn from others, and build amazing things together. Join thousands of passionate developers already making connections.
                        </p>
                    </div>

                    <div className="flex flex-col gap-5 sm:mt-10 mt-6">
                        <Feature icon={<CodeXml size={22} />} text="Share your coding journey" />
                        <Feature icon={<Users size={22} />} text="Connect with like-minded developers" />
                        <Feature icon={<Star size={22} />} text="Showcase your best projects" />
                        <Feature icon={<Zap size={22} />} text="Learn from experienced developers" />
                    </div>
                </div>
            </div>

            {/* Right Section */}
            <div className="min-h-full w-full sm:w-[50%] flex justify-center items-center bg-black">
                <Outlet />
            </div>
        </div>
    );
};

const Feature = ({ icon, text }: { icon: ReactNode, text: string }) => (
    <div className="flex items-center gap-2">
        <div className="p-1.5 bg-zinc-100/30 shadow w-fit rounded-md text-white">
            {icon}
        </div>
        <p className="text-white font-[Albert_Sans] font-medium">{text}</p>
    </div>
);

export default AuthLayout;
