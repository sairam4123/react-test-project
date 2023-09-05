import { NavBar } from "./pages/NavBar";
import { TasksProvider } from "./contexts/TasksContext";
import NamedTaskList from "./pages/NamedTaskList";

function App() {
    return (
        <div className="flex flex-col bg-slate-800 h-screen w-full">
            <NavBar />
            <div className="flex bg-slate-900 h-full items-center justify-center rounded-md p-2 m-3 mt-1.5">
                <TasksProvider>
                    <NamedTaskList />
                </TasksProvider>
            </div>
        </div>
    );
}

export default App;
