"use client";
import UserSection from "./UserBadge";
import ThemeSwitcher from "./ThemeSwitcher";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarthEurope, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useListStore, useModalStore } from "~/app/utils/useStore";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Header() {
  const [mounted, setMounted] = useState(false);
  const setOpen = useModalStore((slice) => slice.setOpen);
  const list = useListStore((slice) => slice.list);
  const { data: session } = useSession();
  const { city } = useParams() as { city: string };
  const path = usePathname();
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <header
      className={`absolute top-4 px-10 flex h-12 w-full items-center ${
        path === "/" ? "justify-end" : "justify-between"
      }`}
    >
      {path !== "/" && (
        <Link href="/" className="flex gap-2 items-center text-2xl font-bold">
          <span className=" bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 text-transparent bg-clip-text">
            Siema Wakacje
          </span>
          <FontAwesomeIcon icon={faEarthEurope} className="text-emerald-600" />
        </Link>
      )}
      <div className="flex gap-4 items-center">
        {session && city && (
          <>
            {list.places.length > 0 ? (
              <div className="indicator" title="You have a pending list">
                <span className="indicator-item badge badge-secondary">
                  {list.places.length}
                </span>
                <button
                  onClick={() => setOpen(true)}
                  className="btn rounded-full"
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setOpen(true)}
                className="btn rounded-full"
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            )}
          </>
        )}
        <UserSection />
        <ThemeSwitcher />
      </div>
    </header>
  );
}
