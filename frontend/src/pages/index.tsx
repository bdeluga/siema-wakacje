import { type NextPage } from "next";
import Head from "next/head";
import React, { useRef, useState } from "react";
import Typer from "@/components/Typer";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useFetch } from "@/utils/hooks/useFetch";
import debounce from "lodash/debounce";
import Header from "@/components/Header";
import type { City } from "@/utils/types";
import type { AxiosError, AxiosResponse } from "axios";
import { useToastStore } from "@/useStore";
import { CitySkeleton } from "@/components/Skeleton";

const Home: NextPage = () => {
  const { show } = useToastStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSubmit = async () => {
    if (inputRef.current) await router.push(`city/${inputRef.current?.value}`);
  };

  const handleError = (err: AxiosError) => {
    if (err.response && err.response.status?.toString().startsWith("4")) {
      setData([]);
      return show({
        type: "error",
        text: (err.response.data as { message: string }).message,
      });
    }
    setData([]);
    show({
      type: "error",
      text: "Zewnętrzny błąd serwera. Spróbuj ponownie.",
    });
  };

  const [data, setData] = useState<City[]>([]);
  const city = useFetch();

  const handleChange = debounce(() => {
    const input = inputRef.current?.value || "";

    if (input.length < 3) return setData([]);
    city
      .fetch(`http://127.0.0.1:8000/city/${input}`)

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      .then((res: AxiosResponse) => setData(res.data.data))
      .catch((err: AxiosError) => handleError(err));
  }, 550);

  return (
    <>
      <Head>
        <title>Siema Wakacje</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="form-control min-h-screen w-screen items-center justify-start bg-view bg-cover bg-center dark:bg-view-dark ">
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
                ref={inputRef}
              />
              <button className="btn" onClick={() => void handleSubmit()}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </div>

            {city.isFetching || data.length ? (
              <div className="scrollbar card mt-1 flex max-h-56 w-full flex-col space-y-1 overflow-y-auto rounded-sm bg-base-100 p-1">
                {city.isFetching ? (
                  <CitySkeleton count={4} />
                ) : (
                  <>
                    {data.map((city, idx) => (
                      <button
                        className="btn animate-none"
                        key={idx}
                        onClick={() => {
                          if (inputRef.current)
                            inputRef.current.value = city.name;
                        }}
                      >
                        <p>
                          {city.name}, {city.iso}
                        </p>
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
