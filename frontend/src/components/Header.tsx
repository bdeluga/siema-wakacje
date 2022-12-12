import React, { useEffect, useState } from "react";
import { Dropdown } from "./Dropdown";
export default function Header() {
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  return (
    <header className="flex h-12 w-full items-center   justify-end gap-4 pr-4">
      <button className="rounded-md border-[3px] border-slate-700 px-2 py-0.5 duration-300 hover:bg-slate-700 hover:text-slate-100">
        Zaloguj się!
      </button>
      {mount && <Dropdown />}
    </header>
  );
}
