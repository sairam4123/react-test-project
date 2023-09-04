import { createContext, useEffect, useRef, useState } from "react";

interface TasksState {
    todos: ITaskData[];
}

export type TodoContextType = {
    todos: ITaskData[];
    setTodos: (todos: ITaskData[]) => any;
};

const initialState: TasksState = {
    todos: [],
};

export const TasksContext = createContext<TodoContextType | null>(null);

export function TasksProvider({ children }: { children?: React.ReactNode }) {
    const [state, setState] = useState(initialState);

    const isMounted = useRef(false);
    const setTodos = (todos: ITaskData[]) => {
        console.log(todos);
        setState({ todos });
    };

    useEffect(() => {
        const stringState = localStorage.getItem("state");
        if (!stringState) return;
        const loadedState: TasksState = JSON.parse(stringState);
        if (!loadedState) return;
        setState({ ...loadedState });
    }, []);

    useEffect(() => {
        if (isMounted.current === true) {
            localStorage.setItem("state", JSON.stringify(state));
        } else {
            isMounted.current = true;
        }
    }, [state]);

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
