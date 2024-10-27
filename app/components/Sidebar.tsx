"use client"

import { BorderAll, Logout, Splitscreen } from '@mui/icons-material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { orange } from '@mui/material/colors';
import { useSidebarLogic } from '../utils/SidebarLogic';
import useMediaQuery from '../utils/useMediaQuery';
import { usePathname } from 'next/navigation';
import { useCallback } from 'react';
import Link from 'next/link';


const Sidebar = () => {
    const { isOpen, toggleSidebar } = useSidebarLogic();
    const isMaxSm = useMediaQuery("not all and (min-width: 640px)");

    if (isMaxSm) {
        return (
            <>
                <div className={`${isOpen ? "w-80 opacity-100" : "w-0 opacity-0"} z-50 bg-white fixed flex flex-col py-8 h-screen items-center justify-between border-r shadow-xl transition-[width,opacity]`}>
                    <Logo />
                    <Menu />
                    <Profile />
                </div>
                <div className={`${!isOpen && "hidden"} fixed w-screen h-screen z-40 bg-slate-800 opacity-50`} onClick={toggleSidebar} />
            </>
        )
    };

    return (
        <div className="flex flex-col py-8 w-20 items-center justify-between border-r max-sm:hidden">
            <Logo />
            <Menu />
            <Profile />
        </div>
    )
};

const Logo = () => {
    return (
        <div className="flex items-center gap-4">
            <TaskAltIcon fontSize='large' className='text-orange-500' />
            <div className="items-center text-2xl font-bold gap-1 hidden max-sm:flex">
                <span >Project</span>
                <span className="text-orange-500">Master</span>
            </div>
        </div>
    )
};

const Menu = () => {
    const pathname = usePathname();

    const menuItemClassName = useCallback((path: string) => {
        return `flex items-center cursor-pointer text-${pathname.startsWith(path) ? 'orange-500' : 'slate-300'}`;
    }, [ pathname ]);

    return (
        <div className="grid gap-y-8 ">
            <Link href="/projects" className={menuItemClassName("/projects")}>
                <BorderAll />
                <span className="hidden max-sm:block">All Projects</span>
            </Link>
            <Link href="/tasks" className={menuItemClassName("/tasks")}>
                <Splitscreen />
                <span className="hidden max-sm:block">All Tasks</span>
            </Link>
            <Link href="/logout" className="flex items-center text-slate-300 cursor-pointer">
                <Logout />
                <span className="hidden max-sm:block">Log Out</span>
            </Link>
        </div>
    )
};

const Profile = () => {
    return (
        <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-orange-500 rounded-md" ></div>
            <div className="text-xs hidden max-sm:flex max-sm:flex-col">
                <p className="font-bold">Onyekachi Ibekwe</p>
                <p>rickriots@riot.inc</p>
            </div>
        </div>
    )
};

export default Sidebar;