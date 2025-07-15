import { CodeXml, Link, Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { TbLocation } from "react-icons/tb"
import userStore from "../store/userStore"
import ProjectCard from "../components/ProjectCard"
import { type PostProp, type ProjectProp } from "../utils/interfaces"
import axios from "axios"
import { BACKEND_URL } from "../utils"
import PostCard from "../components/PostCard"
import { useNavigate } from "react-router-dom"
import postStore from "../store/postStore"

const UserProfilePage = () => {
    const navigate = useNavigate();

    const tabs = ["Projects", "Posts"]
    const [activeTab, setActiveTab] = useState("Projects");

    const { user, loading, setUser } = userStore();
    const { removePost } = postStore()

    const [userPosts, setUserPosts] = useState<PostProp[]>([]);
    const [projects, setProjects] = useState<ProjectProp[]>([])

    const { updatePostLikeCount } = postStore();

    const getAllUserProject = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/project/user-project`, {
                withCredentials: true
            });
            // console.log(response.data.projects);
            setProjects(response.data.projects)
        } catch (error) {
            console.log(error)
        }
    }

    const getAllUserPosts = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/post/user-posts`, {
                withCredentials: true
            });
            // console.log(response.data.posts);
            setUserPosts(response.data.posts.reverse())
        } catch (error) {
            console.log(error)
        }
    }

    const deletePost = async (id: string) => {

        try {
            const response = await axios.delete(`${BACKEND_URL}/post/${id}`, {
                withCredentials: true
            })
            console.log(response.data)
            removePost(id)
            setUserPosts((prev) => prev.filter((post => post._id !== id)))
            setUser(response.data.updatedUser);

        } catch (error) {
            console.log(error)
        }
    }

    const likePost = async (id: string) => {
        try {
            const response = await axios.post(`${BACKEND_URL}/post/like-unlike/${id}`, {}, {
                withCredentials: true
            })
            updatePostLikeCount(id, response.data.likeCount)
            setUserPosts((prev) =>
                prev.map((post) =>
                    post._id === id
                        ? { ...post, likeCount: response.data.likeCount }
                        : post
                )
            );

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllUserProject();
        getAllUserPosts()
    }, [])

    if (loading) {
        return <div className="text-white">loading...</div>
    }

    return (
        <div className="min-h-screen text-white rounded-md border-zinc-600 relative font-[Albert_Sans] flex flex-col gap-2 pb-5 px-3">
            {/* Cover image */}
            <div className="h-48 md:h-62 w-full rounded-xl overflow-hidden relative">
                <img
                    className="w-full h-full object-cover object-center"
                    src={user?.bannerImage}
                    alt="banner image"
                />
            </div>

            {/* Profile avatar */}
            <div className="absolute top-36 md:top-44 left-5 w-24 h-24 md:w-32 md:h-32 bg-white rounded-full overflow-hidden border-4 border-zinc-800">
                <img
                    src={user?.profilePic}
                    alt="user profile"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Name and edit button */}
            <div className="pt-10 md:pt-12 flex flex-col md:flex-row md:items-center items-start gap-3">
                <h1 className="text-4xl font-bold tracking-tight">{user?.fullName}</h1>
                {user?.headline &&
                    <p className="p-1 px-2 text-xs md:text-sm font-semibold tracking-tight bg-amber-600 rounded-full">{user?.headline}</p>
                }
            </div>

            {/* Username */}
            <p className="tracking-tight font-medium text-zinc-400">@{user?.username}</p>

            {/* Bio */}
            {user?.bio &&
                <p className="text-sm tracking-tight font-medium">
                    {user?.bio}
                </p>
            }

            {/* Location and link */}
            <div className="mt-2 flex flex-wrap gap-4">
                {user?.address &&
                    <div className="flex items-center gap-2">
                        <TbLocation size={18} className="text-blue-500" />
                        <p className="text-zinc-500 font-medium tracking-tight text-sm">{user.address}</p>
                    </div>
                }
                {user?.portfolioLink &&
                    <div className="flex items-center gap-2">
                        <Link size={18} className="text-emerald-500" />
                        <p className="tracking-tight text-sm font-medium text-blue-500 break-all">{user.portfolioLink}</p>
                    </div>
                }
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
                    <button onClick={() => navigate('/edit-profile')} className="font-medium border-2 py-1 px-2 rounded-md flex items-center gap-2 text-sm tracking-tight cursor-pointer">
                        <Plus size={20} /> Add Skills
                    </button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {user?.skills.map((skill, index) => (
                        <p key={index} className="bg-blue-900/60 w-fit p-1 text-sm font-medium rounded-full px-2 text-blue-500">{skill}</p>
                    ))}
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
            <div className="w-full flex justify-between items-center">
                {activeTab === "Projects" &&
                    <div className="w-full h-full flex flex-col justify-between items-center gap-5 mt-2">
                        {projects.map((project) => (
                            <ProjectCard
                                _id={project._id}
                                user={project.user}
                                projectName={project.projectName}
                                shortDesc={project.shortDesc}
                                tech={project.tech}
                                projectImage={project.projectImage}
                                isMyProject={true}
                            />
                        ))}


                    </div>}
                {activeTab === "Posts" &&
                    <div className="w-full h-full flex flex-col gap-5 mt-2">

                        {userPosts.map((post) => {

                            return < PostCard
                                key={post._id}
                                isMyPost={true}
                                _id={post._id}
                                user={post.user}
                                content={post.content}
                                code={post.code}
                                image={post.image}
                                link={post.link}
                                tags={post.tags}
                                likeCount={post.likeCount}
                                comments={post.comments}
                                deletePost={() => deletePost(post._id)}
                                likeUpdate={() => likePost(post._id,)}
                            />
                        }
                        )}
                    </div>}
            </div>
        </div >
    )
}

export default UserProfilePage
