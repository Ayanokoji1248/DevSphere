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
    tags: string[]
}

type postStoreType = {
    posts: postProp[],
    singlePost: postProp | null;
    setSinglePost: (newPost: postProp) => void
    setPosts: (posts: postProp[]) => void
    addPost: (newPost: postProp) => void
}



const postStore = create<postStoreType>((set) => ({
    posts: [],
    singlePost: null,
    setSinglePost: (newPost) => set({ singlePost: newPost }),
    setPosts: (posts) => set({ posts }),
    addPost: (post) => set((state) => ({ posts: [post, ...state.posts] }))
}))

export default postStore