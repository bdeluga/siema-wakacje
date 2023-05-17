import React from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faGear } from "@fortawesome/free-solid-svg-icons";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import Link from "next/link";
import useClickOutside from "@/utils/hooks/useClickOutside";

interface UserData {
  name: string;
  image: string;
}

const UserBadge = ({ name, image }: UserData) => {
  const { ref, isVisible, setIsVisible } = useClickOutside();
  return (
    <div className="relative flex h-10 items-center justify-between">
      {!isVisible ? (
        <>
          <p className="px-4">{name}</p>
          <button className="avatar" onClick={() => setIsVisible(true)}>
            <div className="mask mask-squircle relative w-14">
              <Image
                src={image}
                alt="Zdjęcie użytkownika"
                placeholder="blur"
                blurDataURL="/admin.jpg"
                fill
                sizes="100%"
              />
            </div>
          </button>
        </>
      ) : (
        <div
          className=" form-control absolute right-0 top-0  z-10 w-80 items-center space-y-4 rounded-xl bg-base-300 p-3 shadow-lg shadow-base-300"
          ref={ref}
        >
          <button
            className="btn-ghost btn self-start text-lg"
            onClick={() => setIsVisible(false)}
          >
            <FontAwesomeIcon icon={faArrowLeft as IconProp} />
          </button>
          <div className="form-control avatar mt-4 items-center">
            <div className="relative w-28 rounded-xl">
              <Image
                src={image}
                alt="Zdjęcie użytkownika"
                placeholder="blur"
                blurDataURL="/admin.jpg"
                fill
                sizes="100%"
              />
            </div>
            <p className="mt-2 text-lg font-black">{name}</p>

            <Link href="/settings" className="btn-ghost btn mt-4 text-sm">
              Edytuj profil
              <FontAwesomeIcon
                icon={faGear as IconProp}
                className="ml-4 text-xl"
              />
            </Link>
          </div>
          <div className="w-full border-t border-neutral">
            <button
              className=" btn-ghost btn mt-2 w-full"
              onClick={() => void signOut()}
            >
              WYLOGUJ
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserBadge;
