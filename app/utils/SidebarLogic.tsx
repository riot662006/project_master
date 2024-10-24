"use client"

import { createContext, useCallback, useContext, useEffect, useState} from "react";
import useMediaQuery from "./useMediaQuery";

type SidebarLogicObjType = {
    isOpen: boolean,
    toggleSidebar: () => void
};

const SidebarLogicContext = createContext<SidebarLogicObjType>({isOpen: false, toggleSidebar: () => {}});

interface SidebarLogicProviderProps {
    children: React.ReactNode;
};

export const SidebarLogicProvider = ({ children }: SidebarLogicProviderProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const isMaxSm = useMediaQuery("(max-width: 640px)");

    const toggleSidebar = useCallback(() => {
        if (!isMaxSm) {
            setIsOpen(true);
        } else {
            setIsOpen(wasOpen => !wasOpen);
        }
    }, [isMaxSm, setIsOpen]);

    return (
        <SidebarLogicContext.Provider value={{isOpen, toggleSidebar}}>
            { children }
        </SidebarLogicContext.Provider>
    )
}

export const useSidebarLogic = () => useContext(SidebarLogicContext);