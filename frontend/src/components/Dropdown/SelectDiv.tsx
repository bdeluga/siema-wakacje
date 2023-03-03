import useTheme, { Theme } from "@/utils/hooks/useTheme";
import { faDesktop, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const SelectDiv = () => {
  const { setTheme, theme } = useTheme({
    dark: "business",
    light: "corporate",
  });

  const handleChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    setTheme(e.currentTarget.id as Theme);
  };

  return (
    <div className="absolute right-0 mt-3 flex h-fit w-40 origin-top animate-growDown flex-col items-center justify-around rounded-md border-2 border-slate-500 bg-slate-200 pb-2 text-slate-800 dark:bg-slate-800 dark:text-slate-100 ">
      <button
        className=" mt-2 w-36 transform  rounded-md py-1 duration-150 hover:bg-slate-400  dark:hover:bg-slate-600"
        id="dark"
        onClick={handleChange}
      >
        <FontAwesomeIcon
          icon={faMoon}
          className="text-3xl dark:text-amber-100 "
        />
        <span className="mx-1.5 w-full">Tryb ciemny</span>
      </button>
      <button
        className=" mx-auto w-36 transform rounded-md py-1 duration-150 hover:bg-slate-400 dark:hover:bg-slate-600"
        id="light"
        onClick={handleChange}
      >
        <FontAwesomeIcon icon={faSun} className="text-3xl text-yellow-500 " />
        <span className="mx-1.5 w-full ">Tryb jasny</span>
      </button>
      <button
        className=" mx-auto w-36 transform rounded-md py-1 duration-150 hover:bg-slate-400 dark:hover:bg-slate-600"
        id="system"
        onClick={handleChange}
      >
        <FontAwesomeIcon
          icon={faDesktop}
          className="text-3xl text-gray-700 dark:text-gray-400"
        />
        <span className="mx-1.5 w-full ">System</span>
      </button>
    </div>
  );
};

export default SelectDiv;
