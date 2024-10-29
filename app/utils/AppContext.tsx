"use client"

import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState} from 'react';
import useMediaQuery from './useMediaQuery';


type sidebarObjType = {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

type addProjectModalMode = "default" | "select-icon";

type addProjectModalObjType = {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>,
    
    mode: addProjectModalMode,
    setMode: Dispatch<SetStateAction<addProjectModalMode>>
}

interface IAppContext {
    sidebarObj: sidebarObjType,
    addProjectModalObj: addProjectModalObjType
}  

const AppContext = createContext<IAppContext>(
    {
        sidebarObj: {isOpen: false, setIsOpen: () => {}},
        addProjectModalObj: {
            isOpen: false, setIsOpen: () => {},
            mode: "default", setMode: () => {}
        }
    }
);

export const AppContextProvider = ({ children } : { children: React.ReactNode}) => {
    const [ isSidebarOpen, setIsSidebarOpen ] = useState<boolean>(false);

    const [ isAddProjectModalOpen, setIsAddProjectModalOpen ] = useState<boolean>(false); 
    const [ projectModalMode, setProjectModalMode ] = useState<addProjectModalMode>("default");

    const isMaxSm = useMediaQuery("(max-width: 640px)");

    useEffect(
        () => {
            setIsSidebarOpen(false);
        }, [ isMaxSm ]
    );

    return (
        <AppContext.Provider 
            value={{
                sidebarObj: {
                    isOpen: isSidebarOpen, 
                    setIsOpen: setIsSidebarOpen
                },
                addProjectModalObj: {
                    isOpen: isAddProjectModalOpen,
                    setIsOpen: setIsAddProjectModalOpen,

                    mode: projectModalMode,
                    setMode: setProjectModalMode
                }
            }}>
                {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext);