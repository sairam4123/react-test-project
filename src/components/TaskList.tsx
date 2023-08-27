import { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import { TaskItem } from "./TaskItem";
import { TaskSearch } from "./TaskSearch";
import { Button } from "./Button";
import { IconContext } from "react-icons";
import { FaPlus } from "react-icons/fa";

type TaskListProps = {
    listTitle: string
}

export function TasksList({listTitle}: TaskListProps) {
    const { todos: tasks, createTask } = useTasks();

    const [searchText, setSearchText] = useState("");

    function handleSearchChanged(text: string) {
        setSearchText(text);
    }

    function handleAddBtnClick(event?: React.MouseEvent) {
        if (event === undefined) {
            return;
        }

        if (!searchText) return;

        createTask({
            name: searchText,
            finished: false,
        });
    }

    const filteredTasks = tasks.filter((task: ITaskData) =>
        task.name.toLowerCase().includes(searchText.toLowerCase())
    );
    return (
        <>
            <TaskSearch onSearch={handleSearchChanged} />
            <div className="max-w-md min-w-fit w-full flex flex-col overflow-y-auto overflow-x-hidden max-h-48 px-2 mx-1">
                {filteredTasks.map((_task: ITaskData) => {
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
                        <IconContext.Provider
                            value={{
                                className: "flex w-4 h-4 text-white m-1",
                            }}>
                            <FaPlus />
                        </IconContext.Provider>
                        Add "{searchText}" to&#160;
                        <span className="font-bold h-fit w-fit">{listTitle}</span>
                    </span>
                </Button>
            )}
        </>
    );
}
