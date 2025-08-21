import ChatBubble from "./ChatBubble"

const ChatWindow = () => {
    return (
        <div className="w-full p-3 py-5 h-[550px] overflow-y-scroll flex flex-col gap-10 scrollbar-thumb-none scrollbar-track-rounded-full scrollbar scrollbar-thumb-neutral-800/80 " >
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