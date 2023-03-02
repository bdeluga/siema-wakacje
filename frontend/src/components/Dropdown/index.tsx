import React, { useState } from "react";
import { faDesktop, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useClickOustside } from "@/utils/hooks/useClickOutside";
import { useTheme } from "next-themes";
import SelectDiv from "./SelectDiv";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Dropdown = () => {
  const [open, setOpen] = useState<boolean>(false);
  const dropDownRef = useClickOustside(setOpen);
  const handleClick = () => {
    setOpen(!open);
  };
  const { theme, setTheme } = useTheme();

  const handleChangeMode = (e: React.MouseEvent) => {
    setTheme((e.currentTarget as HTMLButtonElement).id);
    setOpen(false);
  };

  return (
    <div className="relative " ref={dropDownRef}>
      <button onClick={handleClick} className="btn">
        {theme === "dark" && (
          <FontAwesomeIcon icon={faMoon} className="dark:text-amber-100 " />
        )}
        {theme === "light" && (
          <FontAwesomeIcon icon={faSun} className="text-yellow-500 " />
        )}
        {theme === "system" && (
          <FontAwesomeIcon
            icon={faDesktop}
            className="text-gray-700 dark:text-gray-300"
          />
        )}
      </button>
      {open && <SelectDiv setMode={handleChangeMode} />}
    </div>
  );
};
