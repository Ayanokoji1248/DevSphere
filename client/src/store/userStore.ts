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
    followingCount: number,
    followerCount: number,
    posts: string[],
    projects: string[]
}

type userStoreType = {
    user: userProp | null,
    setUser: (newUser: userProp | null) => void
    loading: boolean,
    setLoading: (loading: boolean) => void,

    isFollowing: boolean,
    setIsFollowing: (status: boolean) => void,
}

const userStore = create<userStoreType>((set) => ({
    user: null,
    setUser: (newUser) => set({ user: newUser }),

    loading: true,
    setLoading: (loading) => set({ loading }),

    isFollowing: false,
    setIsFollowing: (status: boolean) => set({ isFollowing: status })


}))

export default userStore