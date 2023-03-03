import { useEffect, useState } from "react";

export type Theme = "light" | "dark" | "system";
type resolvedTheme = "light" | "dark";

interface ThemeClassNames {
  light: string;
  dark: string;
}

const useTheme = ({ light, dark }: ThemeClassNames) => {
  const [theme, setTheme] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<resolvedTheme>("light");
  const MEDIA = "(prefers-color-scheme: dark)";
  const storageKey = "theme";
  const attr = "data-theme";

  const resolveTheme = (theme: Theme) => {
    let themeToResolve;
    switch (theme) {
      case "dark":
        themeToResolve = "dark";
        break;
      case "light":
        themeToResolve = "light";
        break;
      case "system":
        const prefersDark = window.matchMedia(MEDIA).matches;
        themeToResolve = prefersDark ? "dark" : "light";
        break;
    }

    return themeToResolve as resolvedTheme;
  };

  //Initial run
  useEffect(() => {
    const storedTheme = localStorage.getItem(storageKey);
    if (storedTheme) setTheme(storedTheme as Theme);
    if (!storedTheme || storedTheme === "system") {
      if (!storedTheme) localStorage.setItem(storageKey, "system");
      const prefersDark = window.matchMedia(MEDIA).matches;
      if (prefersDark) {
        setResolvedTheme(prefersDark ? "dark" : "light");
        document.documentElement.className = prefersDark ? "dark" : "light";
        document.documentElement.setAttribute(attr, prefersDark ? dark : light);
      }
    }
  }, [dark, light]);

  //   every switch
  useEffect(() => {
    console.log(theme);
  }, [theme]);

  // useEffect(() => {
  //     setResolvedTheme(resolveTheme(theme));
  //     document.documentElement.className = resolvedTheme;
  //     document.documentElement.setAttribute(
  //       attr,
  //       resolvedTheme === "light" ? light : dark
  //     );
  //     localStorage.setItem(storageKey, resolvedTheme);
  //   }, [theme, resolvedTheme, light, dark]);

  return { theme, setTheme };
};

export default useTheme;
