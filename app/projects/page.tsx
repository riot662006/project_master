import Image from "next/image";
import Sidebar from "../components/Sidebar";
import AllProjectsMain from "../pages/all_projects/components/AllProjectsMain";


export default function ProjectsPage() {
  return (
    <div className="flex h-screen v-screen poppins">
      <Sidebar />
      <main className="flex flex-1 w-full h-screen bg-slate-50">
        <AllProjectsMain/>
      </main>
    </div>
  );
}
