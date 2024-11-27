"use client";

import {
  BorderAll,
  CalendarMonth,
  Logout,
  Splitscreen,
} from "@mui/icons-material";
import useMediaQuery from "../../hooks/useMediaQuery";
import { usePathname } from "next/navigation";
import { useCallback, useEffect } from "react";
import Link from "next/link";

import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { toggleSidebar } from "@/store/slices/sidebarSlice";
import Logo from "../Icons/Logo";

const Sidebar = () => {
  // store variable for the state of the sidebar ( when the screen is too small)
  const isOpen = useAppSelector((state) => state.sidebar.isOpen);
  const dispatch = useAppDispatch();

  const isMaxSm = useMediaQuery("not all and (min-width: 640px)"); // track when screen gets too small
  const closeSidebar = () => dispatch(toggleSidebar(false));

  useEffect(() => {
    // to avoid problems. if the page is resized. reset the sidebar.
    dispatch(toggleSidebar(false));
  }, [dispatch, isMaxSm]);

  if (isMaxSm) {
    // if too small, make sidebar collapsible
    return (
      <>
        <div
          className={`${!isOpen && "hidden"} fixed z-50 h-screen w-screen bg-slate-800 opacity-50`}
          onClick={closeSidebar}
        />
        <div
          className={`${isOpen ? "w-80 opacity-100" : "w-0 opacity-0"} fixed z-50 flex h-screen flex-col items-center justify-between border-r bg-white py-8 shadow-xl transition-[width,opacity]`}
        >
          <Logo showName />
          <Menu />
          <Profile />
        </div>
      </>
    );
  }

  // if not keep it at its side
  return (
    <div className="flex w-20 flex-col items-center justify-between border-r py-8 max-sm:hidden">
      <Logo />
      <Menu />
      <Profile />
    </div>
  );
};

const Menu = () => {
  // to check which menu button should be active
  const pathname = usePathname();

  const menuItemClassName = useCallback(
    (path: string) => {
      return `flex items-center cursor-pointer text-${pathname.startsWith(path) ? "sky-500" : "slate-300"}`;
    },
    [pathname],
  );

  // when sidebar is collapsible, add descriptions for the buttons
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
      <Link href="/" className={menuItemClassName("/scheduler")}>
        <CalendarMonth />
        <span className="hidden max-sm:block">Scheduler</span>
      </Link>
      <Link
        href="/"
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