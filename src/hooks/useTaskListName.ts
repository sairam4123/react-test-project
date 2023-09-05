import { useContext } from "react";
import { TasksContext, TodoContextType } from "../contexts/TasksContext";

export default function useTaskListName() {
    const { listName, setListName } = useContext(
        TasksContext
    ) as TodoContextType;
    
    return { listName, setListName };
}
