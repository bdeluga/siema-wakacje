"use client";
import React, { useEffect, useState } from "react";
import { Place } from "~/app/utils/types";
import { useMarkersStore, useQueryKeyStore } from "~/app/utils/useStore";
import { env } from "~/env.mjs";

interface Props {
  city: string;
  set: (data: any) => void;
}

const QueryButtons = ({ city, set }: Props) => {
  const { queryKey, setKey } = useQueryKeyStore();

  const setMarkers = useMarkersStore((slice) => slice.setMarkers);

  useEffect(() => {
    // Define an async function to fetch data based on the queryKey
    const fetchData = async () => {
      try {
        const response: Place[] = await fetch(
          `${env.NEXT_PUBLIC_API_URL}/${city}/${queryKey}?search=""`
        ).then((res) => res.json());
        set(response);
        //@ts-expect-error
        setMarkers(response.map((mark) => mark.point));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetchData function when the queryKey changes
    fetchData();
  }, [queryKey, city, set, setMarkers]);

  return (
    <div className="mx-auto mt-2 flex space-x-4">
      <button
        id="hotels"
        className={`btn rounded ${
          queryKey === "hotels" ? "btn-primary" : "btn-secondary"
        }`}
        onClick={(e) => setKey(e.currentTarget.id)}
      >
        noclegi
      </button>
      <button
        id="recreations"
        className={`btn rounded ${
          queryKey === "recreations" ? "btn-primary" : "btn-secondary"
        }`}
        onClick={(e) => setKey(e.currentTarget.id)}
      >
        rekreacja
      </button>
      <button
        id="history"
        className={`btn rounded ${
          queryKey === "history" ? "btn-primary" : "btn-secondary"
        }`}
        onClick={(e) => setKey(e.currentTarget.id)}
      >
        historia
      </button>
      <button
        id="restaurants"
        className={`btn rounded ${
          queryKey === "restaurants" ? "btn-primary" : "btn-secondary"
        }`}
        onClick={(e) => setKey(e.currentTarget.id)}
      >
        restauracje
      </button>
      <button
        id="fun"
        className={`btn rounded ${
          queryKey === "fun" ? "btn-primary" : "btn-secondary"
        }`}
        onClick={(e) => setKey(e.currentTarget.id)}
      >
        zabawa
      </button>
      <button
        id="night_life"
        className={`btn rounded ${
          queryKey === "night_life" ? "btn-primary" : "btn-secondary"
        }`}
        onClick={(e) => setKey(e.currentTarget.id)}
      >
        nocne życie
      </button>
    </div>
  );
};

export default QueryButtons;
