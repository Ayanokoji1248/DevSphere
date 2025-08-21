import { useNavigate, useParams } from "react-router-dom"
import NavBar from "../components/NavBar";
import Button from "../components/Button";
import { ArrowLeft, GithubIcon } from "lucide-react";
import Badge from "../components/Badge";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../utils";
import type { ProjectProp } from "../utils/interfaces";
import { useLoadingStore } from "../store/loadingStore";
import Loader from "../components/Loader";

const ParticularProjectPage = () => {
    const navigate = useNavigate()
    const { id } = useParams();

    const [project, setProject] = useState<ProjectProp>();
    const { loading, setLoading } = useLoadingStore();

    const getProject = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${BACKEND_URL}/project/${id}`, {
                withCredentials: true
            })
            setProject(res.data.project)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getProject()
    }, [])

    return (
        <div className="w-full min-h-screen bg-black font-[Albert_Sans]">
            <NavBar />
            <div className="max-w-7xl mx-auto pt-22 text-white">
                <div>
                    <Button text="Back" variant="black" size="sm" leftIcon={<ArrowLeft size={18} />} onClick={() => navigate('/projects')} />
                </div>

                {loading &&
                    <div className="w-full  flex justify-center items-center ">
                        <Loader />
                    </div>
                }

                <div className="mt-8 flex flex-col pb-5 relative sm:flex-row">
                    <div className="px-5 sm:px-8 py-10 bg-zinc-900 rounded-tl-2xl rounded-bl-2xl w-full sm:w-[50%] h-fit flex flex-col justify-start gap-6 sm:sticky top-15">
                        <div className="flex flex-col gap-3">
                            <h1 className="text-4xl font-medium font-[Albert_Sans] tracking-tight">{project?.projectName}</h1>
                            <p className="tracking-tight max-w-lg text-zinc-300">{project?.longDesc}</p>
                        </div>
                        <div className="flex gap-3 items-center">
                            <h1 className="font-bold tracking-tight">Teach Used:</h1>
                            <div className="flex flex-wrap items-start justify-start gap-2">
                                {project?.tech.map((tech, idx) => (
                                    <Badge key={idx} text={tech} />
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row  gap-6">

                            <div>
                                <h1 className="text-md tracking-tight font-bold">Category : <span className="font-medium">{project?.category}</span></h1>
                            </div>
                            <div>
                                <h1 className="text-md tracking-tight font-bold">Status : <span className="font-medium">{project?.status}</span></h1>
                            </div>
                        </div>

                        <div className="flex gap-5">
                            {project?.projectLink &&
                                <Button text="Live Project" variant="outline" size="sm" className="px-3 font-semibold hover:bg-[#0D1422] hover:text-blue-500" />
                            }
                            {project?.githubLink &&
                                <Button text="Github" variant="outline" size="sm" className="px-3 font-semibold hover:bg-[#0B1B13] hover:border-green-700 hover:text-green-500 flex items-center gap-2" leftIcon={<GithubIcon size={18} />} />
                            }
                        </div>
                        <div>
                            <div className="mt-2 flex items-center gap-3">
                                <div className="w-12 h-12 bg-white rounded-full overflow-auto">
                                    <img src={project?.user?.profilePic} alt="" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h1 className="text-xl font-medium tracking-tight leading-none">{project?.user?.fullName}</h1>
                                    <p className="text-zinc-500 font-medium tracking-tight leading-none">@{project?.user?.username}</p>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className="w-full sm:w-[50%]">
                        <img src={project?.projectImage} alt="Project Image" />
                    </div>

                </div>

            </div>
        </div>
    )
}

export default ParticularProjectPage