import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import type { TaskDataType } from "../types/TaskDataType";

interface TasksState {
    todoListName: string;
    todos: TaskDataType[];
}

export type TodoContextType = {
    todos: TaskDataType[];
    setTodos: (todos: TaskDataType[]) => void;
    listName: string;
    setListName: (listName: string) => void;
};

const initialState: TasksState = {
    todoListName: "Untitled",
    todos: [],
};

export const TasksContext = createContext<TodoContextType | null>(null);

export function TasksProvider({ children }: { children?: React.ReactNode }) {
    const { state, setState } = useLocalStorage("state", initialState);

    const setTodos = (todos: TaskDataType[]) => {
        setState({ ...state, todos });
    };

    const setListName = (listName: string) => {
        setState({ ...state, todoListName: listName });
    };

    return (
        <TasksContext.Provider
            value={{
                todos: state.todos,
                setTodos,
                listName: state.todoListName,
                setListName,
            }}>
            {children}
        </TasksContext.Provider>
    );
}
