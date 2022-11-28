import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import Typer from "../components/Typer";

const Home: NextPage = () => {
  const [input, setInput] = useState("");
  return (
    <>
      <Head>
        <title>Siema Wakacje</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="text-blue flex min-h-screen w-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-500  to-indigo-800 text-gray-100">
        <h1 className="w-full p-32 pb-0 text-[4rem] xl:text-[6rem]">
          Szukasz...&nbsp;
          <Typer />
          <p className="ml-4  text-2xl font-bold text-gray-800 xl:text-3xl">
            My to znajdziemy.
          </p>
        </h1>
        <div className=" w-full p-32 pt-0">
          <div className="relative ml-4 mt-8 w-min ">
            <input
              type={"text"}
              className=" h-14 w-96 rounded-md  bg-gray-100  pl-2 pr-24 text-xl text-gray-800"
              placeholder="Czego szukasz?"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Link
              className=" absolute top-2 right-2 flex h-10 items-center justify-center rounded-md  border-2 border-slate-700 px-2 text-xl text-gray-800 duration-300  hover:bg-slate-700 hover:text-gray-100"
              href={`/${input}`}
            >
              Szukaj
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
