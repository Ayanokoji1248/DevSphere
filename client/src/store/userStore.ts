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
    following: string[] | FollowingUserProp[],
    follower: string[],
    followingCount: number,
    followerCount: number,
    posts: string[],
    projects: string[],
}

export interface FollowingUserProp {
    _id: string;
    fullName: string;
    username: string;
    profilePic?: string;
}

type userStoreType = {
    user: userProp | null,
    userFollowing: FollowingUserProp[]
    setUser: (newUser: userProp | null) => void
    loading: boolean,
    setLoading: (loading: boolean) => void,

    isFollowing: boolean,
    setIsFollowing: (status: boolean) => void,

    setUserFollowing: (userFollowingList: FollowingUserProp[]) => void;
    addUserFollowing: (userFollowData: FollowingUserProp) => void;
    removeUserFollowing: (userId: string) => void;
}

const userStore = create<userStoreType>((set) => ({
    user: null,
    userFollowing: [],
    setUser: (newUser) => set({ user: newUser }),

    loading: true,
    setLoading: (loading) => set({ loading }),

    isFollowing: false,
    setIsFollowing: (status: boolean) => set({ isFollowing: status }),

    setUserFollowing: (userFollowingList) => set({ userFollowing: userFollowingList }),

    addUserFollowing: (followUser) => set((state) => ({
        userFollowing: [followUser, ...state.userFollowing]
    })),

    removeUserFollowing: (userId) => set((state) => ({
        userFollowing: state.userFollowing.filter((u) => u._id !== userId)
    }))

}))

export default userStore