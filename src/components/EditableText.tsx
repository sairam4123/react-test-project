import { useState } from "react";
import { twMerge } from "tailwind-merge";

type EditableTextProps = {
    text: string;
    strike?: boolean;
    children?: React.ReactNode;
    highlight?: string,
    className?: string,
    onTextChanged?: (text: string) => any;
};

export function EditableText({
    text,
    strike = false,
    className,
    onTextChanged,
    children,
    highlight
}: EditableTextProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [textState, setTextState] = useState(text);

    function handleDoubleClick(event: React.MouseEvent<HTMLInputElement>) {
        event.stopPropagation();
        setIsEditing(true);
    }

    function handleSubmit() {
        setIsEditing(false);
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            handleSubmit();
        } else if (event.key === "Escape") {
            handleSubmit();
        }
    }

    function handleClick(event: React.MouseEvent<HTMLInputElement>) {
        event.stopPropagation();
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setTextState(event.target.value);

        if (onTextChanged === undefined) return;
        onTextChanged(event.target.value);
    }

    if (isEditing) {
        return (
            <div className={twMerge("w-full min-w-fit select-none", className)}>
                <input
                    type="text"
                    onBlur={handleSubmit}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    value={textState}
                    autoFocus={true}
                    className={twMerge(
                        `min-w-fit w-full max-w-lg bg-inherit rounded-lg pl-1 mx-1 pr-5 ${
                            strike && "line-through"
                        }`,
                        className
                    )}
                />
            </div>
        );
    } else {
        return (
            <div className={twMerge("w-full min-w-fit select-none", className)}>
                <span
                    className={twMerge(
                        `select-none cursor-text pl-1 mx-1 pr-5 ${
                            strike && "line-through"
                        }`,
                        className
                    )}
                    onClick={handleDoubleClick}>
                    {textState}
                </span>
                {children}
            </div>
        );
    }
}
