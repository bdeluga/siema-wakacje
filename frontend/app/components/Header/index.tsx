"use client";
import UserSection from "./UserBadge";
import ThemeSwitcher from "./ThemeSwitcher";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDataStore, useListStore } from "~/app/utils/useStore";
import { useSession } from "next-auth/react";

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const setOpen = useDataStore((slice) => slice.setOpen);
  const list = useListStore((slice) => slice.list);
  const { data: session } = useSession();
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <header className="absolute top-4 right-2 flex h-12 w-full items-center justify-end gap-4">
      {session && (
        <>
          {list.length > 0 ? (
            <div className="indicator" title="You have a pending list">
              <span className="indicator-item badge badge-secondary">
                {list.length}
              </span>
              <button
                onClick={() => setOpen(true)}
                className="btn rounded-full"
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          ) : (
            <button onClick={() => setOpen(true)} className="btn rounded-full">
              <FontAwesomeIcon icon={faPlus} />
            </button>
          )}
        </>
      )}
      <UserSection />
      <ThemeSwitcher />
    </header>
  );
}
