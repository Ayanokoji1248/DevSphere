import axios from "axios";
import { CodeXml, Link2, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { TbLocation } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";
import PostCard from "../components/PostCard";
import ProjectCard from "../components/ProjectCard";
import userStore, { type userProp } from "../store/userStore";
import { BACKEND_URL } from "../utils";
import type { PostProp, ProjectProp } from "../utils/interfaces";
import toast, { Toaster } from "react-hot-toast";
import useLikePost from "../hooks/useLikePost";
import { useLoadingStore } from "../store/loadingStore";
import Loader from "../components/Loader";


const ProfilePage = () => {
    const navigate = useNavigate();
    const { id } = useParams()

    const { setLoading, loading } = useLoadingStore();

    const tabs = ["Projects", "Posts"]
    const [activeTab, setActiveTab] = useState("Projects");

    const { user: currentUser, setIsFollowing, isFollowing, setUser: setCurrentUser } = userStore()

    const [user, setUser] = useState<userProp>();


    const [userPosts, setUserPosts] = useState<PostProp[]>([]);
    const [projects, setProjects] = useState<ProjectProp[]>([])

    const { likeUnlikeHandler } = useLikePost();

    const getUserInfo = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/user/${id}`, {
                withCredentials: true
            })

            console.log(response)
            setUser(response.data.user)
            setIsFollowing(response.data.isFollowing)
        } catch (error) {
            console.log(error)
        }
    }

    const getUserProject = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/user/${id}/project`, {
                withCredentials: true
            });
            // console.log(response.data.projects);
            setProjects(response.data.projects)
        } catch (error) {
            console.log(error)
        }
    }

    const getUserPosts = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/user/${id}/post`, {
                withCredentials: true
            });
            // console.log(response.data);
            setUserPosts(response.data.posts)
        } catch (error) {
            console.log(error)
        }
    }

    const likePost = async (id: string) => {
        const newCount = await likeUnlikeHandler(id)
        setUserPosts((prev) => prev.map((post) => (
            post._id === id ? { ...post, likeCount: newCount } : post
        )))
    }

    const followUser = async (id: string) => {
        try {
            const response = await axios.post(`${BACKEND_URL}/user/${id}/follow-unfollow`, {}, { withCredentials: true });
            setIsFollowing(!isFollowing)
            // console.log(response.data);
            setCurrentUser(response.data.updatedUser)
            toast.success(response.data.message)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                await Promise.all([
                    getUserInfo(),
                    getUserProject(),
                    getUserPosts()
                ]);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, setLoading]);

    if (loading || !user) {
        return <div className="text-white">
            <Loader />
        </div>
    }
    return (
        <div className="min-h-screen text-white rounded-md border-zinc-600 relative font-[Albert_Sans] flex flex-col gap-2 pb-5 px-3">
            <Toaster />
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

            {/* Username & Follow Button */}
            <div className="flex items-center justify-between">
                <p className="tracking-tight font-medium text-zinc-400">@{user?.username}</p>
                {currentUser?._id !== user._id &&
                    <button
                        onClick={() => followUser(user._id)}
                        className={`
    ${isFollowing
                                ? "border-2 border-[#04cd9e] text-green-500 bg-transparent hover:bg-[#e6fef7]"
                                : "bg-[#04cd9e] hover:bg-[#00a07d] text-white"}
    cursor-pointer transition-all duration-300 text-sm px-3 py-1.5 rounded-md font-medium
  `}
                    >
                        {isFollowing ? "Following" : "Follow"}
                    </button>
                }

            </div>

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
                        <Link2 size={18} className="text-emerald-500" />
                        <p className="tracking-tight text-sm font-medium text-blue-500 break-all">{user.portfolioLink}</p>
                    </div>
                }
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-4 mt-3">
                <div className="flex flex-col justify-center items-center p-3 bg-[#0D1422] text-blue-500 border-2 border-blue-900 rounded-md flex-1 min-w-[100px]">
                    <h1 className="font-bold text-2xl">{user?.followingCount}</h1>
                    <p className="font-medium tracking-tight text-sm">Following</p>
                </div>
                <div className="flex flex-col justify-center items-center p-3 bg-[#181023] text-violet-500 border-2 border-violet-900 rounded-md flex-1 min-w-[100px]">
                    <h1 className="font-bold text-2xl">{user?.followerCount}</h1>
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
                    {
                        currentUser?._id === user._id &&
                        <button onClick={() => navigate('/edit-profile')} className="font-medium border-2 py-1 px-2 rounded-md flex items-center gap-2 text-sm tracking-tight cursor-pointer">
                            <Plus size={20} /> Add Skills
                        </button>
                    }
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
                        {projects.length === 0 &&
                            <p className="text-sm text-zinc-500 font-medium">No Projects Created.</p>
                        }

                        {projects.length > 0 && projects.map((project) => (
                            <ProjectCard
                                _id={project._id}
                                user={project.user}
                                projectName={project.projectName}
                                shortDesc={project.shortDesc}
                                tech={project.tech}
                                projectImage={project.projectImage}
                                isMyProject={false}
                            />
                        ))}


                    </div>}
                {activeTab === "Posts" &&
                    <div className="w-full h-full flex flex-col gap-5 mt-2">
                        {userPosts.length === 0 &&
                            <p className="text-sm text-zinc-500 font-medium">No Posts Created.</p>
                        }
                        {userPosts.length > 0 && userPosts.map((post) => {

                            return < PostCard
                                key={post._id}
                                isMyPost={false}
                                _id={post._id}
                                user={post.user}
                                content={post.content}
                                code={post.code}
                                image={post.image}
                                link={post.link}
                                tags={post.tags}
                                likeCount={post.likeCount}
                                comments={post.comments}
                                likeUpdate={() => likePost(post._id,)}
                            />
                        }
                        )}
                    </div>}
            </div>
        </div >
    )
}

export default ProfilePage

