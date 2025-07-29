import axios from "axios"
import { BACKEND_URL } from "../utils"
import postStore from "../store/postStore"

const useLikePost = () => {
    const { updatePostLikeCount } = postStore();
    const likeUnlikeHandler = async (id: string) => {
        try {
            const response = await axios.post(`${BACKEND_URL}/post/like-unlike/${id}`, {}, {
                withCredentials: true
            })
            // console.log(response.data)
            updatePostLikeCount(id, response.data.likeCount)
            return response.data.likeCount
        } catch (error) {
            console.log(error)
        }
    }
    return { likeUnlikeHandler }
}

export default useLikePost