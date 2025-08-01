import { create } from "zustand";

type projectPropType = {
    _id: string,
    projectName: string,
    shortDesc: string,
    longDesc: string,
    category: string,
    status: "Planning" | "In Progress" | "Completed",
    tech: string[],
    githubLink: string,
    projectLink: string,
    projectImage: string,
    user: {
        _id: string,
        fullName: string,
        username: string,
        profilePic: string,
    }
}

type projectStoreType = {
    projects: projectPropType[],
    setProjects: (projects: projectPropType[]) => void,
    addProject: (newProject: projectPropType) => void,
    removeProject: (id: string) => void
}

const projectStore = create<projectStoreType>((set) => ({
    projects: [],
    setProjects: (projects) => set({ projects }),
    addProject: (newProject) => set((state) => ({
        projects: [newProject, ...state.projects]
    })),

    removeProject: (id) => set((state) => ({
        projects: state.projects.filter((project) => project._id !== id)
    }))
}))

export default projectStore;