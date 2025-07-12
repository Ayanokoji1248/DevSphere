import axios from "axios"
import { Heart, MessageCircle, Share } from "lucide-react"
import { BACKEND_URL } from "../utils"
import postStore from "../store/postStore"
import type { PostProp } from "../utils/interfaces"

const PostCard = ({ _id, user, content, code, image, link, tags, likeCount, comments }: PostProp) => {
    const { updatePostLikeCount } = postStore()

    const likeUnlikeHandler = async (id: string) => {
        try {
            const response = await axios.post(`${BACKEND_URL}/post/like-unlike/${id}`, {}, {
                withCredentials: true
            })
            // console.log(response.data)
            updatePostLikeCount(id, response.data.likeCount)
        } catch (error) {
            console.log(error)
        }
    }

    return (

        <div id="post" className="w-full border-[1px] rounded-xl border-zinc-500 p-5 py-6 flex gap-5">
            <div>
                <div className="w-10 h-10 bg-zinc-300 rounded-full"></div>
            </div>
            <div className="w-full font-[Albert_Sans] flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <h1 className="font-bold text-lg tracking-tighter">{user.fullName}</h1>
                    <p className="text-sm tracking-tight font-medium text-zinc-400">@{user.username}</p>
                </div>
                <div>
                    <p className="leading-tight">{content}</p>
                </div>
                {link &&
                    <div className="w-full p-2 bg-blue-900/60 rounded-md my-2">
                        <a className="font-medium text-blue-500" href={link} target="_blank">{link}</a>
                    </div>
                }
                {image &&
                    <div className="w-fit max-h-[600px] overflow-auto rounded-md my-2">
                        <img className="w-fit h-full object-contain object-center rounded-xl " src={image} alt="" />
                    </div>
                }

                {code &&
                    <div className="bg-zinc-800 text-green-400 font-medium font-mono p-2 rounded-md">
                        <p>{code}</p>
                    </div>
                }

                {tags.length > 1 &&
                    <div id="tag" className="flex gap-3 mt-2">
                        {tags.map((t) => (

                            <p className="bg-zinc-300 text-black px-2.5 py-1 font-medium text-sm rounded-full text-md">#{t}</p>
                        ))}

                    </div>
                }

                <div className="mt-2 flex gap-5">
                    <button onClick={() => likeUnlikeHandler(_id)} className="flex items-center text-sm gap-1 hover:text-red-500 cursor-pointer transition-all duration-300"><Heart size={18} />  {likeCount}</button>
                    <div className="flex items-center text-sm gap-1 hover:text-blue-500 cursor-pointer transition-all duration-300"><MessageCircle size={18} /> {comments?.length}</div>
                    <div className="flex items-center text-sm gap-1 hover:text-green-500 cursor-pointer transition-all duration-300"><Share size={18} /> 35</div>
                </div>
            </div>
        </div>
    )
}

export default PostCard