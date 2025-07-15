import { IoIosArrowBack } from "react-icons/io"
import NavBar from "../components/NavBar"
import { useNavigate } from "react-router-dom"
import { Plus, UploadIcon } from "lucide-react";


const CreateProjectPage = () => {
    const navigate = useNavigate();
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
                            <input type="text" className="outline-none border-[1px] p-2 border-zinc-400 rounded-md text-sm tracking-tight" placeholder="Enter your project name" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-semibold tracking-tight" htmlFor="projectName">Short Description</label>
                            <input type="text" className="outline-none border-[1px] p-2 border-zinc-400 rounded-md text-sm tracking-tight" placeholder="Enter project short description" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-semibold tracking-tight" htmlFor="projectName">Detailed Description</label>
                            <textarea name="longDesc" id="longDesc" className="h-50 border-[1px] outline-none rounded-md p-2 border-zinc-400 resize-none text-sm tracking-tight"></textarea>
                        </div>

                        <div className="w-full flex gap-4 ">
                            <div className="flex flex-col w-full gap-2">
                                <label className="font-semibold tracking-tight" htmlFor="projectName">Detailed Description</label>
                                <select className="border-[1px] rounded-md tracking-tight text-sm p-2 bg-black" name="category" id="category">
                                    <option value="Web Dev">Web Dev</option>
                                </select>
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <label className="font-semibold tracking-tight" htmlFor="projectName">Detailed Description</label>
                                <select name="status" id="status" className="border-[1px] tracking-tight text-sm border-zinc-400 rounded-md outline-none bg-black p-2">
                                    <option value="Planning">Planning</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                </select>

                            </div>

                            <div className="w-full flex flex-col gap-2">
                                <label className="font-semibold tracking-tight" htmlFor="projectName">Project Url</label>
                                <input type="text" className="outline-none border-[1px] p-2 border-zinc-400 rounded-md text-sm tracking-tight" placeholder="Enter your project Link" />
                            </div>
                        </div>
                        <div className="w-xl mx-auto h-72 border-2 rounded-md flex justify-center items-center hover:bg-zinc-800 transition-all duration-300 cursor-pointer">
                            <h1 className="flex justify-center flex-col gap-2 items-center font-medium text-zinc-400">
                                <UploadIcon />
                                Upload Image
                            </h1>
                            <input type="flie" className="hidden" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <h1 className="font-semibold tracking-tight">Technology Used</h1>
                            <div className="w-full flex gap-2">
                                <input type="text" className="w-full outline-none border-[1px] p-2 border-zinc-400 rounded-md text-sm tracking-tight" placeholder="Enter project short description" />
                                <button className="w-fit p-2 border-[1px] border-zinc-400 rounded-md bg-zinc-800 hover:bg-zinc-700 transition-all duration-300 cursor-pointer hover:-translate-y-0.5"><Plus /></button>
                            </div>
                        </div>


                        <button className="p-2 font-medium tracking-tight bg-violet-600 rounded-md cursor-pointer transition-all duration-300 hover:bg-violet-700 hover:-translate-y-0.5">Create Project</button>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default CreateProjectPage