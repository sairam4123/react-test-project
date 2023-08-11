import { useState } from "react";
import { Button } from "./Button";

interface TaskSearchProps {
    onSearch: (searchText: string) => any;
    onAddBtnClick: ({
        text,
        event,
    }: {
        text?: string;
        event?: React.MouseEvent;
    }) => any;
}

export function TaskSearch({ onSearch, onAddBtnClick }: TaskSearchProps) {
    const [searchText, setSearchText] = useState("");

    function handleSearchChanged(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchText(event.target.value);
        onSearch(event.target.value);
    }

    function handleAddBtnClick(event?: React.MouseEvent) {
        if (event === undefined) {
            return;
        }
        setSearchText("")
        onAddBtnClick({ text: searchText, event });
    }

    return (
        <div className="flex max-w-lg w-full min-w-fit my-2">
            <input
                type="search"
                placeholder="Find or create a todo.."
                className="max-w-md max-h-full h-full w-full rounded-lg mr-2 p-2 pl-4 bg-slate-950 text-white"
                value={searchText}
                onChange={handleSearchChanged}
            />
            <Button
                style="primary"
                className="text-white min-w-fit max-h-full h-full"
                onClick={handleAddBtnClick}>
                <span className="px-4">+ Add Task</span>
            </Button>
        </div>
    );
}
