import { useState, useEffect } from "react";

let activeModals = 0;

const lockScroll = () => {
  if (activeModals === 0) {
    document.body.style.overflow = "hidden";
  }
  activeModals += 1;
};

const unlockScroll = () => {
  activeModals -= 1;
  if (activeModals <= 0) {
    document.body.style.overflow = "";
  }
};

export const useDetectOutsideClick = (
  element: React.RefObject<HTMLDivElement>,
  initialState: boolean,
): [boolean, () => void, () => void] => {
  const [isActive, setIsActive] = useState<boolean>(initialState);

  const toggleMenu = () => {
    setIsActive((state) => !state);
  };

  const closeMenu = () => {
    setIsActive(false);
  };

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      // If the active element exists and is clicked outside of
      if (
        element.current !== null &&
        !element.current.contains(event.target as Node)
      ) {
        setIsActive(false);
      }
    };

    // If the item is active (ie open) then listen for clicks outside
    if (isActive) {
      window.addEventListener("click", onClick);

      lockScroll(); // locks the scroll for the page while modal is active
    }

    return () => {
      // if it was active in the last useEffect call
      if (isActive) unlockScroll();
      window.removeEventListener("click", onClick);
    };
  }, [isActive, element]);

  return [isActive, toggleMenu, closeMenu];
};
