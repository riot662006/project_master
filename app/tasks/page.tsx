import Sidebar from "../components/Sidebar";
import AllTasksMain from "../pages/tasks/components/AllTasksMain";
import { AppContextProvider } from "../utils/AppContext";

export default function Home() {
    return (
        <AppContextProvider>
            <Sidebar />
            <main className="flex flex-1 w-full h-screen bg-slate-50">
                <AllTasksMain />
            </main>
        </AppContextProvider>
    );
}
