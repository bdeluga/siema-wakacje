"use client";

import React, { useState } from "react";
import Rating from "./Rating";
import QueryButtons from "../QueryButtons";
import { Place, Point } from "~/app/utils/types";
import { useHighlightStore } from "~/app/utils/useStore";

interface Props {
  city: string;
}

const Section = ({ city }: Props) => {
  const setPoint = useHighlightStore((slice) => slice.setPoint);
  const [data, setData] = useState<Place[]>([]);
  return (
    <div className="w-1/2 py-12 h-full form-control justify-center items-start gap-y-4">
      <h1 className=" self-center text-xl font-bold capitalize">{city}</h1>
      <QueryButtons city={city} set={setData} />
      <div className="scrollbar mt-4 grid w-full gap-4 p-10 overflow-y-auto overflow-x-hidden h-full">
        {data.map((place) => (
          <button
            className="btn-ghost flex p-4"
            key={place.id}
            onClick={() => setPoint(place.point as unknown as Point)}
          >
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
                odio saepe unde voluptate magnam libero. Vel nobis, distinctio.
              </p>
            </div>
            <div className="form-control h-full justify-between">
              <Rating rating={place.rate} />
              <span className="btn">brak ceny</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Section;
