import Image from "next/image";
import Sidebar from "../components/Sidebar";
import AllProjectsMain from "../pages/all_projects/components/AllProjectsMain";
import { SidebarLogicProvider } from "../utils/SidebarLogic";


export default function ProjectsPage() {
  return (
    <main className="flex flex-1 w-full h-screen bg-slate-50">
      <AllProjectsMain />
    </main>
  );
}
