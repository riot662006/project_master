import Image from "next/image";
import Sidebar from "./components/Sidebar";
import AllProjectsMain from "./pages/all_projects/components/AllProjectsMain";

export default function Home() {
  return (
    <div className="flex h-screen v-screen poppins">
      <Sidebar />
      <main className="flex flex-1 h-screen bg-slate-50">
        <AllProjectsMain/>
      </main>
    </div>
  );
}
