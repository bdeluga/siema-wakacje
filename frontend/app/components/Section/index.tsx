import React from "react";
import Image from "next/image";
// import { HotelSkeleton } from "@/components/Skeleton";
import Rating from "./Rating";

import type { Hotel } from "~/lib/types";

interface Props {
  data: Hotel[] | undefined;
}

const Section = ({ data }: Props) => {
  return (
    <div className="form-control h-full items-center pb-14 ">
      <div className="scrollbar mt-4 grid h-full w-full gap-4 overflow-y-auto overflow-x-hidden ">
        {!data ? (
          <>
            {/* <HotelSkeleton count={5} /> */}
            loading...
          </>
        ) : (
          data?.map((hotel, idx) => (
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
                <Rating rating={hotel.rate} />
                <span className="btn">brak ceny</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Section;
