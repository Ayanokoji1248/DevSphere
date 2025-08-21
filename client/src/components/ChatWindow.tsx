import ChatBubble from "./ChatBubble"

const ChatWindow = () => {
    return (
        <div className="w-full p-3 py-5 h-[550px] overflow-y-scroll flex flex-col gap-8 scrollbar-thumb-none scrollbar-track-rounded-full scrollbar scrollbar-thumb-zinc-800 " >
            <ChatBubble />
            <ChatBubble />
            <ChatBubble />
            <ChatBubble />
            <ChatBubble />
            <ChatBubble />
            <ChatBubble />
            <ChatBubble />
        </div>
    )
}

export default ChatWindow