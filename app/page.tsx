"use client";
import Logo from "@/components/Icons/Logo";
import {
  AddTask,
  CheckCircle,
  CheckCircleOutline,
  TaskAlt,
} from "@mui/icons-material";
import Image from "next/image";

// Enable client-side rendering

export default function Home() {
  return (
    <main className="flex w-full flex-col bg-white">
      <nav className="flex w-full justify-between p-8">
        <Logo showName />
        <button className="flex items-center rounded-md bg-sky-500 p-2 px-4 text-sm text-white">
          Get started
        </button>
        
      </nav>
      <section className="flex flex-col items-center gap-4 p-20">
        <h1 className="text-xl font-bold">
          Manage Your Projects and Tasks{" "}
          <span className="text-sky-500">Effortlessly!</span>
        </h1>
        <p className="w-96 text-center text-sm font-medium text-slate-500">
          Supercharge your workflow with our intuitive platform! Organize tasks,
          track progress, and hit deadlines—effortlessly. Stay on top and
          achieve more, faster!
        </p>
        <button className="flex items-center rounded-md bg-sky-500 p-2 px-4 text-sm text-white">
          Lets get started!
        </button>
        <Image src="" alt="Project management dashboard" />
      </section>
      <section className="flex flex-col items-center gap-8 bg-slate-100 p-8">
        <h2 className="text-lg font-bold">Key Features</h2>
        <div className="flex w-full flex-wrap justify-center gap-8">
          <KeyFeature />
          <KeyFeature />
          <KeyFeature />
          <KeyFeature />
        </div>
      </section>
    </main>
  );
}

const KeyFeature = () => {
  return (
    <div className="flex w-72 flex-col items-center gap-4 rounded-lg bg-white p-4 shadow-md">
      <div className="flex aspect-square w-16 items-center justify-center rounded-full bg-sky-100">
        <AddTask fontSize="small" className="text-sky-500" />
      </div>
      <h3 className="text-center font-semibold text-sky-500">Efficient Task Management</h3>
      <p className="text-center text-xs font-medium text-slate-500 mb-12">
        Stay organized by sorting tasks by priority, due date, or custom
        criteria. Our platform makes it easy to manage your daily tasks and
        projects in one place.
      </p>
    </div>
  );
};
