import { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import { TaskItem } from "./TaskItem";
import { TaskSearch } from "./TaskSearch";

export function TasksList() {
    const { todos: tasks, createTask } = useTasks();

    const [searchText, setSearchText] = useState("");

    function handleAddBtnClick({}) {
        if (!searchText) return;

        createTask({
            name: searchText,
            finished: false,
        });
    }

    function handleSearchChanged(text: string) {
        setSearchText(text);
    }

    return (
        <>
            <TaskSearch
                onSearch={handleSearchChanged}
                onAddBtnClick={handleAddBtnClick}
            />
            <div className="max-w-md w-full flex flex-col">
                {tasks.map((_task: ITaskData) => {
                    return <TaskItem key={String(_task.id)} task={_task} />;
                })}
            </div>
        </>
    );
}
