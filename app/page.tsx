"use client"; // Enable client-side rendering

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/projects");
    }, 2000);

    return () => clearTimeout(timer); // Cleanup timer if the component unmounts
  }, [router]);

  return (
    <main className="flex h-screen w-full flex-1 bg-slate-50">
      <p className="text-3xl font-bold">
        Nothing here for now... Redirecting to projects page
      </p>
    </main>
  );
}
