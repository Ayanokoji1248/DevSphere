import { TbWorld } from "react-icons/tb"

const Logo = () => {
    return (
        <div className="text-white flex items-center gap-2">
            <div className="p-1.5 bg-[linear-gradient(-20deg,#b721ff_0%,#21d4fd_100%)] rounded-md"><TbWorld size={30} strokeWidth={1} /></div>
            <h1 className="text-2xl font-bold font-[Albert_Sans]">DevSphere</h1>
        </div>
    )
}

export default Logo