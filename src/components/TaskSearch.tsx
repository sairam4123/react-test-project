import { useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import { Icon } from "./Icon";

interface TaskSearchProps {
    className?: string;
    search: string;
    setSearchText: (text: string) => void;
}

export function TaskSearch({
    search,
    setSearchText,
    className,
}: TaskSearchProps) {
    const inputRef = useRef<HTMLInputElement | null>(null);

    function handleSearchChanged(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchText(event.target.value);
    }

    return (
        <div className="flex max-w-lg w-full min-w-fit my-2">
            <div className="flex items-center max-w-lg max-h-full h-full w-full rounded-lg p-2 bg-slate-800 text-white enabled::bg-slate-900 focus-within:outline focus-within:outline-2">
                <button onClick={() => inputRef.current?.focus()}>
                    <Icon className="flex m-1 mr-2 justify-center w-4 h-4 text-white">
                        <FaSearch />
                    </Icon>
                </button>
                <input
                    type="search"
                    placeholder="Find or create a task..."
                    className={twMerge(
                        "flex max-w-lg max-h-full h-full w-full rounded-lg pl-1 placeholder:italic bg-transparent outline-none my-1",
                        className
                    )}
                    value={search}
                    onChange={handleSearchChanged}
                    ref={inputRef}
                />
            </div>
        </div>
    );
}
