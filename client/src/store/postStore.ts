import axios from "axios";
import { create } from "zustand";
import { BACKEND_URL } from "../utils";

interface postProp {
    _id: string,
    user: {
        _id: string,
        username: string,
        fullName: string,
        profilePic: string,
    },
    content: string,
    code: string,
    image: string,
    link: string,
    tags: string[],
    comments: string[]
    likes: [],
    likeCount: number
    commentCount: number
}

type postStoreType = {
    posts: postProp[],
    loading: boolean,
    fetchPosts: () => void

    addPost: (newPost: postProp) => void
    removePost: (id: string) => void
    updatePost: (id: string, updatedPost: postProp) => void

    updatePostLikeCount: (id: string, count: number) => void
    updateCommentCount: (id: string, count: number) => void
}



const postStore = create<postStoreType>((set) => ({
    posts: [],
    loading: false,
    fetchPosts: async () => {
        set({ loading: true });
        try {
            const res = await axios.get(`${BACKEND_URL}/post/all`, { withCredentials: true });
            set({ posts: res.data.posts.reverse() })
        } catch (error) {
            console.error("Failed to fetech posts", error);
        } finally {
            set({ loading: false })
        }
    },
    addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),

    removePost: (id: string) => set((state) => ({
        posts: state.posts.filter((post) => post._id !== id)
    })),

    updatePost: (id, updatedPost) => {
        set((state) => ({
            posts: state.posts.map((post) => post._id === id ? updatedPost : post)
        }))
    },

    updatePostLikeCount: (id, count) => {
        set((state) => ({
            posts: state.posts.map((post) => (
                post._id === id ? { ...post, likeCount: count } : post
            ))
        }))
    },

    updateCommentCount: (id, count) => {
        set((state) => ({
            posts: state.posts.map((post) => (
                post._id == id ? { ...post, commentCount: count } : post
            ))
        }))
    }
}))

export default postStore