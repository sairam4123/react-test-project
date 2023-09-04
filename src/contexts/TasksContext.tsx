import { createContext, useState } from "react";

interface TasksState {
    todos: ITaskData[];
}

export type TodoContextType = {
    todos: ITaskData[];
    setTodos: (todos: ITaskData[]) => any;
};

const storedState: TasksState | null = JSON.parse(
    localStorage.getItem("state") || "{}"
);

const initialState: TasksState = storedState ?? {
    todos: [],
};

export const TasksContext = createContext<TodoContextType | null>(null);

export function TasksProvider({ children }: { children?: React.ReactNode }) {
    const [state, setState] = useState(initialState);

    const setTodos = (todos: ITaskData[]) => {
        console.log(todos);
        setState({ todos });
        localStorage.setItem("state", JSON.stringify({ todos }));
    };

    return (
        <TasksContext.Provider
            value={{
                todos: state.todos,
                setTodos,
            }}>
            {children}
        </TasksContext.Provider>
    );
}
