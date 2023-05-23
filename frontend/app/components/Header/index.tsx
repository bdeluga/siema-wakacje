import Link from "next/link";
import UserBadge from "./UserBadge";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Header() {
  return (
    <header className="absolute top-2 right-2 flex h-12 w-full items-center justify-end gap-4">
      <UserBadge />
      <ThemeSwitcher />
      <Link href={"login"}>Login</Link>
      <Link href={"register"}>Register</Link>
    </header>
  );
}
