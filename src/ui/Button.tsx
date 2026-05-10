import type { ButtonHTMLAttributes, ReactNode } from "react";

interface  ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: "primary" | "danger" | "success";
    size: "sm" | "md" | "lg";
    cursor?:"pointer" | "default" | "move",
}

export function Button ({
    children,
    variant = "primary",
    size = "md",
    cursor = "pointer",
    className= "",
    ...props
}: ButtonProps) {
const cursore = {
   pointer: "cursor-pointer",
   default: "cursor-default",
   move: "cursor-move",
}
 const variants = {
    primary: "bg-blue-500 hover: bg-blue-600 text-white",
    danger: "bg-red-500 hover:bg-red-600 text-white",
    success: "bg-green-500 hover:bg-green-600 text-white",
 };
 const sizes = {
    sm: "px-0.1 py-0.3 test-sm",
    md: "px-2 py-1 test-base",
    lg: "px-6 py-3 text-lg",
 };
 const baseStyles = "rounded forn-medium transition-colors duration-200 focus:outline-none";
 const finalClassName = `${baseStyles}  ${cursore[cursor]} ${variants[variant]} ${sizes[size]}  ${className}`;
 return (
    <button className={finalClassName} {...props}>{children}</button>
 )
}