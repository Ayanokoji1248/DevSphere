import { useParams } from "react-router-dom"
import NavBar from "../components/NavBar";

const ParticularProjectPage = () => {
    const { id } = useParams();

    return (
        <div className="w-full min-h-screen bg-black font-[Albert_Sans]">
            <NavBar />
            <div className="max-w-7xl mx-auto pt-22 text-white">{id}</div>
        </div>
    )
}

export default ParticularProjectPage