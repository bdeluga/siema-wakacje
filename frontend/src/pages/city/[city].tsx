import Head from "next/head";
import { useRouter } from "next/router";
import { useRef } from "react";
import { useFetch } from "../../utils/hooks/useFetch";

const City = () => {
  const router = useRouter();
  const { city } = router.query;
  const cities = useFetch();
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <Head>
        <title>{city}</title>
      </Head>
      <main className=" flex h-screen min-h-screen w-screen bg-slate-700">
        <div className="flex h-full w-1/2 flex-col p-32 pt-20 text-center">
          {/* 
          <input
            ref={inputRef}
            type={"text"}
            className={` h-14 w-96 rounded-md  bg-slate-600 pl-2  text-xl text-slate-100 duration-500 ${
              cities.error &&
              "rounded-md border-2 border-l-[1rem] border-red-500"
            }`}
            value={`${city}`}
            readOnly
          /> */}
          <h1 className="text-4xl text-slate-100  drop-shadow-md">Warszawa</h1>
          <div className="mt-10 flex-grow ">elo</div>
        </div>
        <div className="h-full w-1/2"></div>
      </main>
    </>
  );
};

export default City;
