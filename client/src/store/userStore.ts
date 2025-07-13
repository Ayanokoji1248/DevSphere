import { create } from "zustand"

export interface userProp {
    _id: string,
    fullName: string,
    username: string,
    email: string,
    bio: string,
    profilePic?: string,
    bannerImage?: string,
    portfolioLink?: string,
    headline?: string,
    address?: string,
    skills: string[],
    following: string[],
    follower: string[],
    posts: string[],
    projects: string[]
}

type userStoreType = {
    user: userProp | null,
    setUser: (newUser: userProp) => void
    loading: boolean,
    setLoading: (loading: boolean) => void
}

const userStore = create<userStoreType>((set) => ({
    user: null,
    setUser: (newUser) => set({ user: newUser }),

    loading: true,
    setLoading: (loading) => set({ loading })
}))

export default userStore