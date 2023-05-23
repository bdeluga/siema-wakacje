"use client";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { City } from "~/lib/types";
import { env } from "~/env.mjs";

export default function SearchCity() {
  const [input, setInput] = useState("");
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${env.NEXT_PUBLIC_API_URL}/city/${input}`
      ).then((res) => res.json());

      setCities(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cities:", error);
      setLoading(false);
    }
  }, [input]);
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (input.length >= 3) {
        fetchData();
      } else {
        setCities([]);
      }
    }, 150);

    return () => clearTimeout(delayDebounceFn);
  }, [input, fetchData]);

  return (
    <div className=" w-full pl-32">
      <div className="mt-6 w-min">
        <div className="input-group ">
          <input
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Wyszukaj miasta..."
            className="input-bordered input"
            value={input}
          />
          <button className="btn">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>

        <div className="scrollbar card mt-1 flex max-h-56 w-full flex-col space-y-1 overflow-y-auto rounded-sm bg-base-100 p-1">
          {loading ? (
            //   <CitySkeleton count={4} />
            "loading..."
          ) : (
            <>
              {cities?.map((city, idx) => (
                <button
                  className="btn animate-none"
                  key={idx}
                  onClick={() => setInput(city.name)}
                >
                  <p>
                    {city.name}, {city.iso}
                  </p>
                </button>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
