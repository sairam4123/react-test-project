import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

type EditableTextProps = {
    text: string;
    strike?: boolean;
    children?: React.ReactNode;
    highlight?: string;
    parentClassName?: string;
    className?: string;
    defaultText?: string;
    onTextChanged?: (text: string) => any;
};

export function EditableText({
    text,
    strike = false,
    className,
    parentClassName,
    onTextChanged,
    children,
    defaultText,
    highlight,
}: EditableTextProps) {
    const [textState, setTextState] = useState(text);
    const [prevTextState, setPrevTextState] = useState(text);
    const [isEditing, setIsEditing] = useState(false);

    const spanRef = useRef<HTMLSpanElement | null>(null);

    function setText(currentText: string) {
        setTextState(currentText);
        onTextChanged?.(currentText);
        setIsEditing(false);
    }

    function handleSubmit() {
        const currentText = textState || (defaultText ?? "");
        setText(currentText);
    }

    function handleEscape() {
        const currentText = prevTextState || (defaultText ?? "");
        setText(currentText);
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLSpanElement>) {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSubmit();
        } else if (event.key === "Escape") {
            event.preventDefault();
            handleEscape();
        }
    }

    function handleClick(event: React.MouseEvent<HTMLSpanElement>) {
        event.preventDefault();
        event.stopPropagation();
        setPrevTextState(textState);
        setIsEditing(true);
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();

        const currentText = event.target.value ?? textState;
        setTextState(currentText);

        onTextChanged?.(currentText);
    }

    useEffect(() => {
        setTextState(text);
    }, [text]);

    return (
        <div
            className={twMerge(
                "w-full max-w-lg min-w-fit select-none",
                parentClassName
            )}>
            {isEditing && (
                <input
                    type="text"
                    onBlur={handleSubmit}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    value={textState}
                    autoFocus={true}
                    className={twMerge(
                        `max-w-lg bg-inherit rounded-lg px-4 mx-1 ${
                            strike && "line-through text-gray-500"
                        }`,

                        className
                    )}
                    style={{
                        width:
                            (spanRef.current?.offsetWidth ?? 0) +
                            24 /* +24 px */,
                    }}
                />
            )}
            <span
                className={twMerge(
                    `select-none cursor-text mx-1 content-editable:focus:rounded-lg ${
                        strike && "line-through text-zinc-400 "
                    }`,
                    `${isEditing && "absolute opacity-0 whitespace-pre"}`,
                    className
                )}
                ref={spanRef}
                onClick={handleClick}>
                {textState}
            </span>
            {children}
            {false && highlight}
        </div>
    );
}
