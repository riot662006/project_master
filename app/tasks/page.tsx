import { Toaster } from "react-hot-toast";
import Sidebar from "../../components/Sidebar";
import TasksSection from "./components/Sections/TasksSection";
import { AppContextProvider } from "../../utils/AppContext";
import Providers from "@/store/Providers";

export default function Home() {
  return (
    <Providers>
      <AppContextProvider>
        <Toaster position="top-center" />
        <Sidebar />
        <main className="flex h-screen w-full flex-1 bg-slate-50">
          <TasksSection />
        </main>
      </AppContextProvider>
    </Providers>
  );
}
