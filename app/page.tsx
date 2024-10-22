import Image from "next/image";
import Sidebar from "./components/Sidebar";
import AllTasksMain from "./pages/tasks/components/AllTasksMain";

export default function Home() {
  return (
    <div className="flex h-screen v-screen poppins">
      <Sidebar />
      <main className="flex flex-1 w-full h-screen bg-slate-50">
        <AllTasksMain />
      </main>
    </div>
  );
}
