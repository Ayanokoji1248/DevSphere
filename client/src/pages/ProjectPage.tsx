import { IoIosArrowBack } from "react-icons/io"
import NavBar from "../components/NavBar"
import { useNavigate } from "react-router-dom"
import { PlusIcon } from "lucide-react"
import projectStore from "../store/projectStore"
import ProjectCard from "../components/ProjectCard"
import Button from "../components/Button"



const ProjectPage = () => {
    const navigate = useNavigate()
    const { projects } = projectStore();
    return (
        <div className="bg-black min-h-screen font-[Albert_Sans]">
            <NavBar />
            <div className="pt-24 max-w-7xl mx-auto text-white">
                <div className="flex items-center justify-between">

                    <button onClick={() => navigate('/home')} className="w-fit p-2 border-[1px] border-zinc-600 rounded-md bg-black hover:bg-zinc-800 transition-all duration-300 cursor-pointer hover:-translate-y-0.5">
                        <IoIosArrowBack size={22} />
                    </button>

                    {/* <button onClick={() => navigate('/create-project')} className="p-2 flex gap-2 bg-white text-black font-medium tracking-tight rounded-md transition-all duration-300 hover:bg-zinc-200 cursor-pointer hover:-translate-y-0.5">
                        <PlusIcon className="text-black" /> Create new Project
                    </button> */}

                    <Button
                        size="md"
                        variant="secondary"
                        text="Create new project"
                        className="rounded-md font-medium flex items-center gap-2"
                        leftIcon={<PlusIcon size={22} />}
                        onClick={() => navigate('/create-project')}
                    />

                </div>


                <div className="mt-10">
                    <div className="flex rounded-md overflow-auto border-[1px] border-zinc-600">
                        <input type="text" className="w-full p-2 outline-none font-medium text-sm tracking-normal" placeholder="Search Project" />
                        <button className="bg-white text-black p-2  px-4 font-medium tracking-tight transition-all duration-300 cursor-pointer hover:bg-zinc-200">Search</button>
                    </div>
                </div>

                <div className="mt-6">
                    <div>
                        <h1 className="text-4xl tracking-tight font-bold">All Projects</h1>
                    </div>

                    <div id="projects" className="mt-2 flex flex-wrap gap-10 justify-center p-5">

                        {/* <ProjectCard /> */}

                        {projects.map((project) => (
                            <ProjectCard
                                _id={project._id}
                                projectName={project.projectName}
                                shortDesc={project.shortDesc}
                                longDesc={project.longDesc}
                                tech={project.tech}
                                projectImage={project.projectImage}
                                user={project.user}
                                isMyProject={false}
                            />
                        ))}

                    </div>


                </div>

            </div>
        </div>
    )
}

export default ProjectPage