import { create } from "zustand"

interface userProp {
    fullName: string,
    username: string,
    profilePic: string,
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