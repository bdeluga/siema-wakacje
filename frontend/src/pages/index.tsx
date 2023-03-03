import { type NextPage } from "next";
import Head from "next/head";
import React, { useCallback, useRef } from "react";
import Typer from "../components/Typer";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleNotch,
  faExclamationCircle,
  faMagnifyingGlass,
  faSpinner,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { useFetch } from "../utils/hooks/useFetch";
import _ from "lodash";
import Header from "@/components/Header";

const Home: NextPage = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const cities = useFetch();
  const city = useFetch();

  const router = useRouter();

  const onChange = (value: string) => {
    if (value.length < 3) {
      cities.clear();
      return;
    }
    cities.fetch(`http://localhost:8000/city/${value}`);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounce = useCallback(_.debounce(onChange, 550), []);

  const handleSearch = () => {
    const foundCity = cities.data?.data.find(
      (city) => city.name === `${inputRef.current?.value}`
    );
    if (foundCity) {
      const { lat, lng } = foundCity;
      city.fetch(`http://localhost:8000/${inputRef.current?.value}`);
      if (city.error) console.error(city.error);
      if (!city.isFetching) {
        router.push({
          pathname: `city/${inputRef.current?.value}`,
          query: { lat, lng },
        });
      }
    }
  };

  return (
    <>
      <Head>
        <title>Siema Wakacje</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="text-blue flex min-h-screen w-screen flex-col items-center justify-start overflow-hidden bg-view bg-cover bg-center bg-no-repeat dark:bg-view-dark ">
        <Header />
        <h1 className="mt-4 w-full pl-32 text-[4rem] text-black  xl:text-[6rem]">
          Szukasz...&nbsp;
          <Typer />
        </h1>
        <p className="ml-32 self-start text-2xl font-bold italic text-gray-800 xl:text-3xl">
          My to znajdziemy.
        </p>
        <div className=" w-full pl-32">
          <div className="mt-6">
            <div className="input-group">
              <input
                type="text"
                placeholder="Wyszukaj miasta..."
                className="input-bordered input"
              />
              <button className="btn">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
