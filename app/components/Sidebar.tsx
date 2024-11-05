"use client";

import { BorderAll, Logout, Splitscreen } from "@mui/icons-material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import useMediaQuery from "../utils/hooks/useMediaQuery";
import { usePathname } from "next/navigation";
import { useCallback, useContext } from "react";
import Link from "next/link";
import { useAppContext } from "../utils/AppContext";

const Sidebar = () => {
  const { sidebarObj } = useAppContext();
  const { isOpen, setIsOpen } = sidebarObj;

  const isMaxSm = useMediaQuery("not all and (min-width: 640px)");
  const closeSidebar = () => setIsOpen(false);

  if (isMaxSm) {
    return (
      <>
        <div
          className={`${isOpen ? "w-80 opacity-100" : "w-0 opacity-0"} fixed z-50 flex h-screen flex-col items-center justify-between border-r bg-white py-8 shadow-xl transition-[width,opacity]`}
        >
          <Logo />
          <Menu />
          <Profile />
        </div>
        <div
          className={`${!isOpen && "hidden"} fixed z-40 h-screen w-screen bg-slate-800 opacity-50`}
          onClick={closeSidebar}
        />
      </>
    );
  }

  return (
    <div className="flex w-20 flex-col items-center justify-between border-r py-8 max-sm:hidden">
      <Logo />
      <Menu />
      <Profile />
    </div>
  );
};

const Logo = () => {
  return (
    <div className="flex items-center gap-4">
      <TaskAltIcon fontSize="large" className="text-sky-500" />
      <div className="hidden items-center gap-1 text-2xl font-bold max-sm:flex">
        <span>Project</span>
        <span className="text-sky-500">Master</span>
      </div>
    </div>
  );
};

const Menu = () => {
  const pathname = usePathname();

  const menuItemClassName = useCallback(
    (path: string) => {
      return `flex items-center cursor-pointer text-${pathname.startsWith(path) ? "sky-500" : "slate-300"}`;
    },
    [pathname],
  );

  return (
    <div className="grid gap-y-8">
      <Link href="/projects" className={menuItemClassName("/projects")}>
        <BorderAll />
        <span className="hidden max-sm:block">All Projects</span>
      </Link>
      <Link href="/tasks" className={menuItemClassName("/tasks")}>
        <Splitscreen />
        <span className="hidden max-sm:block">All Tasks</span>
      </Link>
      <Link
        href="/logout"
        className="flex cursor-pointer items-center text-slate-300"
      >
        <Logout />
        <span className="hidden max-sm:block">Log Out</span>
      </Link>
    </div>
  );
};

const Profile = () => {
  return (
    <div className="flex items-center gap-4">
      <div className="h-8 w-8 rounded-md bg-sky-500"></div>
      <div className="hidden text-xs max-sm:flex max-sm:flex-col">
        <p className="font-bold">Onyekachi Ibekwe</p>
        <p>rickriots@riot.inc</p>
      </div>
    </div>
  );
};

export default Sidebar;
