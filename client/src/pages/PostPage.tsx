import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { BACKEND_URL } from "../utils"
import PostCard from "../components/PostCard"
import { type PostProp } from "../utils/interfaces"

const PostPage = () => {
    const { id } = useParams()
    const [post, setPost] = useState<PostProp | null>(null)

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
        } catch (error) {
            console.error("Failed to like post:", error)
        }
    }

    useEffect(() => {
        if (id) getParticularPost(id)
    }, [id])

    return (
        <div className="w-full text-white flex flex-col gap-3 font-[Albert_Sans]">
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
                />
            )}

            <div>
                <h1 className="text-xl font-semibold tracking-tighter text-zinc-400">Comments:</h1>
            </div>
            <div className="flex flex-col gap-3">
                <textarea name="comment" id="comment" className="h-20 w-full outline-none border-[1px] rounded-md border-zinc-500 p-2 text-sm font-medium" placeholder="Enter your review"></textarea>
                <button className="p-2 text-sm font-semibold bg-blue-500 rounded-md w-fit">Submit</button>
            </div>

            <div>
                <h1 className="font-medium tracking-tighter text-zinc-400">All Comments</h1>
            </div>
            <div className="comments flex flex-col gap-6">
                <div className="flex gap-4">
                    <div className="w-10 h-10 bg-zinc-500 rounded-full"></div>
                    <div className="leading-4 flex flex-col">
                        <h1 className="font-semibold">{post?.user.username}</h1>
                        <p className="text-sm">post content</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="w-10 h-10 bg-zinc-500 rounded-full"></div>
                    <div className="leading-4 flex flex-col">
                        <h1 className="font-semibold">{post?.user.username}</h1>
                        <p className="text-sm">post content</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostPage
