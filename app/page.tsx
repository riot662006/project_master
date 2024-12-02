"use client";
import Logo from "@/components/Icons/Logo";
import Image from "next/image";
import KeyFeaturesList from "./home/Lists/KeyFeaturesList";
import useMediaQuery from "@/hooks/useMediaQuery";
import { SignInButton } from "@clerk/nextjs";

export default function Home() {
  const isMaxSm = useMediaQuery("not all and (min-width: 640px)");

  return (
    <main className="flex w-full flex-col bg-white">
      <nav className="flex w-full items-center justify-between p-8">
        <Logo showName={!isMaxSm} />
        <SignInButton>
          <button className="flex items-center rounded-md bg-sky-500 p-2 px-4 text-sm text-white">
            Get started
          </button>
        </SignInButton>
      </nav>
      <section className="flex flex-col items-center gap-4 p-20 max-sm:px-8">
        <h1 className="text-center text-xl font-bold">
          Manage Your Projects and Tasks{" "}
          <span className="text-sky-500">Effortlessly!</span>
        </h1>
        <p className="w-96 text-center text-sm font-medium text-slate-500 max-sm:w-full">
          Supercharge your workflow with our intuitive platform! Organize tasks,
          track progress, and hit deadlines—effortlessly. Stay on top and
          achieve more, faster!
        </p>
        <SignInButton>
          <button className="flex items-center rounded-md bg-sky-500 p-2 px-4 text-sm text-white">
            Lets get started!
          </button>
        </SignInButton>
        <div className="flex gap-2 items-center justify-center">
          <Image src="/screenshots/project-2.png" alt="Project management dashboard" width={708} height={528}/>
        </div>
      </section>
      <section className="flex flex-col items-center gap-8 bg-slate-100 p-8">
        <h2 className="text-lg font-bold">Key Features</h2>
        <KeyFeaturesList />
      </section>
    </main>
  );
}
