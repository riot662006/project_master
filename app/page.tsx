import Sidebar from "./components/Sidebar";
import AllTasksMain from "./pages/tasks/components/AllTasksMain";
import { SidebarLogicProvider} from "./utils/SidebarLogic";

export default function Home() {
  return (
    <main className="flex flex-1 w-full h-screen bg-slate-50">
      <AllTasksMain />
    </main>
  );
}
