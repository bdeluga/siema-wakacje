import React from "react";
type Props = {
  setMode: (e: React.MouseEvent) => void;
};
import NightsStayIcon from "@mui/icons-material/NightsStay";
import LightModeIcon from "@mui/icons-material/LightMode";
import ComputerIcon from "@mui/icons-material/Computer";
const SelectDiv = ({ setMode }: Props) => {
  return (
    <div className="animate-growDown absolute right-0 mt-3 flex h-fit w-40 origin-top flex-col items-start  justify-evenly rounded-md border-2 border-slate-500 bg-slate-200 pb-2 pl-1 text-slate-800 dark:bg-slate-800 dark:text-slate-100 ">
      <button
        className=" mt-2 transform rounded-md  px-1 py-1 duration-150 hover:bg-slate-400  dark:hover:bg-slate-600"
        id="dark"
        onClick={setMode}
      >
        <NightsStayIcon className="text-3xl dark:text-amber-100 " />
        <span className="mx-1.5 w-full">Tryb ciemny</span>
      </button>
      <button
        className=" mx-auto transform rounded-md px-1 py-1 duration-150 hover:bg-slate-400 dark:hover:bg-slate-600"
        id="light"
        onClick={setMode}
      >
        <LightModeIcon className="text-3xl text-yellow-500 " />
        <span className="mx-1.5 w-full ">Tryb jasny</span>
      </button>
      <button
        className=" mx-auto transform rounded-md px-1 py-1 duration-150 hover:bg-slate-400 dark:hover:bg-slate-600"
        id="system"
        onClick={setMode}
      >
        <ComputerIcon className="text-3xl text-gray-700 dark:text-gray-400" />
        <span className="mx-1.5 w-full ">System</span>
      </button>
    </div>
  );
};

export default SelectDiv;
