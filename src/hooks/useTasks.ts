import { useContext } from "react";
import { TasksContext, TodoContextType } from "../contexts/TasksContext";

export function useTasks() {
    const { todos, setTodos } = useContext(TasksContext) as TodoContextType;

    function createTask(task_data: Omit<ITaskData, "id">) {
        setTodos([
            ...todos,
            {
                ...task_data,
                id: BigInt(todos.length + 1),
            },
        ]);
    }

    function removeTask(taskId: ITaskData["id"]) {
        console.log(todos);
        setTodos(todos.filter((t) => t.id !== taskId));
    }

    function toggleTask(taskId: ITaskData["id"]) {
        setTodos(
            todos.map((t) =>
                t.id === taskId ? { ...t, finished: !t.finished } : t
            )
        );
    }

    function updateTask(
        taskId: ITaskData["id"],
        task: Pick<ITaskData, "name" | "finished">
    ) {
        setTodos(todos.map((t) => (t.id === taskId ? { ...t, ...task } : t)));
    }

    return { todos, createTask, removeTask, toggleTask, updateTask };
}
