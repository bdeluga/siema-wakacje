import useClickOutside from "@/utils/hooks/useClickOutside";
import useTheme, { type Theme } from "@/utils/hooks/useTheme";
import { faSun, faMoon, faDesktop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import UserBadge from "./UserBadge";
export default function Header() {
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  const { theme, setTheme } = useTheme({
    light: "corporate",
    dark: "business",
  });

  const handleChangeTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    setTheme(e.currentTarget.id as Theme);
    setIsVisible(false);
  };

  const renderIcon = () => {
    switch (theme) {
      case "dark":
        return <FontAwesomeIcon icon={faMoon} />;
      case "light":
        return <FontAwesomeIcon icon={faSun} />;
      case "system":
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? (
          <FontAwesomeIcon icon={faMoon} />
        ) : (
          <FontAwesomeIcon icon={faSun} />
        );
    }
  };

  const { isVisible, ref, setIsVisible } = useClickOutside();

  const { data: session } = useSession();

  return (
    <header className="mt-4 flex h-12 w-full items-center justify-end gap-4 pr-4">
      {mount && (
        <>
          {session ? (
            <UserBadge image={session.user.image} name={session.user.name} />
          ) : (
            <Link className="btn" href={"/login"}>
              Zaloguj się!
            </Link>
          )}

          <div ref={ref} className="relative">
            <button
              className="btn m-1 w-14"
              onClick={() => setIsVisible((prev) => !prev)}
            >
              {renderIcon()}
            </button>
            {isVisible && (
              <div className="form-control absolute z-50 w-full bg-neutral py-1 shadow">
                <button
                  className={`btn ${theme === "light" ? "text-accent" : ""}`}
                  id="light"
                  onClick={handleChangeTheme}
                >
                  <FontAwesomeIcon icon={faSun} />
                </button>

                <button
                  className={`btn ${theme === "dark" ? "text-accent" : ""}`}
                  id="dark"
                  onClick={handleChangeTheme}
                >
                  <FontAwesomeIcon icon={faMoon} />
                </button>

                <button
                  className={`btn ${theme === "system" ? "text-accent" : ""}`}
                  id="system"
                  onClick={handleChangeTheme}
                >
                  <FontAwesomeIcon icon={faDesktop} />
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </header>
  );
}
