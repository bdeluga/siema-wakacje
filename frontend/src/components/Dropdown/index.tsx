import React, { useState } from "react";
import { faDesktop, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useClickOustside } from "@/utils/hooks/useClickOutside";
import SelectDiv from "./SelectDiv";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Dropdown = () => {
  const [open, setOpen] = useState<boolean>(false);
  const dropDownRef = useClickOustside(setOpen);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <button onClick={handleClick} className="btn">
        zmień
      </button>
      <div className="relative" ref={dropDownRef}>
        {open && <SelectDiv />}
      </div>
    </>
  );
};
