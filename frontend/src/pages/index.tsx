import { type NextPage } from "next";
import Head from "next/head";
import React, { useCallback, useEffect, useState } from "react";
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
import { useDebounceValue } from "../utils/hooks/useDebouncedValue";

const Home: NextPage = () => {
  const [isFetchingCity, setIsFetchingCity] = useState<boolean>(false);

  const { fetch, data, isFetching, error } = useFetch();

  const handleSearch = async () => {
    setIsFetchingCity(true);
    axios
      .get(`http://localhost:8000/${inputData}`)
      .then(() => {
        router.push(inputData);
      })
      .finally(() => setIsFetchingCity(false));
  };

  const [inputData, setInput] = useState("");

  const { debouncedValue } = useDebounceValue(inputData, 350);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  const router = useRouter();

  useEffect(() => {
    if (debouncedValue) fetch(`http://localhost:8000/city/${debouncedValue}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

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
              type={"text"}
              className={` h-14 w-96 rounded-md  border-gray-800 bg-slate-100  pl-2 pr-24 text-xl text-gray-800 duration-500 ${
                error &&
                inputData.length > 0 &&
                "rounded-md border-2 border-l-[1rem] border-red-500"
              }`}
              placeholder="Wpisz miasto..."
              value={inputData}
              onChange={handleInput}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button
              className=" absolute top-2 right-2 flex h-10 w-20  items-center justify-center rounded-md  border-2 border-slate-700 text-xl text-gray-800 duration-300 hover:bg-slate-700  hover:text-gray-100 disabled:pointer-events-none"
              onClick={handleSearch}
              disabled={inputData.length < 1}
            >
              {isFetchingCity ? (
                <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
              ) : (
                "Szukaj"
              )}
            </button>
            {inputData && (
              <div className="scrollbar relative mt-2 flex min-h-[15rem]  w-96 items-center justify-center overflow-y-scroll rounded-md bg-slate-100 p-2">
                {isFetching && (
                  <FontAwesomeIcon
                    icon={faCircleNotch}
                    className="fa-spin absolute   text-4xl"
                  />
                )}
                {error && (
                  <div className="flex flex-col text-red-500">
                    <FontAwesomeIcon
                      icon={faExclamationCircle}
                      className="text-4xl"
                    />
                    <p className="mt-2">{error.msg}</p>
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
