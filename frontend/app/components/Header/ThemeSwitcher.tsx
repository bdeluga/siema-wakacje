"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDesktop, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import useTheme, { Theme } from "~/app/utils/hooks/useTheme";
import useClickOutside from "~/app/utils/hooks/useClickOutside";
export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme({
    light: "corporate",
    dark: "business",
  });

  const renderIcon = () => {
    switch (theme) {
      case "dark":
        return <FontAwesomeIcon icon={faMoon} />;
      case "light":
        return <FontAwesomeIcon icon={faSun} />;
      case "system":
        return window?.matchMedia("(prefers-color-scheme: dark)").matches ? (
          <FontAwesomeIcon icon={faMoon} />
        ) : (
          <FontAwesomeIcon icon={faSun} />
        );
    }
  };

  const handleChangeTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    setTheme(e.currentTarget.id as Theme);
    setIsVisible(false);
  };

  const { isVisible, ref, setIsVisible } = useClickOutside();

  return (
    <div ref={ref} className="relative z-[401]">
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
  );
};

export default ThemeSwitcher;
