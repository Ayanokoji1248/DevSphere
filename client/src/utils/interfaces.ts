export interface ProjectProp {
    _id: string,
    projectName: string,
    shortDesc: string,
    longDesc?: string,
    category?: string,
    status?: "Planning" | "In Progress" | "Completed",
    tech: string[],
    projectLink?: string,
    projectImage?: string,
    user?: {
        _id: string,
        username: string,
        fullName: string,
        profilePic: string,
    }
}


export interface PostProp {
    isMyPost?: boolean,
    user: {
        _id: string,
        username: string,
        fullName: string,
        profilePic: string,
    },
    _id: string,
    content: string,
    code?: string,
    image?: string,
    link?: string,
    tags: string[],
    likeCount: number,
    comments?: string[],

    deletePost?: () => void
    likeUpdate?: (id: string, likeCount: number) => void
}