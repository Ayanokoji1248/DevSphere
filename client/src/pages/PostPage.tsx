import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { BACKEND_URL } from "../utils"
import PostCard from "../components/PostCard"
import { type CommentProp, type PostProp } from "../utils/interfaces"
import userStore from "../store/userStore"
import { IoIosArrowBack } from "react-icons/io"
import Button from "../components/Button"
import useLikePost from "../hooks/useLikePost"

const PostPage = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const { user } = userStore()
    const [post, setPost] = useState<PostProp | null>(null)
    // const { updatePostLikeCount } = postStore()
    const [comment, setComment] = useState("")
    const [comments, setComments] = useState<CommentProp[]>([]);

    const { likeUnlikeHandler } = useLikePost()

    const getParticularPost = async (id: string) => {
        try {
            const response = await axios.get(`${BACKEND_URL}/post/${id}`)
            setPost(response.data.post)
        } catch (error) {
            console.error("Failed to fetch post:", error)
        }
    }

    const likePost = async (id: string) => {
        const newCount = await likeUnlikeHandler(id);
        setPost((prev) =>
            prev ? { ...prev, likeCount: newCount } : prev
        )
    }

    const commentPost = async (id: string) => {
        try {
            const response = await axios.post(`${BACKEND_URL}/comment/create/${id}`, { comment }, { withCredentials: true })
            console.log(response.data)
            setPost(prev => prev ? { ...prev, commentCount: response.data.commentCount } : prev)
            setComments(prev => [response.data.comment, ...prev]);
            setComment("")
        } catch (error) {
            console.log(error)
        }
    }

    const getAllComment = async (id: string) => {
        try {
            const response = await axios.get(`${BACKEND_URL}/comment/all/${id}`, { withCredentials: true })
            console.log(response.data)
            setComments(response.data.comments)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (id) {
            getParticularPost(id)
            getAllComment(id)
        }
    }, [id])

    return (
        <div className="w-full text-white flex flex-col gap-3 pb-10 font-[Albert_Sans]">
            <button onClick={() => navigate('/home')} className="cursor-pointer hover:bg-zinc-800 transition-all duration-300 hover:-translate-y-0.5 p-2 border-[1px] w-fit rounded-md">
                <IoIosArrowBack className="" size={22} />
            </button>

            {post && (
                <PostCard
                    user={post.user}
                    _id={post._id}
                    content={post.content}
                    code={post.code}
                    image={post.image}
                    link={post.link}
                    isMyPost={false}
                    tags={post.tags}
                    likeCount={post.likeCount}
                    likeUpdate={() => likePost(post._id)}
                    commentCount={post.commentCount}
                // commentUpdate={() => commentPost(post._id)}
                />
            )}

            <div>
                <h1 className="text-xl font-semibold tracking-tighter text-zinc-400">Comments:</h1>
            </div>
            <div className="flex flex-col gap-3">
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} name="comment" id="comment" className="h-20 w-full outline-none border-[1px] rounded-md border-zinc-500 p-2 text-sm font-medium" placeholder="Enter your review"></textarea>
                <Button text="Submit" variant="info" size="md" className="rounded-md text-sm font-medium" onClick={() => commentPost(id as string)} />
            </div>

            <div>
                <h1 className="font-medium tracking-tighter text-zinc-400">All Comments</h1>
            </div>
            <div className="comments flex flex-col gap-6">
                {comments.map((comment) => (

                    <div className="flex gap-4">
                        <div className="w-10 h-10 bg-zinc-500 rounded-full overflow-auto">
                            <img src={comment.user.profilePic} alt="" />
                        </div>
                        <div className="leading-4 flex flex-col">
                            <div className="flex gap-2 items-center">
                                <h1 className="font-semibold">{comment.user.fullName}</h1>
                                <p className="text-zinc-500 font-medium text-sm">@{comment.user.username}</p>
                            </div>
                            <p className="text-sm">{comment.comment}</p>
                            {
                                user?._id === comment.user._id &&
                                < div className="mt-2">
                                    {/* <button className="bg-red-500 text-sm font-medium p-0.5 px-1 rounded-md cursor-pointer hover:bg-red-600 transition-all duration-300">Delete</button> */}
                                    <Button
                                        text="Delete"
                                        variant="danger"
                                        size="sm"
                                        className="text-sm rounded-md font-medium"
                                    />
                                </div>
                            }
                        </div>
                    </div>
                ))}

            </div>
        </div >
    )
}

export default PostPage
