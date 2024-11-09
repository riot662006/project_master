import Sidebar from "../../components/Sidebar";
import ProjectsSection from "./components/Sections/ProjectsSection";
import { Toaster } from "react-hot-toast";

import { AppContextProvider } from "@/utils/AppContext";
import Providers from "@/store/Providers";

export default function ProjectsPage() {
  return (
    <Providers>
      <AppContextProvider>
        <Toaster position="top-center" />
        <Sidebar />
        <main className="flex h-screen w-full flex-1 bg-slate-50">
          <ProjectsSection />
        </main>
      </AppContextProvider>
    </Providers>
  );
}
