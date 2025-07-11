import { create } from "zustand";

interface postProp {
    _id: string,
    user: {
        _id: string,
        username: string,
        fullName: string,
    },
    content: string,
    code: string,
    image: string,
    link: string,
    tags: string[],
    likes: [],
    likeCount: number
}

type postStoreType = {
    posts: postProp[],
    singlePost: postProp | null;
    setSinglePost: (newPost: postProp) => void
    setPosts: (posts: postProp[]) => void
    addPost: (newPost: postProp) => void

    updatePostLikeCount: (id: string, count: number) => void
}



const postStore = create<postStoreType>((set) => ({
    posts: [],
    singlePost: null,
    setSinglePost: (newPost) => set({ singlePost: newPost }),
    setPosts: (posts) => set({ posts }),
    addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),

    updatePostLikeCount: (id, count) => {
        set((state) => ({
            posts: state.posts.map((post) => (
                post._id === id ? { ...post, likeCount: count } : post
            ))
        }))
    }
}))

export default postStore