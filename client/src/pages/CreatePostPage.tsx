import axios from "axios";
import { ArrowLeft, PlusIcon, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../utils";
import postStore from "../store/postStore";
import toast, { Toaster } from "react-hot-toast";
import userStore from "../store/userStore";
import { uploadImage } from "../utils/uploadImage";
import Button from "../components/Button";
import Editor from "react-simple-code-editor";
import hljs from "highlight.js";
import "prismjs/themes/prism-tomorrow.css"; // ✅ Prism theme
import { postSchemaValidation } from "../schemas/post.schema";



const CreatePostPage = () => {
    const navigate = useNavigate()

    const { addPost } = postStore();
    const { setUser, user } = userStore();

    const [file, setFile] = useState<File | null>(null)

    const [post, setPost] = useState({
        content: "",
        code: "",
        image: "",
        link: "",
    })
    const [tag, setTag] = useState("")
    const [tags, setTags] = useState<string[]>([]);

    const [error, setError] = useState<{ [key: string]: string }>({})

    const handleTagSubmit = () => {
        if (tag.trim() == "") {
            return
        }

        const tempTag: string[] = tags;
        tempTag.push(tag);
        setTags(tempTag)
        setTag("")
    }

    const handleDeleteTag = (idx: number) => {
        const tempTag = tags.filter((_, id) => id !== idx);
        setTags(tempTag)
    }

    const handlePostSubmit = async () => {
        try {


            let imageUrl: string | null = null
            if (!user) {
                throw new Error("user not Found")
            }
            if (file) {
                imageUrl = await uploadImage(file, "post", user);
            }

            const result = postSchemaValidation.safeParse(post)

            if (!result.success) {
                const fieldErrors: { [key: string]: string } = {}
                result.error.issues.forEach((err) => {
                    if (err.path[0]) {
                        fieldErrors[err.path[0] as string] = err.message
                    }
                })
                setError(fieldErrors)
                return
            }

            const response = await axios.post(`${BACKEND_URL}/post/create`, {
                content: post.content,
                code: post.code.trim() !== "" ? post.code : undefined,
                image: imageUrl,
                link: post.link.trim() !== "" ? post.link : undefined,
                tags
            }, { withCredentials: true })
            console.log(response.data)
            addPost(response.data.post)
            setUser(response.data.updatedUser)
            setPost({
                content: "",
                code: "",
                image: "",
                link: ""
            })
            setFile(null)
            setTags([])
            toast.success("Post Added Succesfully", {
                duration: 1000
            })

            setTimeout(() => {
                navigate('/home')
            }, 1500)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="pb-5">
            <Toaster />
            <div className="text-white border-2 border-zinc-500 rounded-xl min-h-screen p-5 pb-2 w-full">
                <Button
                    text="Back"
                    variant="black"
                    size="sm"
                    leftIcon={<ArrowLeft size={18} />}
                    onClick={() => navigate('/home')}
                />

                <div className=" p-5 font-[Albert_Sans]">
                    <h1 className="text-3xl font-[Albert_Sans] tracking-tighter font-bold">Content</h1>

                    <textarea className="mt-4 border-2 w-full rounded-md p-2 text-sm font-medium font-[Albert_Sans] resize-none h-22" name="content" value={post.content} onChange={(e) => setPost({ ...post, content: e.target.value })} id="content" placeholder="What's on your mind? Share your latest project, code insight, or developer experience..."></textarea>
                    {error.content && <p className="text-xs text-red-500">{error.content}</p>}
                    <div className="flex flex-col mt-5 gap-2">
                        <label htmlFor="code" className="font-bold text-lg">Code <span className="text-zinc-500 font-medium text-sm">(optional)</span></label>
                        {/* <textarea onChange={(e) => setPost({ ...post, code: e.target.value })} className=" border-2 w-full rounded-md p-2 text-sm font-medium font-[Albert_Sans] resize-none h-22" placeholder="Enter your code here" name="code" id="code"></textarea> */}
                        <Editor
                            name="code"
                            placeholder="Enter your code"
                            className="bg-zinc-900"
                            value={post.code}
                            onValueChange={(value) => setPost({ ...post, code: value })}
                            highlight={(code) => hljs.highlightAuto(code).value}
                            padding={10}
                            style={{
                                fontFamily: "Fira Code, monospace",
                                fontSize: 16,
                                whiteSpace: "pre",
                                overflow: "auto",
                                height: "300px",
                                color: "#f8f8f2",
                                borderRadius: "10px",
                                border: "1px solid white"
                            }}
                        />

                        {error.code && <p className="text-xs text-red-500">{error.code}</p>}

                    </div>
                    <div className="mt-5 flex flex-col gap-3">
                        <label className="font-bold text-lg" htmlFor="image">
                            Image
                            <span className="text-zinc-500 font-medium text-sm">(optional)</span>
                        </label>
                        <div className="flex items-center justify-center w-full">
                            <label
                                htmlFor="dropzone-file"
                                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-zinc-900 hover:bg-zinc-800 hover:border-gray-500"
                            >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg
                                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 16"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                        />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="font-semibold">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                </div>
                                <input
                                    name="image"
                                    id="dropzone-file"
                                    onChange={(e) => {
                                        const selectedFile = e.target.files?.[0];
                                        if (selectedFile) {
                                            setFile(selectedFile);
                                        } else {
                                            setFile(null);
                                        }
                                    }}
                                    type="file"
                                    className="hidden"
                                />
                            </label>
                        </div>

                        {/* ✅ Image Preview */}
                        {file && (
                            <div className="mt-4 flex justify-center">
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt="Preview"
                                    className="max-h-64 rounded-md object-contain border border-zinc-700"
                                />
                            </div>
                        )}
                    </div>


                    <div className="mt-5 flex flex-col gap-2 ">
                        <label htmlFor="link" className="font-bold text-lg">Link
                            <span className="text-zinc-500 font-medium text-sm">(optional)</span>
                        </label>
                        <input onChange={(e) => setPost({ ...post, link: e.target.value })} type="text" className="p-2 border-[1px] font-medium rounded-md outline-none" placeholder="url" />
                        {error.link && <p className="text-red-500 text-xs">{error.link}</p>}
                    </div>

                </div>

                <div className="p-5 flex flex-col gap-3">
                    <h1 className="text-3xl font-bold">Tags</h1>
                    <div className="flex gap-2">
                        <input value={tag} onChange={(e) => setTag(e.target.value)} type="text" placeholder="Add your tags" className="w-full p-2 text-sm font-medium border-[1px] outline-none rounded-md border-zinc-500" />
                        <button onClick={handleTagSubmit} className="p-2 bg-zinc-900 hover:bg-zinc-800 transition-all duration-300 cursor-pointer shadow shadow-zinc-500 font-medium rounded-md"><PlusIcon size={25} /></button>
                    </div>

                    {tags.length > 0 &&
                        <div id="tags" className="flex flex-wrap  gap-2">
                            {tags.map((tag, idx) => (
                                <div key={idx} className="p-3 w-fit bg-zinc-700 border-[1px] rounded-full font-medium font-[Albert_Sans] py-1 flex items-center justify-between gap-2">
                                    <p className="">{tag}</p>
                                    <button onClick={() => handleDeleteTag(idx)} className="hover:bg-zinc-900 rounded-full transition-all  duration-300 p-1 cursor-pointer"><X size={18} /></button>
                                </div>
                            ))}
                        </div>
                    }

                </div>

                <div className="p-5">
                    {/* <button onClick={handlePostSubmit} className="bg-violet-500 p-2 w-full rounded-md font-medium font-[Albert_Sans] hover:bg-violet-600 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">Submit</button> */}
                    <Button
                        onClick={handlePostSubmit}
                        variant="primary"
                        text="Submit"
                        size="md"
                        widthFull={true}
                        className="rounded-md font-medium"
                    />
                </div>
            </div>
        </div>

    )
}

export default CreatePostPage