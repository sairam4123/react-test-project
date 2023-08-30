import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

type EditableTextProps = {
    text: string;
    strike?: boolean;
    children?: React.ReactNode;
    highlight?: string;
    parentClassName?: string;
    className?: string;
    onTextChanged?: (text: string) => any;
};

export function EditableText({
    text,
    strike = false,
    className,
    parentClassName,
    onTextChanged,
    children,
    highlight,
}: EditableTextProps) {
    const [textState, setTextState] = useState(text);

    const spanRef = useRef<HTMLSpanElement | null>(null);
    // function handleDoubleClick(event: React.MouseEvent<HTMLInputElement>) {
    //     event.preventDefault();
    //     event.stopPropagation();
    //     setIsEditing(true);
    // }

    function handleSubmit() {
        spanRef.current?.setAttribute("contentEditable", `${false}`);
        spanRef.current?.blur();
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSubmit();
        } else if (event.key === "Escape") {
            event.preventDefault();
            handleSubmit();
        }
    }

    function handleClick(event: React.MouseEvent<HTMLInputElement>) {
        event.preventDefault();
        spanRef.current?.focus();
        spanRef.current?.setAttribute("contentEditable", `${true}`)
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();

        setTextState(event.target.value);

        if (onTextChanged === undefined) return;
        onTextChanged(event.target.value);
    }

    // if (isEditing) {
    //     return (
    //         <div
    //             className={twMerge(
    //                 "w-full min-w-fit select-none",
    //                 parentClassName
    //             )}>
    //             <input
    //                 type="text"
    //                 onBlur={handleSubmit}
    //                 onChange={handleChange}
    //                 onKeyDown={handleKeyDown}
    //                 value={textState}
    //                 autoFocus={true}
    //                 className={twMerge(
    //                     `min-w-fit w-full max-w-lg bg-inherit rounded-lg mx-1 ${
    //                         strike && "line-through text-gray-500"
    //                     }`,
    //                     className
    //                 )}
    //             />
    //         </div>
    //     );
    // } else {
    return (
        <div
            className={twMerge(
                "w-full max-w-lg min-w-fit select-none",
                parentClassName
            )}>
            <span
                className={twMerge(
                    `select-none cursor-text mx-1 content-editable:focus:rounded-lg ${
                        strike && "line-through text-slate-400 "
                    }`,
                    className
                )}
                ref={spanRef}
                onKeyDown={handleKeyDown}
                onChange={handleChange}
                onClick={handleClick}
                contentEditable={false}>
                {textState}
            </span>
            {children}
            {false && highlight}
        </div>
    );
    // }
}
