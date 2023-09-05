import { Button } from "../components/Button";

export function NavBar() {
    return (
        <nav className="flex flex-row justify-between bg-slate-900 rounded-md p-2 m-3 mb-1.5">
            <span className="flex pl-2 items-center font-black bg-gradient-to-r from-orange-500 via-amber-200 to-amber-500 bg-clip-text text-transparent select-none">
                Task-a-man
            </span>
            <Button
                buttonStyle="secondary"
                className="text-white p-1 px-10 mr-2 bg-slate-800 hover:bg-slate-600 active:bg-slate-700 focus:ring-slate-300">
                LOGIN
            </Button>
        </nav>
    );
}
