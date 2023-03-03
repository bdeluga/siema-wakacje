import { useEffect, useState } from "react";

export type Theme = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

interface ThemeClassNames {
  light: string;
  dark: string;
}

const useTheme = ({ light, dark }: ThemeClassNames) => {
  const [theme, setTheme] = useState<Theme>("system");
  const MEDIA = "(prefers-color-scheme: dark)";
  const storageKey = "theme";
  const attr = "data-theme";

  const resolveTheme = (theme: Theme) => {
    switch (theme) {
      case "dark":
        return "dark";
      case "light":
        return "light";
      case "system":
        return window.matchMedia(MEDIA).matches ? "dark" : "light";
    }
  };

  //Initial run
  useEffect(() => {
    const storedTheme = localStorage.getItem(storageKey);
    //check if there is actually theme stored by user
    const initialTheme =
      storedTheme && storedTheme !== "system"
        ? (storedTheme as Theme)
        : undefined;
    const prefersDark = window.matchMedia(MEDIA).matches;
    const systemTheme = prefersDark ? "dark" : "light";

    const resolvedTheme = resolveTheme(initialTheme || systemTheme);
    document.documentElement.className = resolvedTheme;
    document.documentElement.setAttribute(
      attr,
      resolvedTheme === "dark" ? dark : light
    );

    if (initialTheme) {
      setTheme(initialTheme);
    }
  }, [dark, light]);

  //   every switch
  useEffect(() => {
    localStorage.setItem(storageKey, theme);
    document.documentElement.className = resolveTheme(theme);
    document.documentElement.setAttribute(attr, resolveTheme(theme));
  }, [theme]);

  return { theme, setTheme };
};

export default useTheme;
