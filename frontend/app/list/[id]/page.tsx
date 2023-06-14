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
  console.log("res", res);
  return (
    <div className=" flex flex-col justify-center items-center h-screen w-full overflow-auto scrollbar ">
      <h1 className="text-center font-bold text-2xl uppercase">{res.name}</h1>
      <div className="max-h-[700px] overflow-y-auto scrollbar space-y-4">
        {res.list.map((place) => (
          <div key={place.id} className="flex p-4 bg-gray-800 rounded-md">
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
            <div className="form-control text-left max-w-2xl">
              <span className="my-2 text-2xl font-bold underline underline-offset-4">
                {place.name}
              </span>
              <p className="truncate">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
                odio saepe unde voluptate magnam libero. Vel nobis, distinctio.
              </p>
            </div>
            <div className="form-control justify-between">
              <Rating rating={place.rate} />
              <span className="btn">brak ceny</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
