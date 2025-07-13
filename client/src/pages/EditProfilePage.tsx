import { Plus, Upload } from "lucide-react"
import { useRef, useState } from "react";
import { IoIosArrowBack } from "react-icons/io"
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../utils";
import { uploadImage } from "../utils/uploadImage";
import axios from "axios";
import userStore from "../store/userStore";



type FormDataState = {
    username: string;
    fullName: string;
    email: string;
    bio: string;
    profilePic: string;
    bannerImage: string;
    skills: string[];
    headline: string;
    portfolioLink: string;
    address: string;
};
const EditProfilePage = () => {


    const navigate = useNavigate();

    const { user, setUser } = userStore();

    const [formData, setFormData] = useState({
        username: user?.username || "",
        fullName: user?.fullName || "",
        email: user?.email || "",
        bio: user?.bio || "",
        profilePic: user?.profilePic || "",
        bannerImage: user?.bannerImage || "",
        skills: user?.skills || [],
        headline: user?.headline || "",
        portfolioLink: user?.portfolioLink || "",
        address: user?.address || ""
    });

    const bannerImageRef = useRef<HTMLInputElement>(null);
    const [bannerPreviewImage, setBannerPreviewImage] = useState<string | null>(user?.bannerImage ? user.bannerImage : null);
    const [previewProfileImage, setPreviewProfileImage] = useState<string | null>(user?.profilePic ? user.profilePic : null);

    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [bannerImage, setBannerImage] = useState<File | null>(null);

    const [skills, setSkills] = useState<string[]>(user?.skills || []);
    const [skill, setSkill] = useState("");

    const handleTag = () => {
        if (skill.trim() && !skills.includes(skill.trim())) {
            setSkills([...skills, skill.trim()]);
            setSkill("");
        } else {
            alert("Please enter a valid skill or remove duplicates.");
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            throw new Error("User not found");
        }
        // Here you would typically send the formData to your backend API to update the user profile
        // console.log("Form submitted with data:", formData);
        const profileImageUrl = await uploadImage(profileImage as File, `profilePic`, user)
        const bannerImageUrl = await uploadImage(bannerImage as File, `bannerImage`, user);

        // console.log("Profile Image URL:", profileImageUrl);
        // console.log("Banner Image URL:", bannerImageUrl);

        const requestData: FormDataState = {
            ...formData,
            skills: skills,
        }

        if (profileImageUrl) {
            requestData.profilePic = profileImageUrl;
        }

        if (bannerImageUrl) {
            requestData.bannerImage = bannerImageUrl;
        }


        const response = await axios.put(`${BACKEND_URL}/user/edit-profile`, requestData, {
            withCredentials: true
        });
        console.log(response.data.updatedUser);
        setUser(response.data.updatedUser);
        navigate('/profile');
    }

    return (
        <div className="text-white border-[1px] border-zinc-700 rounded-md p-3 pb-5 font-[Albert_Sans]">
            <div>
                <button onClick={() => navigate('/profile')} className="p-2 w-fit bg-zinc-900 rounded-md border-[1px] border-zinc-600 hover:bg-zinc-800 transition-all duration-300 cursor-pointer"><IoIosArrowBack /></button>
            </div>

            <div className="mt-5 flex flex-col gap-3">
                <div>
                    <h1 className="font-bold text-2xl tracking-tighter">Edit Profile</h1>
                </div>

                <div onClick={() => {
                    bannerImageRef.current?.click();
                }} className={`w-full h-62 bg-zinc-800/80 rounded-xl mt-2 flex flex-col gap-2 items-center justify-center hover:bg-zinc-900 cursor-pointer transition-all duration-300 border-2 border-zinc-600 ${bannerPreviewImage ? 'bg-cover bg-center opacity-90' : ''}`} style={{ backgroundImage: bannerPreviewImage ? `url(${bannerPreviewImage})` : 'none' }}>
                    <div className="bg-zinc-700/70 text-white flex flex-col items-center justify-center gap-2 p-3 rounded-md">
                        <Upload />
                        <h1 className="font-medium text-md tracking-tighter">Upload Banner Image</h1>
                    </div>
                    <input onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                            const preview = URL.createObjectURL(file);
                            setBannerPreviewImage(preview);
                            setBannerImage(file);
                            console.log(file)
                        }
                    }} ref={bannerImageRef} type="file" className="hidden" />
                </div>

                <div className="flex flex-col gap-2 mt-3">
                    <h1 className="text-lg font-bold tracking-tighter">Profile Pic</h1>
                    <div className="flex flex-col md:flex-row items-center gap-3">
                        <div className="w-20 h-20 bg-zinc-900 border-2 border-zinc-500 rounded-full">
                            {previewProfileImage && <img src={previewProfileImage} alt="Profile" className="w-full h-full rounded-full object-cover" />}
                        </div>
                        <div>
                            <input type="file" onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    const preview = URL.createObjectURL(file);
                                    setPreviewProfileImage(preview);
                                    setProfileImage(file);
                                    console.log(file)
                                }
                            }} className="bg-zinc-50 hover:bg-zinc-200 text-zinc-800 tracking-tighter rounded-md p-2 w-full cursor-pointer transition-all duration-300" />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-5 mt-3">
                    <div className="flex flex-col md:flex-row gap-3">

                        <div className="w-full flex flex-col gap-1">
                            <h1 className="text-lg font-bold tracking-tighter">Username</h1>
                            <input value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} type="text" placeholder="Enter your username" className="w-full bg-zinc-900/80 border-2 border-zinc-600 rounded-md p-2 text-white focus:outline-none focus:border-zinc-500 transition-all duration-300" />
                        </div>
                        <div className="w-full flex flex-col gap-1">
                            <h1 className="text-lg font-bold tracking-tighter">Full Name</h1>
                            <input value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} type="text" placeholder="Enter your fullname" className="w-full bg-zinc-900/80 border-2 border-zinc-600 rounded-md p-2 text-white focus:outline-none focus:border-zinc-500 transition-all duration-300" />
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-3">
                        <div className="w-full flex flex-col gap-1">
                            <h1 className="text-lg font-bold tracking-tighter">Email</h1>
                            <input value={formData.email} disabled type="email" placeholder="Enter your email" className="w-full bg-zinc-900/80 border-2 border-zinc-600 rounded-md p-2 text-white focus:outline-none focus:border-zinc-500 transition-all duration-300" />
                        </div>
                        <div className="w-full flex flex-col gap-1">
                            <h1 className="text-lg font-bold tracking-tighter">Headline</h1>
                            <input value={formData.headline} onChange={(e) => setFormData({ ...formData, headline: e.target.value })} type="text" placeholder="Enter your headline" className="w-full bg-zinc-900/80 border-2 border-zinc-600 rounded-md p-2 text-white focus:outline-none focus:border-zinc-500 transition-all duration-300" />
                        </div>
                    </div>
                    <div>
                        <h1 className="text-lg font-bold">Bio</h1>
                        <textarea value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} name="bio" id="bio" className="w-full border-2 border-zinc-600 rounded-md resize-none h-24 p-2 tracking-tight font-medium" placeholder="Enter about yourself.."></textarea>
                    </div>
                    <div>
                        <div className="flex flex-col md:flex-row gap-3">

                            <div className="w-full flex flex-col gap-1">
                                <h1 className="text-lg tracking-tight font-bold">Portfolio Link</h1>
                                <input value={formData.portfolioLink} onChange={(e) => setFormData({ ...formData, portfolioLink: e.target.value })} type="text" className="w-full bg-zinc-900/80 border-2 border-zinc-600 rounded-md p-2 text-white focus:outline-none focus:border-zinc-500 transition-all duration-300" placeholder="Url of your portfolio" />
                            </div>
                            <div className="w-full flex flex-col gap-1">
                                <h1 className="text-lg tracking-tight font-bold">Location</h1>
                                <input value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} type="text" className="w-full bg-zinc-900/80 border-2 border-zinc-600 rounded-md p-2 text-white focus:outline-none focus:border-zinc-500 transition-all duration-300" placeholder="NY New York" />
                            </div>
                        </div>

                    </div>

                    <div>
                        <h1 className="text-lg font-bold tracking-tighter">Skills</h1>
                        <div className="flex items-center gap-2 mt-2">
                            <input value={skill} onChange={(e) => setSkill(e.target.value)} type="text" placeholder="Enter your skills" className="w-full bg-zinc-900/80 border-2 border-zinc-600 rounded-md p-2 text-white focus:outline-none focus:border-zinc-500 transition-all duration-300" />
                            <button onClick={handleTag} className="p-2 bg-zinc-900 border-[1px] border-zinc-500 rounded-md hover:bg-zinc-800 transition-all duration-300 cursor-pointer"><Plus /></button>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-3">
                            {skills.map((skill, index) => (
                                <span key={index} className="bg-zinc-800 text-zinc-200 px-3 py-1 rounded-md flex items-center gap-2 text-sm font-medium">
                                    {skill}
                                    <button onClick={() => setSkills(skills.filter((_, i) => i !== index))} className="text-red-500 hover:text-red-700 transition-all duration-300">&times;</button>
                                </span>
                            ))}
                        </div>

                    </div>

                </div>

            </div>

            <button onClick={handleSubmit} className="bg-violet-600 font-bold text-white tracking-tight hover:bg-violet-700 p-2 w-full rounded-md mt-4 transition-all duration-300 cursor-pointer hover:-translate-y-0.5">Edit Profile</button>
        </div>
    )
}

export default EditProfilePage