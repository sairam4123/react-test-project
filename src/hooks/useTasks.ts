import { useContext } from "react";
import { TasksContext, TodoContextType } from "../contexts/TasksContext";

export function useTasks() {
    const { todos, setTodos } = useContext(TasksContext) as TodoContextType;

    function createTask(task_data: Omit<ITaskData, "id">) {
        setTodos([
            ...todos,
            {
                ...task_data,
                id: +new Date(),
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
        task: Partial<Omit<ITaskData, "id">>
    ) {
        setTodos(todos.map((t) => (t.id === taskId ? { ...t, ...task } : t)));
    }

    function replaceTask(taskId: ITaskData["id"], task: ITaskData) {
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
