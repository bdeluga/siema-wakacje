import { type NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Siema Wakacje</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="text-blue flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-indigo-700 to-indigo-900  text-gray-100">
        <div className="text-5xl">
          <span>Szukasz </span>
          <span className="font-mono"></span>
        </div>
        <div className="mt-10 flex  w-96 items-center justify-evenly">
          <input
            type={"text"}
            className="h-10 border bg-transparent pl-2 text-lg"
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
