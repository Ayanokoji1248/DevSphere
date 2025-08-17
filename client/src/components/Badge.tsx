import type { ReactNode } from "react"

interface BadgeProp {
    text: string,
    onClick?: () => void
    deleteIcon?: ReactNode;
}

const Badge = ({ text, deleteIcon, onClick }: BadgeProp) => {
    return (
        <span className="w-fit bg-zinc-800 text-zinc-200 px-3 py-1 rounded-md flex items-center gap-2 text-sm font-medium">
            <p>{text}</p>
            {deleteIcon && <button onClick={onClick} className="text-red-500 flex items-center justify-center cursor-pointer">
                {deleteIcon}</button>}</span>
    )
}

export default Badge