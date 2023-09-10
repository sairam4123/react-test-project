import { useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import { Icon } from "./Icon";

interface SearchBarProps {
    className?: string;
    search: string;
    onEnterText?: () => void;
    setSearchText: (text: string) => void;
}

export function SearchBar({
    search,
    setSearchText,
    onEnterText,
    className,
}: SearchBarProps) {
    const inputRef = useRef<HTMLInputElement | null>(null);

    function handleSearchChanged(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchText(event.target.value);
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            event.preventDefault();
            onEnterText?.();
        } else if (event.key === "Escape") {
            event.preventDefault();
            setSearchText("");
            inputRef.current?.blur();
        }
    }
    return (
        <div className="flex max-w-lg w-full min-w-fit my-2">
            <div
                className="flex items-center cursor-text max-w-lg max-h-full h-full w-full rounded-lg p-2 bg-slate-800 text-white enabled::bg-slate-900 focus-within:outline focus-within:outline-2"
                onClick={() => inputRef.current?.focus()}>
                <button
                    onClick={() => inputRef.current?.focus()}
                    onFocus={() => inputRef.current?.focus()}
                    className="cursor-text focus:outline-none">
                    <Icon className="scale-x-[-1] flex m-1 mr-2 justify-center w-4 h-4 text-white/60">
                        <FaSearch />
                    </Icon>
                </button>
                <input
                    type="search"
                    placeholder="Find or add a task..."
                    className={twMerge(
                        "flex max-w-lg max-h-full h-full w-full rounded-lg pl-1 placeholder:italic bg-transparent outline-none my-1",
                        className
                    )}
                    value={search}
                    onChange={handleSearchChanged}
                    ref={inputRef}
                    onKeyDown={handleKeyDown}
                />
            </div>
        </div>
    );
}
