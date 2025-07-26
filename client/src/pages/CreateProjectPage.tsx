import { IoIosArrowBack } from "react-icons/io"
import NavBar from "../components/NavBar"
import { useNavigate } from "react-router-dom"
import { Plus, UploadIcon, X } from "lucide-react";
import { useRef, useState, type ChangeEvent } from "react";
import axios from "axios";
import { BACKEND_URL } from "../utils";
import { uploadImage } from "../utils/uploadImage";
import userStore from "../store/userStore";
import projectStore from "../store/projectStore";
import Button from "../components/Button";


const CreateProjectPage = () => {
    const navigate = useNavigate();

    const { user } = userStore()
    const { addProject } = projectStore()

    const [formData, setFormData] = useState({
        projectName: "",
        shortDesc: "",
        longDesc: "",
        category: "",
        status: "",
        githubLink: "",
        projectLink: "",
    })

    const fileRef = useRef<HTMLInputElement>(null)

    const [projectImage, setProjectImage] = useState<File | null>(null)
    const [previewProjectImage, setPreviewProjectImage] = useState("")

    const [tech, setTech] = useState("");
    const [techs, setTechs] = useState<string[]>([]);

    const onInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleTech = () => {
        if (tech.trim() === "") return
        setTechs((prev) => [...prev, tech.trim()])
        setTech("")
    }

    const deleteTech = (id: number) => {
        setTechs((prev) => prev.filter((_, idx) => idx !== id))
    }

    const handleSubmit = async () => {

        if (!user) {
            throw new Error("User not Found")
        }

        const projectImageUrl = await uploadImage(projectImage, "project", user)
        // console.log(projectImageUrl);

        try {
            const response = await axios.post(`${BACKEND_URL}/project/create`, {
                ...formData,
                projectImage: projectImageUrl,
                tech: techs,
            }, {
                withCredentials: true
            })
            // console.log(response.data)
            addProject(response.data.project)

        } catch (error) {
            console.log(error)
        }
    }



    return (
        <div className="bg-black w-full min-h-screen font-[Albert_Sans]">
            <NavBar />
            <div className="max-w-7xl min-h-screen mx-auto pt-22 text-white ">

                <div>
                    <button onClick={() => navigate('/projects')} className="w-fit p-2 border-[1px] border-zinc-600 rounded-md bg-black hover:bg-zinc-800 transition-all duration-300 cursor-pointer hover:-translate-y-0.5">
                        <IoIosArrowBack size={22} />
                    </button>
                </div>
                <div className="p-8 mt-3 max-w-3xl bg-zinc-900 rounded-md mx-auto">

                    <h1 className="text-3xl border-l-8 border-violet-600 pl-4 font-bold tracking-tight">Create Project</h1>

                    <div className="mt-5 flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="font-semibold tracking-tight" htmlFor="projectName">Project Name</label>
                            <input name="projectName" value={formData.projectName} onChange={onInputChange} type="text" className="outline-none border-[1px] p-2 border-zinc-400 rounded-md text-sm tracking-tight" placeholder="Enter your project name" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-semibold tracking-tight" htmlFor="projectName">Short Description</label>
                            <input value={formData.shortDesc} name="shortDesc" onChange={onInputChange} type="text" className="outline-none border-[1px] p-2 border-zinc-400 rounded-md text-sm tracking-tight" placeholder="Enter project short description" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-semibold tracking-tight" htmlFor="projectName">Detailed Description</label>
                            <textarea value={formData.longDesc} onChange={onInputChange} name="longDesc" id="longDesc" className="h-50 border-[1px] outline-none rounded-md p-2 border-zinc-400 resize-none text-sm tracking-tight" placeholder="Enter your "></textarea>
                        </div>

                        <div className="w-full flex gap-4 ">
                            <div className="flex flex-col w-full gap-2">
                                <label className="font-semibold tracking-tight" htmlFor="projectName">Category</label>
                                <select value={formData.category} onChange={onInputChange} className="border-[1px] rounded-md tracking-tight text-sm p-2 bg-black" name="category" id="category">
                                    <option value="" hidden>Select Category</option>
                                    <option value="Web Dev">Web Dev</option>
                                </select>
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <label className="font-semibold tracking-tight" htmlFor="projectName">Status</label>
                                <select value={formData.status} name="status" id="status"
                                    onChange={onInputChange}
                                    className="border-[1px] tracking-tight text-sm border-zinc-400 rounded-md outline-none bg-black p-2">
                                    <option value="" hidden>Select Status</option>
                                    <option value="Planning">Planning</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                </select>

                            </div>

                        </div>

                        <div className="w-full flex gap-4">
                            <div className="w-full flex flex-col gap-2">
                                <label className="font-semibold tracking-tight" htmlFor="projectName">Project Url <span className="text-sm text-zinc-400">(live demo)</span></label>
                                <input name="projectLink" value={formData.projectLink} onChange={onInputChange} type="text" className="outline-none border-[1px] p-2 border-zinc-400 rounded-md text-sm tracking-tight" placeholder="Enter your project Link" />
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <label className="font-semibold tracking-tight" htmlFor="projectName">Github Url</label>
                                <input name="githubLink" value={formData.githubLink} onChange={onInputChange} type="text" className="outline-none border-[1px] p-2 border-zinc-400 rounded-md text-sm tracking-tight" placeholder="Enter your github url" />
                            </div>

                        </div>

                        <div onClick={() => {
                            fileRef.current?.click()
                        }} className="w-xl mx-auto h-72 border-2 rounded-md flex justify-center items-center hover:bg-zinc-800 transition-all duration-300 cursor-pointer"
                            style={{ backgroundImage: `url(${previewProjectImage})`, backgroundPosition: "center", backgroundSize: "cover" }}>
                            <h1 className="flex justify-center flex-col gap-2 items-center font-medium text-zinc-400">
                                <UploadIcon />
                                Upload Image
                            </h1>
                            <input onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    console.log(file)
                                    setPreviewProjectImage(URL.createObjectURL(file))
                                    setProjectImage(file);
                                }
                            }} ref={fileRef} type="file" className="hidden" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <h1 className="font-semibold tracking-tight">Technology Used</h1>
                            <div className="w-full flex gap-2">
                                <input value={tech} onChange={(e) => setTech(e.target.value)} type="text" className="w-full outline-none border-[1px] p-2 border-zinc-400 rounded-md text-sm tracking-tight" placeholder="Enter project short description" />
                                <button onClick={handleTech} className="w-fit p-2 border-[1px] border-zinc-400 rounded-md bg-zinc-800 hover:bg-zinc-700 transition-all duration-300 cursor-pointer hover:-translate-y-0.5"><Plus /></button>
                            </div>

                            {techs.length > 0 &&
                                <div className="flex flex-wrap gap-2">
                                    {techs.map((tech, idx) => (
                                        <div className="w-fit rounded-full bg-zinc-800 px-2 py-1 text-sm font-medium border-[1px] border-zinc-600 flex items-center gap-1">{tech}
                                            <button onClick={() => deleteTech(idx)} className="cursor-pointer"><X size={15} color="red" /></button></div>
                                    ))}
                                </div>
                            }
                        </div>


                        {/* <button onClick={handleSubmit} className="p-2 font-medium tracking-tight bg-violet-600 rounded-md cursor-pointer transition-all duration-300 hover:bg-violet-700 hover:-translate-y-0.5">Create Project</button> */}

                        <Button
                            variant="primary"
                            size="md"
                            text="Create Project"
                            widthFull={true}
                            className="text-md font-bold rounded-md"
                            onClick={handleSubmit}
                        />

                    </div>
                </div>

            </div>
        </div >
    )
}

export default CreateProjectPage