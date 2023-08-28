import { EditableText } from "./EditableText";
import { Button } from "./Button";
import { FaTrash } from "react-icons/fa";
import { useTasks } from "../hooks/useTasks";
import { MouseEvent } from "react";
import { twMerge } from "tailwind-merge";
import { Icon } from "./Icon";

type TaskItemProps = {
    task: ITaskData;
    highlight?: string;
};

export function TaskItem({ task, highlight }: TaskItemProps) {
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
            className={twMerge(
                `flex max-w-2xl w-full rounded-md text-white bg-sky-700 p-2 m-1 hover:bg-sky-500 active:bg-blue-800`,
                `${
                    task.finished &&
                    "bg-blue-700 hover:bg-blue-600 active:bg-sky-800"
                }`
            )}
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
                highlight={highlight}
                onTextChanged={handleTextChange}
            />

            <Button
                buttonStyle="error"
                aria-label={`delete ${task.id}`}
                className="px-1.5 rounded-full"
                onClick={handleRemoveBtnClick}>
                <Icon className="w-3 h-3 text-red-50">
                    <FaTrash />
                </Icon>
            </Button>
        </div>
    );
}
