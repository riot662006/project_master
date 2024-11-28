import { SignOutButton } from '@clerk/nextjs'

export default function Page() {
  return <div className="flex h-fit p-4"><SignOutButton><button className="p-4 bg-sky-500 text-white rounded-md hover:bg-sky-600">Sign Out</button></SignOutButton></div>
}