import type { FormEvent, ReactNode } from "react"

interface ButtonProp {
    text: string,
    variant: "primary" | //purple
    "secondary" | //white
    "info" | //blue
    "danger" | //danger
    "green" |
    "black" |
    "gradient" |
    "outline",
    size: "sm" | "md" | "lg",
    type?: "submit" | "reset" | "button",
    widthFull?: boolean,
    disabled?: boolean,
    className?: string,
    onClick?: (e: FormEvent) => void,
    leftIcon?: ReactNode
}

const variantStyle = {
    primary: "bg-violet-600 hover:bg-violet-700",
    secondary: "bg-white hover:bg-zinc-200 text-black",
    info: "bg-blue-500 hover:bg-blue-600",
    green: "bg-[#00FF9C] hover:bg-[#60f0bbea] rounded-md",
    danger: "bg-red-500 hover:bg-red-600",
    gradient: "bg-purple",
    outline: "border-2 rounded-md",
    black: "bg-zinc-950 border-[1px] border-zinc-600 px-4 py-2 rounded-md hover:bg-zinc-900 transition flex items-center gap-2 font-semibold text-sm"
}

const sizeStyle = {
    sm: "py-1 px-2",
    md: "p-2",
    lg: "p-2 py-2.5",
}

const Button = ({ variant, text, size, widthFull, className, onClick, leftIcon, type, disabled }: ButtonProp) => {
    return (
        <button disabled={disabled} type={type} onClick={onClick} className={`${variantStyle[variant]} ${sizeStyle[size]} ${className} ${widthFull ? "w-full" : "w-fit"} 
        cursor-pointer transition-all duration-300 hover:-translate-y-0.5 font-[Albert_Sans] tracking-tight`}>{leftIcon && leftIcon}{text}</button>
    )
}

export default Button