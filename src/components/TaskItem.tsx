import { EditableText } from "./EditableText";
import { Button } from "./Button";
import { IconContext } from "react-icons";
import { FaTrash } from "react-icons/fa";
import { useTasks } from "../hooks/useTasks";
import { MouseEvent } from "react";

export function TaskItem({ task }: { task: ITaskData }) {
    const { removeTask, toggleTask, updateTask } = useTasks();

    function handleCheck() {
        toggleTask(task.id);
    }

    function handleTextChange(text: string) {
        updateTask(task.id, { ...task, name: text });
    }

    function handleClick() {
        toggleTask(task.id);
    }

    function handleRemoveBtnClick(event?: MouseEvent<HTMLButtonElement>) {
        if (event == null) {
            return;
        }
        removeTask(task.id);
        event.stopPropagation();
    }

    return (
        <div
            className={`flex max-w-md w-full rounded-lg text-white bg-blue-700 p-2 m-1 hover:bg-blue-500 ${
                task.finished && "bg-blue-950 hover:bg-blue-900"
            }`}
            onClick={handleClick}>
            <input
                type="checkbox"
                className="w-5 ml-1"
                checked={task.finished}
                onChange={handleCheck}
            />

            <EditableText
                strike={task.finished}
                text={task.name}
                onTextChanged={handleTextChange}
            />

            <Button
                style="error"
                className="px-1"
                onClick={handleRemoveBtnClick}>
                <IconContext.Provider
                    value={{
                        className: "w-3.5 h-3.5",
                    }}>
                    <FaTrash />
                </IconContext.Provider>
            </Button>
        </div>
    );
}
