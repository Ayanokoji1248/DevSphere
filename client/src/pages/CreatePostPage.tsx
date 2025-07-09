import { PlusIcon } from "lucide-react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";


const CreatePostPage = () => {
    const navigate = useNavigate()
    return (
        <div className="text-white border-2 border-zinc-500 rounded-xl min-h-screen p-5 w-full">
            <div className="bg-zinc-900 rounded-md w-fit p-2 border-[1px] cursor-pointer hover:bg-zinc-800 transition-all duration-300 hover:-translate-y-0.5" onClick={() => navigate('/home')}>
                <IoIosArrowBack size={22} />
            </div>


            <div className=" p-5 mt-5 font-[Albert_Sans]">
                <h1 className="text-3xl font-[Albert_Sans] tracking-tighter font-bold">Content</h1>

                <textarea className="mt-4 border-2 w-full rounded-md p-2 text-sm font-medium font-[Albert_Sans] resize-none h-22" name="content" id="content" placeholder="What's on your mind? Share your latest project, code insight, or developer experience..."></textarea>

                <div className="flex flex-col mt-5 gap-2">
                    <label htmlFor="code" className="font-bold text-lg">Code <span className="text-zinc-500 font-medium text-sm">(optional)</span></label>
                    <textarea className=" border-2 w-full rounded-md p-2 text-sm font-medium font-[Albert_Sans] resize-none h-22" placeholder="Enter your code here" name="code" id="code"></textarea>
                </div>

                <div className="mt-5 flex flex-col  gap-3">
                    <label className="font-bold text-lg" htmlFor="image">
                        Image
                        <span className="text-zinc-500 font-medium text-sm">(optional)</span>
                    </label>
                    <div className="flex items-center justify-center w-full">
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-zinc-900  hover:bg-zinc-800  hover:border-gray-500 ">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                            </div>
                            <input name="image" id="dropzone-file" type="file" className="hidden" />
                        </label>
                    </div>

                </div>

                <div className="mt-5 flex flex-col gap-2 ">
                    <label htmlFor="link" className="font-bold text-lg">Link
                        <span className="text-zinc-500 font-medium text-sm">(optional)</span>
                    </label>
                    <input type="text" className="p-2 border-[1px] font-medium rounded-md outline-none" placeholder="url" />
                </div>

            </div>

            <div className="p-5 flex flex-col gap-3">
                <h1 className="text-3xl font-bold">Tags</h1>
                <div className="flex gap-2">
                    <input type="text" placeholder="Add your tags" className="w-full p-2 text-sm font-medium border-[1px] outline-none rounded-md border-zinc-500" />
                    <button className="p-2 bg-zinc-900 hover:bg-zinc-800 transition-all duration-300 cursor-pointer shadow shadow-zinc-500 font-medium rounded-md"><PlusIcon size={25} /></button>
                </div>

                <div></div>

            </div>

            <div className="p-5">

                <button className="bg-violet-500 p-2 w-full rounded-md font-medium">Submit</button>
            </div>
        </div>

    )
}

export default CreatePostPage