import { Toaster } from "react-hot-toast";
import Sidebar from "../components/Sidebar";
import AllTasksMain from "../pages/tasks/components/AllTasksMain";
import { AppContextProvider } from "../utils/AppContext";

export default function Home() {
  return (
    <AppContextProvider>
      <Toaster position="top-center" />
      <Sidebar />
      <main className="flex h-screen w-full flex-1 bg-slate-50">
        <AllTasksMain />
      </main>
    </AppContextProvider>
  );
}
