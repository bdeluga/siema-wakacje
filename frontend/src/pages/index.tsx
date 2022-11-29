import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Typer from "../components/Typer";
import { useRouter } from "next/router";
import type { Error } from "../types/types";
import axios from "axios";

const Home: NextPage = () => {
  const handleSearch = async () => {
    axios
      .get(`http://localhost:8000/${input}`)
      .then(() => {
        router.push(input);
      })
      .catch(() => {
        setError({ msg: "Nie mogliśmy znaleźć tego miasta." });
      });
  };

  const [input, setInput] = useState("");
  const router = useRouter();
  const [error, setError] = useState<Error>();
  return (
    <>
      <Head>
        <title>Siema Wakacje</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="text-blue flex min-h-screen w-screen flex-col items-center justify-start bg-view bg-cover bg-center bg-no-repeat  text-slate-800 ">
        <h1 className="mt-4 w-full pl-32 text-[4rem] xl:text-[6rem]">
          Szukasz...&nbsp;
          <Typer />
        </h1>
        <p className="ml-32 self-start text-2xl font-bold italic text-gray-800 xl:text-3xl">
          My to znajdziemy.
        </p>
        <div className=" w-full p-32 pt-0">
          <div className="relative mt-4 w-min">
            <input
              type={"text"}
              className={` h-14 w-96 rounded-md  border-gray-800 bg-slate-100  pl-2 pr-24 text-xl text-gray-800 duration-500 ${
                error?.msg &&
                "rounded-md border-2 border-l-[1rem] border-red-500"
              }`}
              placeholder="Wpisz miasto..."
              value={input}
              onChange={(e) => {
                if (error?.msg) {
                  setError({ msg: "" });
                }
                setInput(e.target.value);
              }}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button
              className=" absolute top-2 right-2 flex h-10 items-center justify-center rounded-md  border-2 border-slate-700 px-2 text-xl text-gray-800 duration-300  hover:bg-slate-700 hover:text-gray-100"
              onClick={handleSearch}
            >
              Szukaj
            </button>
          </div>
          <span className="ml-4 font-bold text-red-400">{error?.msg}</span>
        </div>
      </main>
    </>
  );
};

export default Home;
