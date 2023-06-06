"use client";

import React, { useEffect, useState } from "react";
import { City, Place } from "~/app/utils/types";
import Image from "next/image";
import Rating from "../Section/Rating";
import { useDataStore, useListStore } from "~/app/utils/useStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faEdit,
  faSearch,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { env } from "~/env.mjs";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";

const Modal = () => {
  const { data, setData, open, setOpen } = useDataStore((slice) => ({
    data: slice.data,
    setData: slice.setData,
    open: slice.open,
    setOpen: slice.setOpen,
  }));
  const { list, setList } = useListStore();
  const [search, setSearch] = useState(data);
  const [queryKey, setQueryKey] = useState("hotels");
  const { city } = useParams() as { city: string };
  const { data: session } = useSession();
  useEffect(() => {
    // Define an async function to fetch data based on the queryKey
    const fetchData = async () => {
      try {
        const response: Place[] = await fetch(
          `${env.NEXT_PUBLIC_API_URL}/${city}/${queryKey}`
        ).then((res) => res.json());

        setData(response);
        setSearch(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    // Call the fetchData function when the queryKey changes
    fetchData();
  }, [queryKey, city, open, setData]);

  if (!open) return null;

  //todo change
  const handleSend = async () => {
    await fetch(`${env.NEXT_PUBLIC_API_URL}/plan/confirm`, {
      method: "POST",
      //@ts-ignore will handle it
      body: JSON.stringify({
        id: session?.user.id,
        list: list,
      }),
    });
  };
  return (
    <div
      className="absolute grid place-items-center z-[401] bg-slate-800/70
     w-screen h-screen"
    >
      <div className="bg-slate-700 shadow-md shadow-slate-700  rounded-3xl w-[1000px] h-[800px] pb-36  relative">
        <button
          className="top-3 right-4 absolute"
          onClick={() => {
            setOpen(false);
            setData([]);
            setSearch([]);
          }}
        >
          <FontAwesomeIcon icon={faX} />
        </button>
        <div className="flex gap-10 pl-4 pt-10 pb-4 justify-between items-center">
          <div className="dropdown">
            <label tabIndex={0} className="btn m-1">
              Kategoria
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <button
                  id="hotels"
                  onClick={(e) => setQueryKey(e.currentTarget.id)}
                >
                  Noclegi
                </button>
              </li>
              <li>
                <button
                  id="recreations"
                  onClick={(e) => setQueryKey(e.currentTarget.id)}
                >
                  Rekreacja
                </button>
              </li>
              <li>
                <button
                  id="history"
                  onClick={(e) => setQueryKey(e.currentTarget.id)}
                >
                  Historia
                </button>
              </li>
              <li>
                <button
                  id="restaurants"
                  onClick={(e) => setQueryKey(e.currentTarget.id)}
                >
                  Restauracje
                </button>
              </li>
              <li>
                <button
                  id="fun"
                  onClick={(e) => setQueryKey(e.currentTarget.id)}
                >
                  Zabawa
                </button>
              </li>
              <li>
                <button
                  id="night_life"
                  onClick={(e) => setQueryKey(e.currentTarget.id)}
                >
                  Nocne życie
                </button>
              </li>
            </ul>
          </div>
          <div className="form-control">
            <div className="input-group">
              <input
                type="text"
                placeholder="Search…"
                className="input input-bordered"
                onChange={(e) =>
                  setSearch(
                    data.filter((place) =>
                      place.name
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase())
                    )
                  )
                }
              />
              <button className="btn btn-square">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>
          <div className="border-l-2 w-1/2 flex gap-10 pl-10 items-center">
            <div className="dropdown dropdown-top dropdown-end">
              <label tabIndex={0} className="btn m-1 flex gap-2">
                Nadaj nazwę <FontAwesomeIcon icon={faEdit} />
              </label>
              <div
                tabIndex={0}
                className="dropdown-content card card-compact w-64 p-2 shadow bg-base-100  text-primary-content"
              >
                <input
                  type="text"
                  placeholder="Nazwa..."
                  className="input input-bordered"
                />
              </div>
            </div>
            <div className="indicator">
              <span className="indicator-item badge badge-secondary">
                {list.length}
              </span>
              <button className="btn flex gap-2" onClick={handleSend}>
                Podsumowanie
              </button>
            </div>
          </div>
        </div>
        <div className=" flex flex-col justify-start items-center flex-1 h-full w-full overflow-auto scrollbar  max-h-full ">
          {search?.map((place, idx) => (
            <button
              className="btn-ghost flex p-4"
              key={idx}
              onClick={() => {
                if (list.find((val) => val === place)) {
                  return setList(list.filter((item) => item !== place));
                }
                setList([...list, place]);
              }}
            >
              {list.find((saved) => saved === place) ? (
                <div className="h-full relative">
                  <div className="absolute w-full h-full flex justify-center items-center">
                    <FontAwesomeIcon icon={faCheck} className="text-4xl" />
                  </div>
                  <div className="opacity-10 flex h-full ">
                    <div className="mr-4 flex h-full items-center justify-center ">
                      <div className="avatar">
                        <div className="w-32 rounded">
                          <Image
                            src="/hotel.webp"
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
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Aut odio saepe unde voluptate magnam libero. Vel nobis,
                        distinctio.
                      </p>
                    </div>
                    <div className="form-control h-full justify-between">
                      <Rating rating={place.rate} />
                      <span className="btn">brak ceny</span>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mr-4 flex h-full items-center justify-center">
                    <div className="avatar">
                      <div className="w-32 rounded">
                        <Image
                          src="/hotel.webp"
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
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Aut odio saepe unde voluptate magnam libero. Vel nobis,
                      distinctio.
                    </p>
                  </div>
                  <div className="form-control h-full justify-between">
                    <Rating rating={place.rate} />
                    <span className="btn">brak ceny</span>
                  </div>{" "}
                </>
              )}
            </button>
          ))}
          {!search.length && <p className="text-2xl">Brak danych.</p>}
        </div>
      </div>
    </div>
  );
};

export default Modal;
