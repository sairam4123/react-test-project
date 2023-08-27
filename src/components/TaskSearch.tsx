import { useState } from "react";
import { IconContext } from "react-icons";
import { FaSearch } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

interface TaskSearchProps {
    className?: string;
    onSearch: (searchText: string) => any;
}

export function TaskSearch({ onSearch, className }: TaskSearchProps) {
    const [searchText, setSearchText] = useState("");

    function handleSearchChanged(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchText(event.target.value);
        onSearch(event.target.value);
    }

    return (
        <div className="flex max-w-lg w-full min-w-fit my-2">
            <div className="flex max-w-lg max-h-full h-full w-full rounded-lg p-2 bg-slate-800 text-white enabled::bg-slate-900 focus-within:outline focus-within:outline-2">
                <IconContext.Provider
                    value={{ className: "flex m-1 items-center w-4 h-4 text-white" }}>
                    <FaSearch />
                </IconContext.Provider>
                <input
                    type="search"
                    placeholder="Find or create a task..."
                    className={twMerge(
                        "flex max-w-lg max-h-full h-full w-full rounded-lg pl-1 placeholder:italic bg-transparent outline-none",
                        className,
                    )}
                    value={searchText}
                    onChange={handleSearchChanged}
                />
            </div>
        </div>
    );
}
