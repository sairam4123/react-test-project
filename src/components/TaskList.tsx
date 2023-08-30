import { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import { TaskItem } from "./TaskItem";
import { TaskSearch } from "./TaskSearch";
import { Button } from "./Button";
import { FaPlus } from "react-icons/fa";
import { Icon } from "./Icon";

type TaskListProps = {
    listTitle: string;
};

export function TasksList({ listTitle }: TaskListProps) {
    const { todos: tasks, createTask } = useTasks();

    const [searchText, setSearchText] = useState("");

    function handleAddBtnClick(event?: React.MouseEvent) {
        if (event === undefined) {
            return;
        }

        if (!searchText) return;

        setSearchText("");

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
            <TaskSearch search={searchText} setSearchText={setSearchText} />
            <div className="max-w-xl min-w-fit w-full flex flex-col justify-center items-center overflow-y-auto overflow-x-hidden max-h-64 px-2 mx-1">
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
                        <Icon className="flex w-4 h-4 text-white m-1">
                            <FaPlus />
                        </Icon>
                        Add "{searchText}" to&#160;
                        <span className="font-bold h-fit w-fit">
                            {listTitle}
                        </span>
                    </span>
                </Button>
            )}
        </>
    );
}
