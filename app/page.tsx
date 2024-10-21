import Image from "next/image";
import Sidebar from "./components/Sidebar";

export default function Home() {
  return (
    <div className="flex h-screen v-screen poppins">
      <Sidebar />
      <main className="flex flex-1 h-screen">
        This is a project master app
      </main>
    </div>
  );
}
