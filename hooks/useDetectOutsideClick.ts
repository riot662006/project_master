import { useState, useEffect, Dispatch, SetStateAction } from "react";

export const useDetectOutsideClick = (
  element: React.RefObject<HTMLDivElement>,
  initialState: boolean,
): [boolean, Dispatch<SetStateAction<boolean>>] => {
  const [isActive, setIsActive] = useState<boolean>(initialState);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      // If the active element exists and is clicked outside of
      if (
        element.current !== null &&
        !element.current.contains(event.target as Node)
      ) {
        setIsActive(!isActive);
      }
    };

    console.log(isActive);

    // If the item is active (ie open) then listen for clicks outside
    if (isActive) {
      window.addEventListener("click", onClick);
    }

    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [isActive, element]);

  return [isActive, setIsActive];
};