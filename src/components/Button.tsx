interface IButton {
    style: "primary" | "secondary" | "error" | "success";
    children?: React.ReactNode;
    className?: string;
    onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => any;
}

// use tailwind-merge here, probably cva package too
// best would be to use radix-ui or shadcn-ui
export function Button({ style, className, children, onClick }: IButton) {
    return (
        <button
            type="button"
            className={`${
                style == "primary" && "bg-blue-800 hover:bg-blue-600"
            } ${style == "secondary" && "bg-zinc-800 hover:bg-zinc-600"} ${
                style == "error" && "bg-red-800 hover:bg-red-600"
            } ${
                style == "success" && "bg-green-800 hover:bg-green-600"
            } ${className} rounded-md`}
            onClick={onClick}>
            {children}
        </button>
    );
}
