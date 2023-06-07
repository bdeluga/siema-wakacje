import { getServerSession } from "next-auth";
import React from "react";
import { env } from "~/env.mjs";
import { authOptions } from "~/lib/auth";
import { Place } from "../utils/types";

const Page = async () => {
  const session = await getServerSession(authOptions);
  const userID = session?.user.id;
  const res: Place[] = await fetch(
    `${env.API_URL}/plan/showall/?id=${userID}`
  ).then((res) => res.json());

  return (
    <div className="w-screen h-screen grid place-items-center">
      <div className="pt-20 form-control">
        {!res.length ? (
          <p className="text-4xl text-bold">Brak zapisanych list.</p>
        ) : (
          res.map((list) => <div key={list.id}>{list.name}</div>)
        )}
      </div>
    </div>
  );
};

export default Page;
