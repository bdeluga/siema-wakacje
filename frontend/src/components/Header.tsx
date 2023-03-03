import useTheme from "@/utils/hooks/useTheme";
import React, { useEffect, useState } from "react";
import { Dropdown } from "./Dropdown";
export default function Header() {
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  const { theme, setTheme } = useTheme({
    light: "corporate",
    dark: "business",
  });

  return (
    <header className="mt-4 flex h-12 w-full items-center   justify-end gap-4 pr-4">
      {mount && (
        <>
          {theme}
          <button className="btn">Zaloguj się!</button>
          <button className="btn" onClick={() => setTheme("light")}>
            L
          </button>
          <button className="btn" onClick={() => setTheme("dark")}>
            D
          </button>
          <button className="btn" onClick={() => setTheme("system")}>
            S
          </button>
        </>
      )}
    </header>
  );
}
