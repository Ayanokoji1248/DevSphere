import { create } from "zustand"

interface userProp {
    fullName: string,
    username: string,
    email: string,
    profilePic: string,
    bannerPic: string,
    skills: string[],
    following: string[],
    follower: string[],
    posts: string[],
    projects: string[]
}

type userStoreType = {
    user: userProp | null,
    setUser: (newUser: userProp) => void
}

const userStore = create<userStoreType>((set) => ({
    user: null,
    setUser: (newUser) => set({ user: newUser })
}))

export default userStore