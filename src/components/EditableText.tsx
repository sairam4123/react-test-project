import { useState } from "react";

export function EditableText({
    text,
    strike,
    onTextChanged,
    children,
}: {
    text: string;
    strike: boolean;
    onTextChanged: (text: string) => any;
    children?: React.ReactNode;
}) {
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
        onTextChanged(event.target.value);
    }

    if (isEditing) {
        return (
            <input
                type="text"
                onBlur={handleSubmit}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                value={textState}
                autoFocus={true}
                className={`min-w-fit bg-inherit rounded-lg w-full pl-1 mx-1 ${
                    strike && "line-through"
                }`}
            />
        );
    } else {
        return (
            <div className="w-full min-w-fit select-none">
                <span
                    className={`select-none cursor-text pl-1 mx-1 pr-5 ${
                        strike && "line-through"
                    }`}
                    onClick={handleClick}
                    onDoubleClick={handleDoubleClick}>
                    {textState}
                    {children}
                </span>
            </div>
        );
    }
}
