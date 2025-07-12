import { CodeXml, Link, Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { TbLocation } from "react-icons/tb"
import userStore from "../store/userStore"
import ProjectCard from "../components/ProjectCard"
import { type ProjectProp } from "../utils/interfaces"
import axios from "axios"
import { BACKEND_URL } from "../utils"

const UserProfilePage = () => {
    const tabs = ["Projects", "Posts", "Skills"]
    const [activeTab, setActiveTab] = useState("Projects");

    const { user, loading } = userStore();


    const [projects, setProjects] = useState<ProjectProp[]>([])

    const getAllUserProject = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/project/user-project`, {
                withCredentials: true
            });
            console.log(response.data.projects);
            setProjects(response.data.projects)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllUserProject()
    }, [])

    if (loading) {
        return <div className="text-white">loading...</div>
    }

    return (
        <div className="min-h-screen text-white rounded-md border-zinc-600 relative font-[Albert_Sans] flex flex-col gap-2 pb-5 px-3">
            {/* Cover image */}
            <div className="h-48 md:h-64 w-full rounded-xl overflow-hidden relative">
                <img
                    className="w-full h-full object-cover object-center"
                    src="https://i.pinimg.com/736x/7a/e3/c7/7ae3c7ad104a968dc735871c0bf17608.jpg"
                    alt=""
                />
            </div>

            {/* Profile avatar */}
            <div className="absolute top-36 md:top-44 left-5 w-24 h-24 md:w-32 md:h-32 bg-white rounded-full overflow-hidden border-4 border-zinc-800">
                <img
                    src="https://i.pinimg.com/736x/94/ea/93/94ea9375223db8cb6ed76c7ba6c7245b.jpg"
                    alt=""
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Name and edit button */}
            <div className="pt-10 md:pt-12 flex flex-col md:flex-row md:items-center items-start gap-3">
                <h1 className="text-4xl font-bold tracking-tight">{user?.fullName}</h1>
                <p className="p-1 px-2 text-xs md:text-sm font-semibold tracking-tight bg-amber-600 rounded-full">Mid-level Developer</p>
            </div>

            {/* Username */}
            <p className="tracking-tight font-medium text-zinc-400">@{user?.username}</p>

            {/* Bio */}
            <p className="text-sm tracking-tight font-medium">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, quaerat ipsum perspiciatis dolor suscipit, a obcaecati molestiae voluptatum, modi neque alias maiores asperiores? Laudantium error aut magni ipsum delectus porro recusandae ad vitae fuga. Accusantium, tenetur provident! Labore, nihil odit aut, atque adipisci veniam ratione soluta placeat eos, fugit vel!
            </p>

            {/* Location and link */}
            <div className="mt-2 flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                    <TbLocation size={18} className="text-blue-500" />
                    <p className="text-zinc-500 font-medium tracking-tight text-sm">NY, New York</p>
                </div>
                <div className="flex items-center gap-2">
                    <Link size={18} className="text-emerald-500" />
                    <p className="tracking-tight text-sm font-medium text-blue-500 break-all">portifolio.com</p>
                </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-4 mt-3">
                <div className="flex flex-col justify-center items-center p-3 bg-[#0D1422] text-blue-500 border-2 border-blue-900 rounded-md flex-1 min-w-[100px]">
                    <h1 className="font-bold text-2xl">{user?.following.length}</h1>
                    <p className="font-medium tracking-tight text-sm">Following</p>
                </div>
                <div className="flex flex-col justify-center items-center p-3 bg-[#181023] text-violet-500 border-2 border-violet-900 rounded-md flex-1 min-w-[100px]">
                    <h1 className="font-bold text-2xl">{user?.follower.length}</h1>
                    <p className="font-medium tracking-tight text-sm">Followers</p>
                </div>
                <div className="flex flex-col justify-center items-center p-3 bg-[#0B1B13] text-emerald-500 border-2 border-emerald-900 rounded-md flex-1 min-w-[100px]">
                    <h1 className="font-bold text-2xl">{user?.projects.length}</h1>
                    <p className="font-medium tracking-tight text-sm">Projects</p>
                </div>
                <div className="flex flex-col justify-center items-center p-3 bg-[#21130C] text-orange-500 border-2 border-orange-900 rounded-md flex-1 min-w-[100px]">
                    <h1 className="font-bold text-2xl">{user?.posts.length}</h1>
                    <p className="font-medium tracking-tight text-sm">Posts</p>
                </div>
            </div>

            {/* Skills & technologies */}
            <div className="mt-2 flex flex-col gap-2">
                <div className="flex justify-between items-center flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                        <CodeXml className="text-blue-500" size={22} />
                        <h1 className="text-lg font-bold tracking-tighter">Skills & Technologies</h1>
                    </div>
                    <button className="font-medium border-2 py-1 px-2 rounded-md flex items-center gap-2 text-sm tracking-tight cursor-pointer">
                        <Plus size={20} /> Add Skills
                    </button>
                </div>
                <div className="flex flex-wrap gap-2">
                    <p className="bg-blue-900/60 w-fit p-1 text-sm font-medium rounded-full px-2 text-blue-500">Express</p>
                    <p className="bg-emerald-900/60 w-fit p-1 text-sm font-medium rounded-full px-2 text-emerald-500">React</p>
                    <p className="bg-orange-900/60 w-fit p-1 text-sm font-medium rounded-full px-2 text-orange-500">Node JS</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex justify-evenly mt-4 rounded-md overflow-x-auto no-scrollbar">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`${activeTab === tab ? "border-b-2 border-purple-500" : ""}
                            flex-1 p-2 font-medium tracking-tighter hover:bg-slate-800 bg-slate-900 cursor-pointer transition-all duration-300 whitespace-nowrap`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Tab content */}
            <div className="w-full">
                {activeTab === "Projects" &&
                    <div className="w-full h-full flex flex-col gap-5 mt-2">
                        {projects.map((project) => (
                            <ProjectCard
                            _id={project._id}
                                projectName={project.projectName}
                                shortDesc={project.shortDesc}
                                tech={project.tech}
                                projectImage={project.projectImage}

                            />
                        ))}


                    </div>}
                {activeTab === "Posts" && <div>Posts cards</div>}
                {activeTab === "Skills" && <div>Skills</div>}
            </div>
        </div>
    )
}

export default UserProfilePage
