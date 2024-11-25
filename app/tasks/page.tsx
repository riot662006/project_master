import { Toaster } from "react-hot-toast";
import Sidebar from "../../components/Overlays/Sidebar";
import TasksSection from "./components/Sections/TasksSection";

export default function Home() {
  return (
    <main className="flex h-screen w-full flex-1 bg-slate-50">
      <Toaster position="top-center" />
      <Sidebar />
      <TasksSection />
    </main>
  );
}
