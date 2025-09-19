import axios from "axios";
import { create } from "zustand";
import { BACKEND_URL } from "../utils";

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
    loading: boolean,
    fetchProjects: () => void,
    addProject: (newProject: projectPropType) => void,
    removeProject: (id: string) => void
}

const projectStore = create<projectStoreType>((set) => ({
    projects: [],
    loading: false,
    fetchProjects: async () => {
        set({ loading: true });
        try {
            const res = await axios.get(`${BACKEND_URL}/project/all-project`, {
                withCredentials: true
            })
            console.log(res)
            set({ projects: res.data.projects.reverse() });
        } catch (error) {
            console.error("Failed to fetch projects", error);
        } finally {
            set({ loading: false })
        }

    },
    addProject: (newProject) => set((state) => ({
        projects: [newProject, ...state.projects]
    })),

    removeProject: (id) => set((state) => ({
        projects: state.projects.filter((project) => project._id !== id)
    }))
}))

export default projectStore;