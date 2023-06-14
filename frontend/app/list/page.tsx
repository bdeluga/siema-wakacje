import { getServerSession } from "next-auth";
import React from "react";
import { env } from "~/env.mjs";
import { authOptions } from "~/lib/auth";
import { Place } from "../utils/types";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import ActionButtons from "./ActionButtons";

const Page = async () => {
  const handleDelete = (id: string) => {
    fetch(`${env.NEXT_PUBLIC_API_URL}/plan/remove/?id=${id}`, {
      method: "DELETE",
    });
  };

  const session = await getServerSession(authOptions);
  const userID = session?.user.id;
  const res: Place[] = await fetch(
    `${env.API_URL}/plan/showall/?id=${userID}`,
    {
      cache: "no-cache",
    }
  ).then((res) => res.json());
  return (
    <div className="w-screen h-screen grid place-items-center ">
      <div className="flex flex-col gap-2  justify-center items-center">
        <span className="font-bold text-lg">Listy użytkownika</span>
        <div className="mt-28 form-control border max-h-[700px] rounded-md scrollbar overflow-y-auto p-10 border-gray-700 shadow-sm shadow-slate-400">
          {!res.length ? (
            <p className="text-4xl text-bold">Brak zapisanych list.</p>
          ) : (
            res.map((list) => (
              <div key={list.id} className="flex gap-4">
                <Link
                  href={`list/${list.id}`}
                  className="px-20 py-4 btn-ghost btn rounded-md"
                >
                  {list.name}
                </Link>
                <ActionButtons id={list.id} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
