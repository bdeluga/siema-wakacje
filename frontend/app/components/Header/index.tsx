"use client";
import UserSection from "./UserBadge";
import ThemeSwitcher from "./ThemeSwitcher";
import { useState, useEffect } from "react";

export default function Header() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <header className="absolute top-4 right-2 flex h-12 w-full items-center justify-end gap-4">
      <UserSection />
      <ThemeSwitcher />
    </header>
  );
}
