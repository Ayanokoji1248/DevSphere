import userStore from "../store/userStore"
import type { ProjectProp } from "../utils/interfaces"
import Button from "./Button"

const ProjectCard = ({ projectName, projectImage, shortDesc, tech, isMyProject, user, deleteProject
}: ProjectProp) => {
    const { user: currentUser } = userStore()
    return (

        <div className="max-w-sm min-h-108 font-[Albert_Sans] flex flex-col gap-2 rounded-xl overflow-auto border-2 border-zinc-700">
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
                        {/* <button onClick={(e) => {
                            e.stopPropagation()
                            if (deleteProject) deleteProject()
                        }} className="p-2 bg-red-500 font-bold rounded-md text-sm">Delete Project</button> */}
                        <Button
                            variant="danger"
                            size="sm"
                            text="Delete Project"
                            className="rounded-md font-medium text-sm"
                            onClick={(e) => {
                                e.stopPropagation()
                                if (deleteProject) deleteProject()
                            }}
                        />

                    </div>
                }
            </div>
        </div>

    )
}

export default ProjectCard