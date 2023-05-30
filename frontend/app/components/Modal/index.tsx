"use client";

import React, { useState } from "react";
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

const Modal = () => {
  const { data, open, setOpen } = useDataStore((slice) => ({
    data: slice.data,
    open: slice.open,
    setOpen: slice.setOpen,
  }));
  const { list, setList } = useListStore();
  const [search, setSearch] = useState(data);
  console.log("search =>", search);

  if (!open) return null;

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
            setSearch(data);
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
                <button>Noclegi</button>
              </li>
              <li>
                <button>Rekreacja</button>
              </li>
              <li>
                <button>Historia</button>
              </li>
              <li>
                <button>Restauracje</button>
              </li>
              <li>
                <button>Zabawa</button>
              </li>
              <li>
                <button>Nocne życie</button>
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
              <button className="btn flex gap-2">Podsumowanie</button>
            </div>
          </div>
        </div>
        <div className=" flex flex-col justify-start items-center flex-1 h-full w-full overflow-auto scrollbar  max-h-full ">
          {search.map((place, idx) => (
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
