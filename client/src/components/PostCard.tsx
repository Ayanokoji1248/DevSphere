
import { Heart, MessageCircle, Share } from "lucide-react";

import type { PostProp } from "../utils/interfaces";
import userStore from "../store/userStore";


const PostCard = ({ isMyPost, user, content, code, image, link, tags, likeCount, comments, deletePost, likeUpdate }: PostProp) => {
    const { user: currentUser } = userStore();

    return (
        <div className="w-full border-[1px] rounded-xl border-zinc-500 p-4 sm:p-5 flex flex-col sm:flex-row gap-3 sm:gap-5">
            {/* Avatar */}
            <div className="flex-shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-auto border-2 border-zinc-600">
                    <img src={user.profilePic} alt="profile pic" />
                </div>
            </div>

            {/* Content */}
            <div className="w-full font-[Albert_Sans] flex flex-col gap-2">
                {/* User Info */}
                <div className="flex flex-wrap items-center gap-2">
                    <h1 className="font-bold text-base sm:text-lg tracking-tighter">{user.fullName}</h1>
                    <p className="text-xs sm:text-sm tracking-tight font-medium text-zinc-400">@{user.username}</p>
                </div>

                {/* Post Content */}
                <p className="leading-tight text-sm sm:text-base">{content}</p>

                {/* Link */}
                {link && (
                    <div className="w-full p-2 bg-blue-900/60 rounded-md my-2 break-words">
                        <a className="font-medium text-blue-500 break-all" href={link} target="_blank">{link}</a>
                    </div>
                )}

                {/* Image */}
                {image && (
                    <div className="w-full max-h-[500px] overflow-hidden rounded-md my-2">
                        <img className="w-full object-cover rounded-xl" src={image} alt="" />
                    </div>
                )}

                {/* Code */}
                {code && (
                    <div className="bg-zinc-800 text-green-400 font-medium font-mono text-xs sm:text-sm p-2 rounded-md overflow-x-auto">
                        <p>{code}</p>
                    </div>
                )}

                {/* Tags */}
                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                        {tags.map((t, i) => (
                            <p key={i} className="bg-zinc-300 text-black px-3 py-1 font-medium text-xs sm:text-sm rounded-full">#{t}</p>
                        ))}
                    </div>
                )}

                {/* Actions */}
                <div className="mt-2 flex gap-4 flex-wrap">
                    <button
                        onClick={likeUpdate}
                        className="flex items-center text-xs sm:text-sm gap-1 hover:text-red-500 cursor-pointer transition-all duration-300"
                    >
                        <Heart size={18} /> {likeCount}
                    </button>
                    <div className="flex items-center text-xs sm:text-sm gap-1 hover:text-blue-500 cursor-pointer transition-all duration-300">
                        <MessageCircle size={18} /> {comments?.length}
                    </div>
                    <div className="flex items-center text-xs sm:text-sm gap-1 hover:text-green-500 cursor-pointer transition-all duration-300">
                        <Share size={18} /> 35
                    </div>
                </div>
                {
                    isMyPost && user._id === currentUser?._id &&
                    <div className="mt-2 flex">
                        <button onClick={deletePost} className="bg-red-500 p-2 py-1 rounded-md text-sm font-medium cursor-pointer">Delete</button>
                    </div>
                }
            </div>
        </div>
    );
};

export default PostCard;
