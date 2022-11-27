import { type NextPage } from "next";
import Head from "next/head";
import Typer from "../components/Typer";

const handleSearch = () => {
  console.log("API");
};

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Siema Wakacje</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="text-blue flex min-h-screen w-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-500 to-indigo-800  text-gray-100">
        <h1 className="w-full p-32 pb-0 text-[6rem]">
          Szukasz...&nbsp;
          <Typer />
          <p className="ml-4 text-3xl font-bold text-gray-800">
            My to znajdziemy.
          </p>
        </h1>
        <div className=" w-full p-32 pt-0">
          <div className="relative ml-4 mt-8 w-min ">
            <input
              type={"text"}
              className=" h-14 w-96 rounded-md  bg-gray-100  pl-2 pr-24 text-xl text-gray-800"
              placeholder="Czego szukasz?"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button
              className=" absolute top-2 right-2 flex h-10 items-center justify-center rounded-md  border-2 border-slate-700 px-2 text-xl text-gray-800 duration-300  hover:bg-slate-700 hover:text-gray-100"
              onClick={handleSearch}
            >
              Szukaj
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
