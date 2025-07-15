import userStore from "../store/userStore"
import type { ProjectProp } from "../utils/interfaces"

const ProjectCard = ({ _id, projectName, projectImage, shortDesc, tech, isMyProject, user
}: ProjectProp) => {
    const { user: currentUser } = userStore()
    return (

        <div className="max-w-sm h-108 font-[Albert_Sans] flex flex-col gap-2 rounded-xl overflow-auto border-2 border-zinc-700">
            <img className="w-full h-58 object-center object-cover" src={projectImage} alt={projectImage} />
            <div className="flex flex-col gap-3 p-4">
                <div className="flex flex-col gap-2">
                    <h1 className="text-xl tracking-tight font-bold">{projectName}</h1>
                    <p className="text-sm">{shortDesc}</p>
                </div>
                <div className="flex gap-2 flex-wrap">
                    {tech.map((t) => (
                        <p className="w-fit bg-zinc-800 px-2 rounded-full text-sm py-1 font-medium">{t}</p>
                    ))}
                </div>

                {isMyProject && user?._id === currentUser?._id &&
                    <div className="mt-3">
                        <button onClick={() => confirm(`You sure you want to delete this project ${_id}`)} className="p-2 bg-red-500 font-bold rounded-md text-sm">Delete Project</button>
                    </div>
                }
            </div>
        </div>

    )
}

export default ProjectCard