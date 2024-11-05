import Sidebar from "../components/Sidebar";
import AllProjectsMain from "../pages/all_projects/components/AllProjectsMain";
import { AppContextProvider } from "../utils/AppContext";
import { Toaster } from "react-hot-toast";

export default function ProjectsPage() {
  return (
    <AppContextProvider>
      <Toaster 
        position="top-center"
      />
      <Sidebar />
      <main className="flex h-screen w-full flex-1 bg-slate-50">
        <AllProjectsMain />
      </main>
    </AppContextProvider>
  );
}
