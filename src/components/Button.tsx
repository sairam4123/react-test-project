import { twMerge } from "tailwind-merge";
import { ButtonHTMLAttributes } from "react";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    buttonStyle: "primary" | "secondary" | "error" | "success";
    children?: React.ReactNode;
    className?: string;
    onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => any;
}

// use tailwind-merge here, probably cva package too
// best would be to use radix-ui or shadcn-ui
export function Button({
    buttonStyle,
    className,
    children,
    onClick,
    ...buttonProps
}: IButton) {
    return (
        <button
            type="button"
            className={twMerge(
                `rounded-md focus:outline-none focus:ring ${
                    buttonStyle == "primary" &&
                    "bg-blue-800 hover:bg-blue-600 active:bg-blue-700 focus:ring-blue-300"
                } ${
                    buttonStyle == "secondary" &&
                    "bg-stone-800 hover:bg-stone-600 active:bg-stone-700 focus:ring-stone-300"
                } ${
                    buttonStyle == "error" &&
                    "bg-red-800 hover:bg-red-600 active:bg-red-700 focus:ring-red-300"
                } ${
                    buttonStyle == "success" &&
                    "bg-green-800 hover:bg-green-600 active:bg-green-700 focus:ring-green-300"
                }`,

                className
            )}
            onClick={onClick}
            {...buttonProps}>
            {children}
        </button>
    );
}
