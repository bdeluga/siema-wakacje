import { type NextPage } from "next";
import Head from "next/head";
import React, { useCallback, useRef, useState } from "react";
import Typer from "../components/Typer";
import { useRouter } from "next/router";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleNotch,
  faExclamationCircle,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { useFetch as useFetch } from "../utils/hooks/useFetch";
import _ from "lodash";

const Home: NextPage = () => {
  const [isFetchingCity, setIsFetchingCity] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const cities = useFetch();

  const onChange = (value: string) => {
    cities.fetch(`http://localhost:8000/city/${value}`);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounce = useCallback(_.debounce(onChange, 550), []);

  const handleSearch = () => {
    setIsFetchingCity(true);
    axios
      .get(`http://localhost:8000/${inputRef.current?.value}`)
      .then(() => {
        router.push("/city/" + inputRef.current?.value ?? "");
      })
      .catch((err) => console.error(err))
      .finally(() => setIsFetchingCity(false));
  };

  // TODO: Disable button on cities fetch
  // TODO: change fetch to useFetch on both

  const router = useRouter();

  return (
    <>
      <Head>
        <title>Siema Wakacje</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="text-blue flex min-h-screen w-screen flex-col items-center justify-start overflow-hidden bg-view bg-cover bg-center bg-no-repeat  text-slate-800 ">
        <h1 className="mt-4 w-full pl-32 text-[4rem] xl:text-[6rem]">
          Szukasz...&nbsp;
          <Typer />
        </h1>
        <p className="ml-32 self-start text-2xl font-bold italic text-gray-800 xl:text-3xl">
          My to znajdziemy.
        </p>
        <div className=" w-full pl-32">
          <div className="relative mt-4 w-min">
            <input
              ref={inputRef}
              type={"text"}
              className={` h-14 w-96 rounded-md  border-gray-800 bg-slate-100  pl-2 pr-24 text-xl text-gray-800 duration-500 ${
                cities.error &&
                "rounded-md border-2 border-l-[1rem] border-red-500"
              }`}
              placeholder="Wpisz miasto..."
              onChange={(e) => debounce(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button
              className=" absolute top-2 right-2 flex h-10 w-20  items-center justify-center rounded-md  border-2 border-slate-700 text-xl text-gray-800 duration-300 hover:bg-slate-700  hover:text-gray-100 disabled:pointer-events-none"
              onClick={handleSearch}
              disabled={cities.isFetching}
            >
              {isFetchingCity ? (
                <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
              ) : (
                "Szukaj"
              )}
            </button>
            {inputRef.current && inputRef.current.value && (
              <div className="scrollbar relative mt-2 flex min-h-[15rem]  w-96 items-center justify-center overflow-y-scroll rounded-md bg-slate-100 p-2">
                {cities.isFetching && (
                  <FontAwesomeIcon
                    icon={faCircleNotch}
                    className="fa-spin absolute   text-4xl"
                  />
                )}
                {cities.error && (
                  <div className="flex flex-col text-red-500">
                    <FontAwesomeIcon
                      icon={faExclamationCircle}
                      className="text-4xl"
                    />
                    <p className="mt-2">{cities.error.msg}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
