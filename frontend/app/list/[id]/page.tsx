import React from "react";
import { env } from "~/env.mjs";
import { Place } from "~/app/utils/types";
import { notFound } from "next/navigation";
import Rating from "~/app/components/Section/Rating";

interface ApiResponse {
  id: string;
  name: string;
  list: Place[];
}

const Page = async ({
  params: { id },
}: {
  params: {
    id: string;
  };
}) => {
  const res: ApiResponse = await fetch(
    `${env.API_URL}/plan/showone/?id=${id}`
  ).then((res) => {
    if (!res.ok) notFound();

    return res.json();
  });
  return (
    <div className=" flex flex-col justify-start items-center flex-1 h-full w-full overflow-auto scrollbar  max-h-full ">
      {res.list.map((place) => (
        <>
          <div className="mr-4 flex h-full items-center justify-center">
            <div className="avatar">
              <div className="w-32 rounded">
                <img
                  src={place.img}
                  alt={place.name}
                  width={256}
                  height={256}
                />
              </div>
            </div>
          </div>
          <div className="form-control text-left">
            <span className="my-2 text-2xl font-bold underline underline-offset-4">
              {place.name}
            </span>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut odio
              saepe unde voluptate magnam libero. Vel nobis, distinctio.
            </p>
          </div>
          <div className="form-control h-full justify-between">
            <Rating rating={place.rate} />
            <span className="btn">brak ceny</span>
          </div>{" "}
        </>
      ))}
    </div>
  );
};

export default Page;
