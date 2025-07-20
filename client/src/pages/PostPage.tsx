import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { BACKEND_URL } from "../utils"
import PostCard from "../components/PostCard"
import { type CommentProp, type PostProp } from "../utils/interfaces"
import postStore from "../store/postStore"
import userStore from "../store/userStore"

const PostPage = () => {
    const { id } = useParams()
    const { user } = userStore()
    const [post, setPost] = useState<PostProp | null>(null)
    const { updatePostLikeCount } = postStore()
    const [comment, setComment] = useState("")
    const [comments, setComments] = useState<CommentProp[]>([]);

    const getParticularPost = async (id: string) => {
        try {
            const response = await axios.get(`${BACKEND_URL}/post/${id}`)
            setPost(response.data.post)
        } catch (error) {
            console.error("Failed to fetch post:", error)
        }
    }

    const likePost = async (id: string) => {
        try {
            const response = await axios.post(`${BACKEND_URL}/post/like-unlike/${id}`, {}, {
                withCredentials: true
            })

            setPost((prev) =>
                prev ? { ...prev, likeCount: response.data.likeCount } : prev
            )
            updatePostLikeCount(id, response.data.likeCount)
        } catch (error) {
            console.error("Failed to like post:", error)
        }
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
                <button onClick={() => commentPost(id as string)} className="p-2 text-sm font-semibold bg-blue-500 rounded-md w-fit cursor-pointer hover:bg-blue-600 transition-all duration-300 hover:-translate-y-0.5">Submit</button>
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
                                    <button className="bg-red-500 text-sm font-medium p-0.5 px-1 rounded-md cursor-pointer hover:bg-red-600 transition-all duration-300">Delete</button>
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
