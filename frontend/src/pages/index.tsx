import { type NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";
import Typer from "../components/Typer";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useFetch } from "../utils/hooks/useFetch";
import debounce from "lodash/debounce";
import Header from "@/components/Header";
import type { City } from "@/utils/types";
import type { AxiosError, AxiosResponse } from "axios";
import { useToastStore } from "@/useStore";

const Home: NextPage = () => {
  const { show } = useToastStore();

  const handleError = (err: AxiosError) => {
    if (err.status?.toString().startsWith("4"))
      return show({ type: "error", text: err.message });

    return show({
      type: "error",
      text: "Zewnętrzny błąd serwera. Spróbuj ponownie.",
    });
  };

  const [data, setData] = useState<City[]>([]);
  const city = useFetch();

  const handleChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (input.length <= 3) return;
    city
      .fetch(`http://localhost:8000/city/${input}`)
      .then((res: AxiosResponse<City[]>) => setData(res.data))
      .catch((err: AxiosError) => handleError(err));
  }, 550);

  return (
    <>
      <Head>
        <title>Siema Wakacje</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="text-blue flex min-h-screen w-screen flex-col items-center justify-start overflow-hidden bg-view bg-cover bg-center bg-no-repeat dark:bg-view-dark ">
        <Header />
        <h1 className="mt-4 w-full pl-32 text-[4rem] xl:text-[6rem]">
          Szukasz...&nbsp;
          <Typer />
        </h1>
        <p className="ml-32 self-start text-2xl font-bold italic xl:text-3xl">
          My to znajdziemy.
        </p>
        <div className=" w-full pl-32">
          <div className="mt-6 w-min">
            <div className="input-group ">
              <input
                type="text"
                placeholder="Wyszukaj miasta..."
                className="input-bordered input"
                onChange={handleChange}
              />
              <button className="btn">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </div>

            {city.isFetching || data.length ? (
              <div className="fit scrollbar card mt-1 flex max-h-56 w-full flex-col space-y-1 overflow-y-auto bg-base-100 p-2">
                {city.isFetching ? (
                  <>
                    <button className="btn pointer-events-none animate-pulse border-none bg-base-300" />
                    <button className="btn pointer-events-none animate-pulse border-none bg-base-300" />
                    <button className="btn pointer-events-none animate-pulse border-none bg-base-300" />
                    <button className="btn pointer-events-none animate-pulse border-none bg-base-300" />
                  </>
                ) : (
                  <>
                    {data.map((city) => (
                      <button className="btn" key={city.name}>
                        {city.name}
                      </button>
                    ))}
                  </>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
