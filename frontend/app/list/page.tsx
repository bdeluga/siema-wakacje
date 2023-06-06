import { getServerSession } from "next-auth";
import React from "react";
import { env } from "~/env.mjs";
import { authOptions } from "~/lib/auth";
import { Place } from "../utils/types";

const Page = async () => {
  const session = await getServerSession(authOptions);
  const userID = session?.user.id;
  const res: Place[] = await fetch(`${env.API_URL}/plan/show`, {
    method: "POST",
    body: JSON.stringify({ id: userID }),
  }).then((res) => res.json());
  return (
    <div className="w-screen h-screen">
      <div className="pt-20 form-control">{JSON.stringify(res)}</div>
    </div>
  );
};

export default Page;
