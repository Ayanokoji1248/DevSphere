import { useParams } from "react-router-dom"
import ChatWindow from "../components/ChatWindow"

const MessagingPage = () => {

    const { id } = useParams();

    return (
        <div className="text-white border-2 p-4 h-[70vh] sticky ">
            <ChatWindow />

            <h1 className="text-white">{id}</h1>
        </div>
    )
}

export default MessagingPage