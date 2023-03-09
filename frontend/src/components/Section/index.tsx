import { api } from "@/utils/api";
import React, { useState } from "react";
import Image from "next/image";
import { HotelSkeleton } from "@/components/Skeleton";
import Rating from "./Rating";
type Props = {
  name: string;
};

const Section = ({ name }: Props) => {
  const [queryKey, setQueryKey] = useState("hotels");

  const { data, isFetching } = api.example.fetch.useQuery(
    `${name}/${queryKey}`,
    {
      refetchOnWindowFocus: false,
    }
  );

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setQueryKey(e.currentTarget.id);
  };

  return (
    <div className="form-control h-full w-1/2 items-center ">
      <div className="mt-2 flex space-x-4">
        <button
          id="hotels"
          className={`btn rounded ${
            queryKey === "hotels" ? "btn-primary" : "btn-secondary"
          }`}
          onClick={handleClick}
        >
          noclegi
        </button>
        <button
          id="recreations"
          className={`btn rounded ${
            queryKey === "recreations" ? "btn-primary" : "btn-secondary"
          }`}
          onClick={handleClick}
        >
          rekreacja
        </button>
        <button
          id="history"
          className={`btn rounded ${
            queryKey === "history" ? "btn-primary" : "btn-secondary"
          }`}
          onClick={handleClick}
        >
          historia
        </button>
        <button
          id="restaurants"
          className={`btn rounded ${
            queryKey === "restaurants" ? "btn-primary" : "btn-secondary"
          }`}
          onClick={handleClick}
        >
          restauracje
        </button>
      </div>
      <div className="scrollbar mt-4 grid h-full w-full gap-4 overflow-y-auto overflow-x-hidden ">
        {isFetching ? (
          <>
            <HotelSkeleton count={5} />
          </>
        ) : (
          data &&
          data.hotels.map((hotel, idx) => (
            <div className="btn-ghost flex p-4" key={idx}>
              <div className="mr-4 flex h-full items-center justify-center">
                <div className="avatar">
                  <div className="w-32 rounded">
                    <Image
                      src="/hotel.webp"
                      alt={hotel.name}
                      width={256}
                      height={256}
                    />
                  </div>
                </div>
              </div>
              <div className="form-control text-left">
                <span className="my-2 text-2xl font-bold underline underline-offset-4">
                  {hotel.name}
                </span>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
                  odio saepe unde voluptate magnam libero. Vel nobis,
                  distinctio.
                </p>
              </div>
              <div className="form-control h-full justify-between">
                <Rating rating={3} />
                <span className="btn">200zł/noc</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Section;
