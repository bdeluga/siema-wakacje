import React, { useState } from "react";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import LightModeIcon from "@mui/icons-material/LightMode";
import ComputerIcon from "@mui/icons-material/Computer";
import { useClickOustside } from "@/utils/hooks/useClickOutside";
import { useTheme } from "next-themes";
import SelectDiv from "./SelectDiv";

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
      <button
        onClick={handleClick}
        className="flex items-center justify-center rounded-md bg-slate-700 p-1"
      >
        {theme === "dark" && (
          <NightsStayIcon className="text-3xl dark:text-amber-100 " />
        )}
        {theme === "light" && (
          <LightModeIcon className="text-3xl text-yellow-500 " />
        )}
        {theme === "system" && (
          <ComputerIcon className="text-3xl text-gray-700 dark:text-gray-300" />
        )}
      </button>
      {open && <SelectDiv setMode={handleChangeMode} />}
    </div>
  );
};
