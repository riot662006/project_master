"use client"

import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState} from 'react';
import useMediaQuery from './useMediaQuery';


type sidebarObjType = {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

type addProjectModalObjType = {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>

}

interface IAppContext {
    sidebarObj: sidebarObjType,
    addProjectModalObj: addProjectModalObjType
}  

const AppContext = createContext<IAppContext>(
    {
        sidebarObj: {isOpen: false, setIsOpen: () => {}},
        addProjectModalObj: {isOpen: false, setIsOpen: () => {}}
    }
);

export const AppContextProvider = ({ children } : { children: React.ReactNode}) => {
    const [ isSidebarOpen, setIsSidebarOpen ] = useState<boolean>(false);
    const [ isAddProjectModalOpen, setIsAddProjectModalOpen ] = useState<boolean>(false); 

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
                    setIsOpen: setIsAddProjectModalOpen
                }
            }}>
                {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext);