import { TasksList } from "./components/TaskList";
import { TasksProvider } from "./contexts/TasksContext";

function App() {
    return (
        <div className="bg-black flex flex-col w-full h-screen items-center justify-center">
            <p className="text-lg text-white">Tasks</p>
            <TasksProvider>
                <TasksList />
            </TasksProvider>
        </div>
    );
}

export default App;
