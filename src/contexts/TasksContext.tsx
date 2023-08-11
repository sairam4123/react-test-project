// This file isnt production ready
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

export function TasksProvider({
    children,
}: {
    children?: React.ReactNode;
}) {
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

// function usersReducer(
//     state: GlobalAppState,
//     action: TodoAction
// ): GlobalAppState {
//     switch (action.type) {
//         case "REMOVE_TODO":
//             return {
//                 ...state,
//                 todos: state.todos.filter(
//                     (task) => task.id != action.payload.id
//                 ),
//             };
//         case "ADD_TODO":
//             var _task: Task = {
//                 id: (state.todos[state.todos.length - 1]?.id ?? 0n) + 1n, // TODO: Implement id generation system.
//                 name: action.payload.name,
//                 finished: action.payload.finished ?? false,
//             };
//             return {
//                 ...state,
//                 todos: [...state.todos, _task],
//             };
//         case "EDIT_TODO":
//             var task: Task | undefined = state.todos.find(
//                 (task) => task.id == action.payload.id
//             );
//             if (task == undefined) {
//                 return { ...state };
//             }
//             var todo_task: Task = {
//                 ...task,
//                 ...action.payload,
//             };
//             return {
//                 ...state,
//                 todos: state.todos.map((_task) =>
//                     _task.id === action.payload.id ? todo_task : _task
//                 ),
//             };

//         default:
//             return state;
//     }
// }

// interface TodoAddAction {
//     name: string;
//     finished?: boolean;
// }

// interface TodoRemoveAction {
//     id: bigint;
// }

// interface TodoEditAction {
//     id: bigint;
//     name?: string;
//     finished?: boolean;
// }

// type TodoAction =
//     | {
//           type: "ADD_TODO";
//           payload: TodoAddAction;
//       }
//     | {
//           type: "REMOVE_TODO";
//           payload: TodoRemoveAction;
//       }
//     | {
//           type: "EDIT_TODO";
//           payload: TodoEditAction;
//       };
