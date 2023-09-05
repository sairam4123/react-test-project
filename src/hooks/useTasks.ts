import { useContext } from "react";
import { TasksContext, TodoContextType } from "../contexts/TasksContext";
import type { TaskDataType } from "../types/TaskDataType";

export default function useTasks() {
    const { todos, setTodos } = useContext(TasksContext) as TodoContextType;

    function createTask(task_data: Omit<TaskDataType, "id">) {
        setTodos([
            ...todos,
            {
                ...task_data,
                id: +new Date(),
            },
        ]);
    }

    function removeTask(taskId: TaskDataType["id"]) {
        console.log(todos);
        setTodos(todos.filter((t) => t.id !== taskId));
    }

    function toggleTask(taskId: TaskDataType["id"]) {
        setTodos(
            todos.map((t) =>
                t.id === taskId ? { ...t, finished: !t.finished } : t
            )
        );
    }

    function updateTask(
        taskId: TaskDataType["id"],
        task: Partial<Omit<TaskDataType, "id">>
    ) {
        setTodos(todos.map((t) => (t.id === taskId ? { ...t, ...task } : t)));
    }

    function replaceTask(taskId: TaskDataType["id"], task: TaskDataType) {
        setTodos(todos.map((t) => (t.id === taskId ? { ...task } : t)));
    }

    return {
        todos,
        createTask,
        removeTask,
        toggleTask,
        replaceTask,
        updateTask,
    };
}
