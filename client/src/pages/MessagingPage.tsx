// import { useParams } from "react-router-dom"
import ChatWindow from "../components/ChatWindow"

const MessagingPage = () => {


    return (
        <div className="text-white w-full border-2 border-zinc-500 rounded-xl overflow-auto shadow-[2px_2px_20px_0px] shadow-zinc-700 h-[80vh] relative p-2 flex flex-col">

            <ChatWindow />

            <form className="flex w-full">
                <input className="w-full border-[1px] border-zinc-500 font-medium text-md p-3 outline-none rounded-l-md" type="text" />
                <button className="bg-violet-800 rounded-r-md px-4 tracking-tight font-medium">Submit</button>
            </form>

        </div>
    )
}

export default MessagingPage