import { SignOutButton } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex h-fit p-4">
      <SignOutButton>
        <button className="rounded-md bg-sky-500 p-4 text-white hover:bg-sky-600">
          Sign Out
        </button>
      </SignOutButton>
    </div>
  );
}
