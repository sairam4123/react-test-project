import { createContext, useState } from "react";

interface TasksState {
    todos: ITaskData[];
}

export type TodoContextType = {
    todos: ITaskData[];
    setTodos: (todos: ITaskData[]) => any;
};

const initialState: TasksState = {
    todos: [
        {
            id: 1n,
            name: "Test Task",
            finished: true,
        },
        {
            id: 2n,
            name: "Test Task",
            finished: false,
        },
        {
            id: 3n,
            name: "Test Task",
            finished: false,
        },
        {
            id: 4n,
            name: "Test Task",
            finished: false,
        },
    ],
};

export const TasksContext = createContext<TodoContextType | null>(null);

export function TasksProvider({ children }: { children?: React.ReactNode }) {
    const [state, setState] = useState(initialState);

    const setTodos = (todos: ITaskData[]) => {
        console.log(todos);
        return setState({ todos });
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
