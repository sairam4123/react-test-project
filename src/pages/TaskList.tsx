import useTaskListName from "../hooks/useTaskListName";
import { EditableText } from "../components/EditableText";
import useTasks from "../hooks/useTasks";
import { useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { TaskItem } from "./TaskItem";
import { FaPlus } from "react-icons/fa";
import { Button } from "../components/Button";
import { Icon } from "../components/Icon";
import type { TaskDataType } from "../types/TaskDataType";

export default function TaskList() {
    const { listName, setListName } = useTaskListName();
    const { todos: tasks, createTask } = useTasks();

    const [searchText, setSearchText] = useState("");

    function handleAddBtnClick(event?: React.MouseEvent) {
        if (event === undefined) {
            return;
        }

        handleSearchEnter();
    }

    function handleSearchEnter() {
        if (!searchText) return;

        setSearchText("");

        createTask({
            name: searchText,
            finished: false,
        });
    }

    const filteredTasks = tasks.filter((task: TaskDataType) =>
        task.name.toLowerCase().includes(searchText.toLowerCase())
    );
    return (
        <main className="flex flex-col w-full items-center justify-center">
            <EditableText
                text={listName}
                defaultText="Untitled List"
                className="font-extrabold text-lg text-white text-center h-fit px-4"
                parentClassName="flex items-center justify-center"
                onTextChanged={(text) => setListName(text)}
            />

            <hr className="max-w-lg w-full border-y-2.5 my-1 rounded-full" />

            <SearchBar
                search={searchText}
                setSearchText={setSearchText}
                onEnterText={handleSearchEnter}
            />

            <div className="max-w-lg min-w-fit w-full flex flex-col justify-start items-center overflow-y-visible overflow-x-hidden max-h-64 scroll-smooth">
                {filteredTasks.map((_task: TaskDataType) => {
                    return (
                        <TaskItem
                            key={String(_task.id)}
                            task={_task}
                            highlight={searchText}
                        />
                    );
                })}
            </div>

            {searchText && (
                <Button
                    buttonStyle="primary"
                    aria-label="create task"
                    className="flex text-white min-w-fit max-w-lg w-full py-2 my-2 justify-center items-center"
                    onClick={handleAddBtnClick}>
                    <span className="flex px-4">
                        <Icon className="flex w-4 h-4 text-white mx-2.5 my-1">
                            <FaPlus />
                        </Icon>
                        Add "{searchText}" to&#160;
                        <span className="font-bold h-fit w-fit">
                            {listName}
                        </span>
                    </span>
                </Button>
            )}
        </main>
    );
}
