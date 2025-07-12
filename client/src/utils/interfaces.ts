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