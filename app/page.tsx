"use client";
import Logo from "@/components/Icons/Logo";
import Image from "next/image";
import KeyFeaturesList from "./home/Lists/KeyFeaturesList";

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
        <KeyFeaturesList />
      </section>
    </main>
  );
}
