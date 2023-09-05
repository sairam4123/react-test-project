import { EditableText } from "../components/EditableText";
import { Button } from "../components/Button";
import { FaTrash } from "react-icons/fa";
import useTasks from "../hooks/useTasks";
import { MouseEvent } from "react";
import { twMerge } from "tailwind-merge";
import { Icon } from "../components/Icon";
import { CheckBox } from "../components/CheckBox";
import type { TaskDataType } from "../types/TaskDataType";

type TaskItemProps = {
    task: TaskDataType;
    highlight?: string;
};

export function TaskItem({ task, highlight }: TaskItemProps) {
    const { removeTask, toggleTask, updateTask } = useTasks();

    function handleCheck() {
        toggleTask(task.id);
    }

    function handleTextChange(text: string) {
        updateTask(task.id, { name: text });
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
                `flex flex-row max-h-fit h-full max-w-lg w-full rounded-md text-white bg-sky-700 p-2 m-1 hover:bg-sky-500 active:bg-blue-800`,
                `${
                    task.finished &&
                    "bg-blue-700 hover:bg-blue-600 active:bg-sky-800"
                }`
            )}
            onClick={handleClick}>
            {/* <input
                type="checkbox"
                className="flex w-5 h-5 bg-white items-center justify-center appearance-none"
                checked={task.finished}
                onChange={handleCheck}
            /> */}
            <CheckBox
                checked={task.finished}
                onChange={handleCheck}
                className="fill-teal-700 bg-sky-100 hover:fill-sky-600 hover:bg-sky-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:border peer-focus:ring-sky-100"
            />

            <EditableText
                strike={task.finished}
                text={task.name}
                highlight={highlight}
                defaultText="Untitled task"
                onTextChanged={handleTextChange}
                className="px-1"
                parentClassName="max-w-lg w-full"
            />

            <Button
                buttonStyle="error"
                aria-label={`delete ${task.id}`}
                className="ml-3 px-1.5 rounded-full"
                onClick={handleRemoveBtnClick}>
                <Icon className="w-3 h-3 text-red-50">
                    <FaTrash />
                </Icon>
            </Button>
        </div>
    );
}
