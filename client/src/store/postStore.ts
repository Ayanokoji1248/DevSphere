import { create } from "zustand";

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
    singlePost: postProp | null;
    setSinglePost: (newPost: postProp) => void
    setPosts: (posts: postProp[]) => void
    addPost: (newPost: postProp) => void
    removePost: (id: string) => void
    updatePost: (id: string, updatedPost: postProp) => void

    updatePostLikeCount: (id: string, count: number) => void
    updateCommentLikeCount: (id: string, count: number) => void
}



const postStore = create<postStoreType>((set) => ({
    posts: [],
    singlePost: null,
    setSinglePost: (newPost) => set({ singlePost: newPost }),
    setPosts: (posts) => set({ posts }),
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

    updateCommentLikeCount: (id, count) => {
        set((state) => ({
            posts: state.posts.map((post) => (
                post._id == id ? { ...post, commentCount: count } : post
            ))
        }))
    }
}))

export default postStore