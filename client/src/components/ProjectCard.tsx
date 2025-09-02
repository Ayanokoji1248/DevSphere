import { useNavigate } from "react-router-dom"
import userStore from "../store/userStore"
import type { ProjectProp } from "../utils/interfaces"
import Badge from "./Badge"
import Button from "./Button"

const ProjectCard = ({ projectName, projectImage, shortDesc, tech, isMyProject, user, widthFull, deleteProject
}: ProjectProp) => {
    const { user: currentUser } = userStore()
    const navigate = useNavigate()
    return (

        <div className={`${widthFull && "w-full"} sm:w-md min-h-108 font-[Albert_Sans] flex flex-col gap-2 rounded-xl overflow-auto border-2 border-zinc-700`}>
            <img className="w-full h-58 object-center object-cover" src={projectImage} alt={projectImage} />
            <div className="flex flex-col gap-3 p-4 pt-2">
                <div className="flex flex-col gap-2">
                    <h1 className="text-xl tracking-tight font-bold">{projectName}</h1>
                    <p className="text-sm">{shortDesc}</p>
                </div>
                <div className="flex gap-2 mt-2 flex-wrap">
                    {tech.map((t) => (
                        <Badge text={t} />
                        // <p className="w-fit bg-zinc-800 px-2 rounded-full text-sm py-1 font-medium">{t}</p>
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

                {isMyProject &&
                    <div className="mt-5 flex items-center gap-3">
                        <div onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/user/${user?._id}`)
                        }} className="w-10 h-10 bg-white rounded-full overflow-hidden cursor-pointer">
                            <img src={user?.profilePic} alt="" />
                        </div>
                        <div onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/user/${user?._id}`)
                        }} className="flex flex-col gap-1 cursor-pointer">
                            <h1 className="leading-none font-semibold">{user?.fullName}</h1>
                            <h2 className="leading-none text-sm text-gray-500 font-medium ">@{user?.username}</h2>
                        </div>
                    </div>}
            </div>
        </div>

    )
}

export default ProjectCard