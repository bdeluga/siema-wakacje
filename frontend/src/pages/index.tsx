import { type NextPage } from "next";
import Head from "next/head";
import Typer from "../components/typer";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Siema Wakacje</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="text-blue flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-500 to-indigo-800  text-gray-100">
        <div className="text-[7rem]">
          <span>{"Szukasz... "}</span>
          <Typer texts={["pokoju?", "restauracji?,trasy rowerowej?"]} />
          <p className="ml-4 text-3xl font-bold text-gray-800 underline underline-offset-2">
            My to znajdziemy.
          </p>
        </div>
        <div className="mt-20 flex w-full items-center justify-center gap-40 ">
          <input
            type={"text"}
            className="h-12 rounded-md border bg-gray-100 pl-2  text-xl text-gray-800"
            placeholder="Czego szukasz?"
          />
          <button className=" flex h-12 items-center justify-center rounded-md bg-[#bfccf5] px-10 text-xl text-gray-800">
            <p className="">Szukaj</p>
          </button>
        </div>
      </main>
    </>
  );
};

export default Home;
