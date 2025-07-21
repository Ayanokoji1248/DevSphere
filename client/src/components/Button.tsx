interface ButtonProp {
    text: string,
    variant: "primary" | //purple
    "secondary" | //white
    "info" | //blue
    "danger" | //danger
    "gradient" |
    "outline",
    size: "sm" | "md" | "lg",
    widthFull?: boolean,
    className?: string,
    onClick?: () => void
}

const variantStyle = {
    primary: "bg-purple",
    secondary: "bg-purple",
    info: "bg-purple",
    danger: "bg-purple",
    gradient: "bg-purple",
    outline: "bg-purple",
}

const sizeStyle = {
    sm: "",
    md: "",
    lg: "",
}

const Button = ({ variant, text, size, widthFull, className, onClick }: ButtonProp) => {
    return (
        <button onClick={onClick} className={`${variantStyle[variant]} ${sizeStyle[size]} ${className} ${widthFull && "w-full"}`}>{text}</button>
    )
}

export default Button