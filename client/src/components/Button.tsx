import type { FormEvent, ReactNode } from "react"

interface ButtonProp {
    text: string,
    variant: "primary" | //purple
    "secondary" | //white
    "info" | //blue
    "danger" | //danger
    "green" |
    "gradient" |
    "outline",
    size: "sm" | "md" | "lg",
    widthFull?: boolean,
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
}

const sizeStyle = {
    sm: "py-1 px-2",
    md: "p-2",
    lg: "p-2 py-2.5",
}

const Button = ({ variant, text, size, widthFull, className, onClick, leftIcon }: ButtonProp) => {
    return (
        <button onClick={onClick} className={`${variantStyle[variant]} ${sizeStyle[size]} ${className} ${widthFull ? "w-full" : "w-fit"} 
        cursor-pointer transition-all duration-300 hover:-translate-y-0.5 font-[Albert_Sans] tracking-tight`}>{leftIcon && leftIcon}{text}</button>
    )
}

export default Button