import Sidebar from "../../components/Sidebar";
import ProjectsSection from "./components/Sections/ProjectsSection";
import { Toaster } from "react-hot-toast";

export default function ProjectsPage() {
  return (
    <main className="flex h-screen w-full flex-1 bg-slate-50">
      <Toaster position="top-center" />
      <Sidebar />
      <ProjectsSection />
    </main>
  );
}
