import Image from "next/image";
import Sidebar from "../components/Sidebar";
import AllProjectsMain from "../pages/all_projects/components/AllProjectsMain";
import { AppContextProvider } from "../utils/AppContext";

export default function ProjectsPage() {
  return (
    <AppContextProvider>
      <Sidebar />
      <main className="flex flex-1 w-full h-screen bg-slate-50">
        <AllProjectsMain />
      </main>
    </AppContextProvider>
  );
}
