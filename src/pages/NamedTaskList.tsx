import useTaskListName from "../hooks/useTaskListName";
import { EditableText } from "../components/EditableText";
import { TasksList } from "./TaskList";

export default function NamedTaskList() {
    const { listName, setListName } = useTaskListName();
    return (
        <main className="flex flex-col w-full items-center justify-center">
            <EditableText
                text={listName}
                defaultText="Untitled List"
                className="font-extrabold text-lg text-white text-center h-fit px-4"
                parentClassName="flex items-center justify-center"
                onTextChanged={(text) => setListName(text)}
            />
            <hr className="max-w-lg w-full border-y-[3px] my-1 rounded-full" />
            <TasksList listTitle={listName} />
        </main>
    );
}
