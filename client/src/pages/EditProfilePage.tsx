import { ArrowLeft, Plus, Upload, X } from "lucide-react"
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../utils";
import { uploadImage } from "../utils/uploadImage";
import axios from "axios";
import userStore from "../store/userStore";
import Button from "../components/Button";
import Badge from "../components/Badge";
import { useLoadingStore } from "../store/loadingStore";
import Loader from "../components/Loader";
import { userProfile } from "../schemas/profile.schema";

type FormDataState = {
    username: string;
    fullName: string;
    email: string;
    bio: string;
    profilePic: string;
    bannerImage: string;
    skills: string[];
    headline: string;
    portfolioLink?: string;
    location?: string;
};

const EditProfilePage = () => {
    const { loading, setLoading } = useLoadingStore();
    const navigate = useNavigate();
    const { user, setUser } = userStore();

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const [formData, setFormData] = useState<FormDataState>({
        username: user?.username || "",
        fullName: user?.fullName || "",
        email: user?.email || "",
        bio: user?.bio || "",
        profilePic: user?.profilePic || "",
        bannerImage: user?.bannerImage || "",
        skills: user?.skills || [],
        headline: user?.headline || "",
        portfolioLink: user?.portfolioLink || "",
        location: user?.address || "",
    });

    const bannerImageRef = useRef<HTMLInputElement>(null);
    const [bannerPreviewImage, setBannerPreviewImage] = useState<string | null>(
        user?.bannerImage || null
    );
    const [previewProfileImage, setPreviewProfileImage] = useState<string | null>(
        user?.profilePic || null
    );

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
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // validate with Zod
        const result = userProfile.safeParse({ ...formData, skills });

        if (!result.success) {
            const formattedErrors: { [key: string]: string } = {};
            result.error.issues.forEach((err) => {
                if (err.path[0]) {
                    formattedErrors[err.path[0] as string] = err.message;
                }
            });
            setErrors(formattedErrors);
            console.log(result.data)
            return;
        } else {
            setErrors({});
            console.log(result.data)
        }

        setErrors({});
        setLoading(true);

        if (!user) {
            throw new Error("User not found");
        }

        const profileImageUrl = profileImage
            ? await uploadImage(profileImage, `profilePic`, user)
            : null;
        const bannerImageUrl = bannerImage
            ? await uploadImage(bannerImage, `bannerImage`, user)
            : null;

        const requestData: FormDataState = {
            ...formData,
            skills,
        };

        if (profileImageUrl) {
            requestData.profilePic = profileImageUrl;
        }
        if (bannerImageUrl) {
            requestData.bannerImage = bannerImageUrl;
        }

        try {
            const response = await axios.put(
                `${BACKEND_URL}/user/edit-profile`,
                requestData,
                { withCredentials: true }
            );
            setUser(response.data.updatedUser);
            navigate("/profile");
        } catch (error) {
            console.log(error);
            navigate("/profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="text-white rounded-md p-3 pb-5 font-[Albert_Sans]">
            <div>
                <Button
                    text="Back"
                    variant="black"
                    size="sm"
                    leftIcon={<ArrowLeft size={18} />}
                    onClick={() => navigate("/profile")}
                />
            </div>

            <div className="mt-5 flex flex-col gap-3">
                {loading && (
                    <div className="absolute z-30 w-full min-h-[140vh] flex justify-center items-center bg-zinc-700/50">
                        <Loader />
                    </div>
                )}
                <div>
                    <h1 className="font-bold text-2xl tracking-tighter">Edit Profile</h1>
                </div>

                {/* Banner Image */}
                <div
                    onClick={() => bannerImageRef.current?.click()}
                    className={`w-full h-62 bg-zinc-800/80 rounded-xl mt-2 flex flex-col gap-2 items-center justify-center hover:bg-zinc-900 cursor-pointer transition-all duration-300 border-2 border-zinc-600 ${bannerPreviewImage ? "bg-cover bg-center opacity-90" : ""
                        }`}
                    style={{
                        backgroundImage: bannerPreviewImage
                            ? `url(${bannerPreviewImage})`
                            : "none",
                    }}
                >
                    <div className="bg-zinc-700/70 text-white flex flex-col items-center justify-center gap-2 p-3 rounded-md">
                        <Upload />
                        <h1 className="font-medium text-md tracking-tighter">
                            Upload Banner Image
                        </h1>
                    </div>
                    <input
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                const preview = URL.createObjectURL(file);
                                setBannerPreviewImage(preview);
                                setBannerImage(file);
                            }
                        }}
                        ref={bannerImageRef}
                        type="file"
                        className="hidden"
                    />
                </div>

                {/* Profile Pic */}
                <div className="flex flex-col gap-2 mt-3">
                    <h1 className="text-lg font-bold tracking-tighter">Profile Pic</h1>
                    <div className="flex flex-col md:flex-row items-center gap-3">
                        <div className="w-20 h-20 bg-zinc-900 border-2 border-zinc-500 rounded-full">
                            {previewProfileImage && (
                                <img
                                    src={previewProfileImage}
                                    alt="Profile"
                                    className="w-full h-full rounded-full object-cover"
                                />
                            )}
                        </div>
                        <div>
                            <input
                                type="file"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        const preview = URL.createObjectURL(file);
                                        setPreviewProfileImage(preview);
                                        setProfileImage(file);
                                    }
                                }}
                                className="bg-zinc-50 hover:bg-zinc-200 text-zinc-800 tracking-tighter rounded-md p-2 w-full cursor-pointer transition-all duration-300"
                            />
                        </div>
                    </div>
                </div>

                {/* Form fields */}
                <div className="flex flex-col gap-5 mt-3">
                    <div className="flex flex-col md:flex-row gap-3">
                        <div className="w-full flex flex-col gap-1">
                            <h1 className="text-lg font-bold tracking-tighter">Username</h1>
                            <input
                                value={formData.username}
                                onChange={(e) =>
                                    setFormData({ ...formData, username: e.target.value })
                                }
                                type="text"
                                placeholder="Enter your username"
                                className="w-full bg-zinc-900/80 border-2 border-zinc-600 rounded-md p-2 text-white focus:outline-none focus:border-zinc-500 transition-all duration-300"
                            />
                            {errors.username && (
                                <p className="text-red-500 text-sm">{errors.username}</p>
                            )}
                        </div>
                        <div className="w-full flex flex-col gap-1">
                            <h1 className="text-lg font-bold tracking-tighter">Full Name</h1>
                            <input
                                value={formData.fullName}
                                onChange={(e) =>
                                    setFormData({ ...formData, fullName: e.target.value })
                                }
                                type="text"
                                placeholder="Enter your fullname"
                                className="w-full bg-zinc-900/80 border-2 border-zinc-600 rounded-md p-2 text-white focus:outline-none focus:border-zinc-500 transition-all duration-300"
                            />
                            {errors.fullName && (
                                <p className="text-red-500 text-sm">{errors.fullName}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-3">
                        <div className="w-full flex flex-col gap-1">
                            <h1 className="text-lg font-bold tracking-tighter">Email</h1>
                            <input
                                value={formData.email}
                                disabled
                                type="email"
                                placeholder="Enter your email"
                                className="w-full bg-zinc-900/80 border-2 border-zinc-600 rounded-md p-2 text-white focus:outline-none focus:border-zinc-500 transition-all duration-300"
                            />
                        </div>
                        <div className="w-full flex flex-col gap-1">
                            <h1 className="text-lg font-bold tracking-tighter">Headline</h1>
                            <input
                                value={formData.headline}
                                onChange={(e) =>
                                    setFormData({ ...formData, headline: e.target.value })
                                }
                                type="text"
                                placeholder="Enter your headline"
                                className="w-full bg-zinc-900/80 border-2 border-zinc-600 rounded-md p-2 text-white focus:outline-none focus:border-zinc-500 transition-all duration-300"
                            />
                            {errors.headline && (
                                <p className="text-red-500 text-sm">{errors.headline}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <h1 className="text-lg font-bold">Bio</h1>
                        <textarea
                            value={formData.bio}
                            onChange={(e) =>
                                setFormData({ ...formData, bio: e.target.value })
                            }
                            name="bio"
                            id="bio"
                            className="w-full border-2 border-zinc-600 rounded-md resize-none h-24 p-2 tracking-tight font-medium"
                            placeholder="Enter about yourself.."
                        ></textarea>
                        {errors.bio && <p className="text-red-500 text-sm">{errors.bio}</p>}
                    </div>

                    <div className="flex flex-col md:flex-row gap-3">
                        <div className="w-full flex flex-col gap-1">
                            <h1 className="text-lg tracking-tight font-bold">
                                Portfolio Link
                            </h1>
                            <input
                                value={formData.portfolioLink}
                                onChange={(e) =>
                                    setFormData({ ...formData, portfolioLink: e.target.value })
                                }
                                type="text"
                                className="w-full bg-zinc-900/80 border-2 border-zinc-600 rounded-md p-2 text-white focus:outline-none focus:border-zinc-500 transition-all duration-300"
                                placeholder="Url of your portfolio"
                            />
                            {errors.portfolioLink && (
                                <p className="text-red-500 text-sm">{errors.portfolioLink}</p>
                            )}
                        </div>
                        <div className="w-full flex flex-col gap-1">
                            <h1 className="text-lg tracking-tight font-bold">Location</h1>
                            <input
                                value={formData.location}
                                onChange={(e) =>
                                    setFormData({ ...formData, location: e.target.value })
                                }
                                type="text"
                                className="w-full bg-zinc-900/80 border-2 border-zinc-600 rounded-md p-2 text-white focus:outline-none focus:border-zinc-500 transition-all duration-300"
                                placeholder="NY New York"
                            />
                            {errors.location && (
                                <p className="text-red-500 text-sm">{errors.location}</p>
                            )}
                        </div>
                    </div>

                    {/* Skills */}
                    <div>
                        <h1 className="text-lg font-bold tracking-tighter">Skills</h1>
                        <div className="flex items-center gap-2 mt-2">
                            <input
                                value={skill}
                                onChange={(e) => setSkill(e.target.value)}
                                type="text"
                                placeholder="Enter your skills"
                                className="w-full bg-zinc-900/80 border-2 border-zinc-600 rounded-md p-2 text-white focus:outline-none focus:border-zinc-500 transition-all duration-300"
                            />
                            <button
                                onClick={handleTag}
                                className="p-2 bg-zinc-900 border-[1px] border-zinc-500 rounded-md hover:bg-zinc-800 transition-all duration-300 cursor-pointer"
                            >
                                <Plus />
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-3">
                            {skills.map((skill, index) => (
                                <Badge
                                    key={index}
                                    text={skill}
                                    onClick={() =>
                                        setSkills(skills.filter((_, i) => i !== index))
                                    }
                                    deleteIcon={<X size={15} />}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <Button
                onClick={(e) => handleSubmit(e as React.FormEvent)}
                variant="primary"
                size="md"
                text="Edit Profile"
                widthFull={true}
                className="rounded-md font-bold tracking-tight mt-4"
                disabled={loading}
            />
        </div>
    );
};

export default EditProfilePage;
