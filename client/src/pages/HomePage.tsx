import { Heart, MessageCircle, Share } from "lucide-react"


const HomePage = () => {
    return (
        <div className='w-full min-h-screen'>
            <div className='border-2 rounded-xl text-white'>
                <div className='p-5 flex gap-5'>
                    <div className=''>
                        <div className='w-12 h-12 flex shrink-0 bg-zinc-300 rounded-full'></div>
                    </div>
                    <div className='w-full'>
                        <textarea name="content" id="content" className='w-full h-22 border-2 rounded-xl resize-none p-3 text-sm font-[Albert_Sans] font-medium' placeholder="Share your latest project, code snippet, or developer insight..."></textarea>

                        <div className='flex justify-between items-center p-2'>
                            <div className='flex gap-5'>
                                <button className='text-sm font-[Albert_Sans] font-medium px-4 py-2 rounded-md border-2'>Code</button>
                                <button className='text-sm font-[Albert_Sans] font-medium px-4 py-2 rounded-md border-2'>Media</button>
                                <button className='text-sm font-[Albert_Sans] font-medium px-4 py-2 rounded-md border-2'>Link</button>
                            </div>
                            <button className='bg-white text-black px-6 py-2 text-lg font-medium rounded-md'>Post</button>
                        </div>
                    </div>
                </div>
            </div>


            <div id="posts" className="mt-8 flex flex-col gap-5 text-white">
                <div id="post" className="w-full border-[1px] rounded-xl border-zinc-500 p-5 py-6 flex gap-5">
                    <div>
                        <div className="w-10 h-10 bg-zinc-300 rounded-full"></div>
                    </div>
                    <div className="w-full font-[Albert_Sans] flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                            <h1 className="font-bold text-lg tracking-tighter">Krish Prajapati</h1>
                            <p className="text-sm tracking-tight font-medium text-zinc-400">@krishdev</p>
                        </div>
                        <div>
                            <p className="leading-tight">Just shipped a new React component library with TypeScript! The developer experience is incredible with proper type safety. Check out the demo below 🚀</p>
                        </div>

                        <div className="w-full overflow-auto rounded-md">
                            <img className="w-full h-[500px] object-fill object-center rounded-xl " src="https://plus.unsplash.com/premium_photo-1750041453770-ca6d200405a4?q=80&w=698&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                        </div>
                        <div className="bg-zinc-800 text-green-400 font-medium font-mono p-2 rounded-md">
                            <p>print("hello world")</p>
                        </div>

                        <div id="tag" className="flex gap-3 mt-2">
                            <p className="bg-zinc-300 text-black px-2.5 py-1 font-medium text-sm rounded-full text-md">#React</p>
                            <p className="bg-zinc-300 text-black px-2.5 py-1 font-medium text-sm rounded-full text-md">#React</p>
                            <p className="bg-zinc-300 text-black px-2.5 py-1 font-medium text-sm rounded-full text-md">#React</p>
                        </div>

                        <div className="mt-2 flex gap-5">
                            <div className="flex items-center text-sm gap-1 hover:text-red-500 cursor-pointer transition-all duration-300"><Heart size={18} /> 35</div>
                            <div className="flex items-center text-sm gap-1 hover:text-blue-500 cursor-pointer transition-all duration-300"><MessageCircle size={18} /> 35</div>
                            <div className="flex items-center text-sm gap-1 hover:text-green-500 cursor-pointer transition-all duration-300"><Share size={18} /> 35</div>
                        </div>
                    </div>
                </div>
                <div id="post" className="w-full border-2 p-5 flex gap-5">
                    <div>
                        <div className="w-10 h-10 bg-zinc-300 rounded-full"></div>
                    </div>
                    <div className="w-full font-[Albert_Sans] flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                            <h1 className="font-bold text-lg tracking-tighter">Krish Prajapati</h1>
                            <p className="text-sm tracking-tight font-medium text-zinc-400">@krishdev</p>
                        </div>
                        <div>
                            <p className="leading-tight">Just shipped a new React component library with TypeScript! The developer experience is incredible with proper type safety. Check out the demo below 🚀</p>
                        </div>

                        <div className="w-full overflow-auto rounded-md">
                            <img className="w-full h-[500px] object-fill object-center rounded-xl " src="https://plus.unsplash.com/premium_photo-1750041453770-ca6d200405a4?q=80&w=698&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                        </div>
                        <div className="bg-black text-green-400 font-medium font-mono p-2 rounded-md">
                            <p>print("hello world")</p>
                        </div>

                        <div id="tag" className="flex gap-3 mt-2">
                            <p className="bg-zinc-300 text-black px-2.5 py-1 font-medium text-sm rounded-full text-md">#React</p>
                            <p className="bg-zinc-300 text-black px-2.5 py-1 font-medium text-sm rounded-full text-md">#React</p>
                            <p className="bg-zinc-300 text-black px-2.5 py-1 font-medium text-sm rounded-full text-md">#React</p>
                        </div>

                        <div className="mt-2 flex gap-5">
                            <div className="flex items-center text-sm gap-1 hover:text-red-500 cursor-pointer transition-all duration-300"><Heart size={18} /> 35</div>
                            <div className="flex items-center text-sm gap-1 hover:text-blue-500 cursor-pointer transition-all duration-300"><MessageCircle size={18} /> 35</div>
                            <div className="flex items-center text-sm gap-1 hover:text-green-500 cursor-pointer transition-all duration-300"><Share size={18} /> 35</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default HomePage