import { useEffect, useRef } from "react";

// eslint-disable-next-line @typescript-eslint/ban-types
export const useClickOustside = (callBack: Function) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      //check if event is outside of Element
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callBack();
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return ref;
};
