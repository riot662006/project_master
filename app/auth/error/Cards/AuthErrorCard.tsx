"use client";

import Image from "next/image";
import Link from "next/link";

export const AuthErrorCard = () => {
  return (
    <div className="rounded-md bg-white p-12 shadow-md">
      <div className="flex w-[400px] flex-col items-center justify-center gap-y-12">
        <div className="flex w-full flex-col items-center gap-8">
          {/* Header */}
          <div className="flex w-full flex-col items-center gap-4">
            <Image
              src="/android-chrome-192x192.png"
              alt="ProjectMaster"
              width={32}
              height={32}
            />
            <div className="flex flex-col items-center gap-1 text-center">
              <h1 className="font-semibold">Sign In to Project Master</h1>
              <p className="text-sm font-light text-slate-500">
                Oops! Something went wrong
              </p>
            </div>
          </div>
        </div>
        <div>
          <Link
            href={"/auth/login"}
            className="w-full text-sm underline-offset-4 hover:underline"
          >
            <p>Back to login</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
