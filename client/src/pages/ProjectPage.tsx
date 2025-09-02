import NavBar from "../components/NavBar"
import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft, PlusIcon } from "lucide-react"
import projectStore from "../store/projectStore"
import ProjectCard from "../components/ProjectCard"
import Button from "../components/Button"
import { useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../utils"
import { type ProjectProp } from "../utils/interfaces"


// useDebounce hook
const ProjectPage = () => {
    const navigate = useNavigate()
    const { projects } = projectStore();
    const [searchProject, setSearchProject] = useState("");

    const [projectFound, setProjectFound] = useState<ProjectProp[]>([]);

    const handleSearchProject = async (projectName: string) => {
        try {
            if (projectName.length === 0) {
                setProjectFound([]);
            }
            const res = await axios.get(`${BACKEND_URL}/project/?search=${projectName}`, { withCredentials: true })
            console.log(res.data.projects)
            setProjectFound(res.data.projects);

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="bg-black min-h-screen font-[Albert_Sans]">
            <NavBar />
            <div className="pt-24 max-w-7xl mx-auto text-white flex flex-col gap-6">
                <div className="flex items-center justify-between">

                    <Button
                        text="Back"
                        variant="black"
                        size="sm"
                        leftIcon={<ArrowLeft size={18} />}
                        onClick={() => navigate('/home')}
                    />

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

                <div className="">
                    <h1 className="text-4xl font-semibold">Discover Projects</h1>
                    <p>Explore amazing projects built by developers worldwide</p>
                </div>

                <div className="">
                    <div className="flex rounded-md overflow-auto border-[1px] border-zinc-600">
                        <input value={searchProject} onChange={(e) => {
                            setSearchProject(e.target.value)
                            handleSearchProject(e.target.value)
                        }
                        } type="text" className="w-full p-2 outline-none font-medium text-sm tracking-normal" placeholder="Search Project" />
                        <button onClick={() => handleSearchProject(searchProject)} className="bg-white text-black p-2  px-4 font-medium tracking-tight transition-all duration-300 cursor-pointer hover:bg-zinc-200">Search</button>
                    </div>
                </div>

                {projectFound.length > 0 ? (
                    <div>
                        <div>
                            <h1>Search Query: {searchProject.length === 0 ? "" : searchProject}</h1>

                        </div>

                        {projectFound.map((project) => (
                            <ProjectCard
                                key={project._id}
                                _id={project._id}
                                projectName={project.projectName}
                                projectImage={project.projectImage}
                                shortDesc={project.shortDesc}
                                tech={project.tech}
                                user={project.user}
                                isMyProject={false}
                            />
                        ))}
                    </div>
                ) : searchProject.length > 0 ? (
                    <h1>No Projects Found</h1>
                ) : null}

                <div className="">
                    <div>
                        <h1 className="text-3xl tracking-tight font-medium">All Projects</h1>
                    </div>

                    <div id="projects" className="mt-2 flex flex-wrap gap-10 justify-center p-5">

                        {/* <ProjectCard /> */}

                        {projects.map((project) => (
                            <Link to={`/project/${project._id}`}>
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
                            </Link>
                        ))}

                    </div>


                </div>

            </div>
        </div>
    )
}

export default ProjectPage