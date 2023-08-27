import { useState } from "react";
import { EditableText } from "./components/EditableText";
import NavBar from "./components/NavBar";
import { TasksList } from "./components/TaskList";
import { TasksProvider } from "./contexts/TasksContext";

function App() {
    const [todoListTitle, setTodoListTitle] = useState("Tasks");

    function handleTextChange(text: string) {
        setTodoListTitle(text);
    }

    return (
        <div className="flex flex-col bg-slate-800 h-screen w-full">
            <NavBar />
            <div className="flex bg-slate-900 h-full items-center justify-center rounded-md p-2 m-3 mt-1.5">
                <main className="flex flex-col w-full items-center justify-center">
                    <EditableText
                        text={todoListTitle}
                        className="font-extrabold text-lg text-white text-center h-fit"
                        onTextChanged={handleTextChange}
                    />
                    <hr className="max-w-lg w-full border-y-[3px] my-1 rounded-full" />
                    <TasksProvider>
                        <TasksList listTitle={todoListTitle}/>
                    </TasksProvider>
                </main>
            </div>
        </div>
    );
}

export default App;
