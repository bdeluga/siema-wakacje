import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Typer from "../components/Typer";
import { useRouter } from "next/router";
import type { Error } from "../types/types";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useFetchCities } from "../utils/hooks/useFetchCities";

const Home: NextPage = () => {
  const [isFetchingCity, setIsFetchingCity] = useState<boolean>(false);
  const { fetch, cities, isFetching } = useFetchCities();

  const handleSearch = async () => {
    if (!inputData) return setFetchError({ msg: "Wpisz nazwę miasta." });

    setIsFetchingCity(true);
    axios
      .get(`http://localhost:8000/${inputData}`)
      .then(() => {
        router.push(inputData);
      })
      .catch(() => {
        setFetchError({ msg: "Nie mogliśmy znaleźć tego miasta." });
      })
      .finally(() => setIsFetchingCity(false));
  };

  const [inputData, setInput] = useState("");
  const router = useRouter();
  const [fetchError, setFetchError] = useState<Error>();
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
                fetchError?.msg &&
                "rounded-md border-2 border-l-[1rem] border-red-500"
              }`}
              placeholder="Wpisz miasto..."
              value={inputData}
              onChange={(e) => {
                if (fetchError?.msg) {
                  setFetchError({ msg: "" });
                }
                setInput(e.target.value);

                fetch(`http://localhost:8000/city/${e.target.value}`);
              }}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button
              className=" absolute top-2 right-2 flex h-10 w-20 items-center justify-center  rounded-md border-2 border-slate-700 text-xl text-gray-800 duration-300  hover:bg-slate-700 hover:text-gray-100"
              onClick={handleSearch}
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
              </div>
            )}
          </div>
          <span className="ml-4 font-bold text-red-400">{fetchError?.msg}</span>
        </div>
      </main>
    </>
  );
};

export default Home;
