import { CodeXml, Link } from "lucide-react"
import { useState, type FormEvent } from "react"
import { TbPhoto } from "react-icons/tb"
import { useNavigate } from "react-router-dom"
import userStore from "../store/userStore"
import toast, { Toaster } from "react-hot-toast"
import axios from "axios"
import { BACKEND_URL } from "../utils"
import postStore from "../store/postStore"
import PostCard from "../components/PostCard"
import Button from "../components/Button"
import { postSchemaValidation } from "../schemas/post.schema"
import useLikePost from "../hooks/useLikePost"


const HomePage = () => {
    const navigate = useNavigate()

    const [content, setContent] = useState("")
    const { user, setUser } = userStore();
    const { posts, addPost } = postStore()

    const { likeUnlikeHandler } = useLikePost()

    const [error, setError] = useState<{ [key: string]: string }>({})

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (!user) {
            toast.error("Please Login", {
                duration: 2000
            })
        }
        try {
            // console.log(content)
            const result = postSchemaValidation.safeParse({
                content
            });

            console.log(result.error?.issues[0].message)

            if (!result.success) {
                const fieldErrors: { [key: string]: string } = {}

                result.error.issues.forEach((err) => {
                    if (err.path[0]) {
                        fieldErrors[err.path[0] as string] = err.message
                    }
                })
                console.log(fieldErrors)
                setError(fieldErrors);
                console.log(error)
                return
            }
            setError({})

            const response = await axios.post(`${BACKEND_URL}/post/create`, {
                content
            }, { withCredentials: true })
            console.log(response.data)
            addPost(response.data.post)
            setContent("")
            setUser(response.data.updatedUser)
            toast.success("Post Created")
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong", {
                duration: 1000
            })
        }
    }

    // const likeUnlikeHandler = async (id: string) => {
    //     try {
    //         const response = await axios.post(`${BACKEND_URL}/post/like-unlike/${id}`, {}, {
    //             withCredentials: true
    //         })
    //         // console.log(response.data)
    //         updatePostLikeCount(id, response.data.likeCount)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    return (
        <div className='w-full min-h-screen pb-6'>
            <Toaster />
            <div className='border-2 border-zinc-600 rounded-xl text-white'>
                <div className='p-5 flex gap-5'>
                    <div className=''>
                        <div className='md:w-12 md:h-12 w-10 h-10 flex shrink-0 bg-zinc-300 rounded-full overflow-auto'>
                            <img src={user?.profilePic} alt="" />
                        </div>
                    </div>
                    <div className='w-full'>
                        <textarea value={content} onChange={(e) => {
                            setContent(e.target.value)
                            if (error.content) setError(prev => ({ ...prev, content: "" }));
                        }} name="content" id="content" className='w-full h-22 border-2 rounded-xl resize-none p-3 text-sm font-[Albert_Sans] font-medium' placeholder="Share your latest project, code snippet, or developer insight..."></textarea>
                        {error.content && <p className="text-red-500 font-medium text-xs">{error.content}</p>}

                        <div className='flex justify-between items-center p-2 flex-col md:flex-row gap-3'>
                            <div className='flex gap-2 md:gap-5 md:flex-row flex-wrap md:flex-nowrap'>
                                {/* <button onClick={() => navigate('/create-post')} className='text-sm font-[Albert_Sans] font-medium md:px-4 px-2 py-2 rounded-md border-2 flex items-center gap-2 hover:border-green-500 cursor-pointer transition-all duration-300 hover:bg-green-700/30'><CodeXml size={18} /> Code</button> */}
                                <Button
                                    text="Code"
                                    variant="outline"
                                    size="md"
                                    className="font-medium text-sm flex items-center gap-3 md:px-4 
                                    hover:border-green-500
                                    hover:bg-green-700/30"
                                    leftIcon={<CodeXml size={18} />}
                                    onClick={() => navigate('/create-post')}
                                />
                                {/* <button onClick={() => navigate('/create-post')} className='text-sm font-[Albert_Sans] font-medium md:px-4 px-2 py-2 rounded-md border-2 flex gap-2 items-center hover:border-blue-500 hover:bg-blue-700/30 cursor-pointer transition-all duration-300'><TbPhoto size={18} /> Media</button> */}
                                <Button
                                    variant="outline"
                                    size="md"
                                    text="Media"
                                    className="hover:border-blue-500 hover:bg-blue-700/30 text-sm font-medium flex items-center gap-3 md:px-4"
                                    leftIcon={<TbPhoto size={18} />}
                                    onClick={() => navigate('/create-post')}
                                />
                                {/* <button onClick={() => navigate('/create-post')} className='text-sm font-[Albert_Sans] font-medium md:px-4 px-2 py-2 rounded-md border-2 flex items-center gap-3 cursor-pointer hover:border-pink-500 hover:bg-pink-700/30 transition-all duration-300'><Link size={18} /> Link</button> */}
                                <Button
                                    text="Link"
                                    variant="outline"
                                    size="md"
                                    className="font-medium text-sm hover:border-pink-500 hover:bg-pink-700/30 flex items-center gap-3 md:px-4"
                                    leftIcon={<Link size={18} />}
                                    onClick={() => navigate('/create-post')}
                                />
                            </div>
                            {/* <button onClick={handleSubmit} className='bg-[#9400FF] w-full text-white cursor-pointer px-4 md:px-6 py-2 text-lg font-medium rounded-md hover:bg-[#7E30E1] transition-all duration-300 hover:-translate-y-0.5'>Post</button> */}
                            <Button
                                onClick={(e) => handleSubmit(e as FormEvent)}
                                text="Post" variant="primary" size="md" className="font-semibold  rounded-md" widthFull={true} />
                        </div>
                    </div>
                </div>
            </div>


            <div id="posts" className="mt-8 flex flex-col gap-5 text-white">

                {posts.map((post) => (


                    <PostCard
                        _id={post._id}
                        user={post.user}
                        content={post.content}
                        code={post.code}
                        image={post.image}
                        link={post.link}
                        tags={post.tags}
                        likeCount={post.likeCount}
                        comments={post.comments}
                        commentCount={post.commentCount}
                        likeUpdate={() => likeUnlikeHandler(post._id)}
                    />

                ))}


            </div>

        </div>
    )
}

export default HomePage