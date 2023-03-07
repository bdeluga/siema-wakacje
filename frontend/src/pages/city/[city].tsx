import Header from "@/components/Header";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dynamic from "next/dynamic";
import Head from "next/head";
import type { GetServerSideProps } from "next/types";
import { useState } from "react";

interface Props {
  name: string;
  lat: number;
  lng: number;
}

const City = ({ name, lat, lng }: Props) => {
  const [queryKey, setQueryKey] = useState("noclegi");

  const Map = dynamic(() => import("@/components/Map"), {
    loading: () => (
      <div className="flex flex-col  gap-2 text-slate-100">
        <FontAwesomeIcon className="fa-spin text-4xl" icon={faCircleNotch} />
        <span>Wczytywanie mapy...</span>
      </div>
    ),
    ssr: false,
  });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setQueryKey(e.currentTarget.id);
  };

  return (
    <>
      <Head>
        <title>{name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="form-control flex h-screen min-h-screen flex-col">
        <Header />
        <div className="my-4 flex flex-1 gap-10 p-10">
          <div className="form-control w-1/2 items-center">
            <div className="flex space-x-4">
              <button
                id="noclegi"
                className={`btn rounded ${
                  queryKey === "noclegi" ? "btn-primary" : "btn-secondary"
                }`}
                onClick={handleClick}
              >
                noclegi
              </button>
              <button
                id="rekreacja"
                className={`btn rounded ${
                  queryKey === "rekreacja" ? "btn-primary" : "btn-secondary"
                }`}
                onClick={handleClick}
              >
                rekreacja
              </button>
              <button
                id="historia"
                className={`btn rounded ${
                  queryKey === "historia" ? "btn-primary" : "btn-secondary"
                }`}
                onClick={handleClick}
              >
                historia
              </button>
              <button
                id="restauracje"
                className={`btn rounded ${
                  queryKey === "restauracje" ? "btn-primary" : "btn-secondary"
                }`}
                onClick={handleClick}
              >
                restauracje
              </button>
            </div>
          </div>
          <div className=" z-40 flex w-1/2 items-center justify-center">
            <Map lat={lat} lng={lng} />
          </div>
        </div>
      </main>
    </>
  );
};

export default City;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  //TODO: fet from url if city is real then redirect or send props
  const city = ctx.req.url?.split("/city/")[1];
  if (!city) {
    return {
      redirect: { destination: "/404", permanent: false },
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const foundCity = await fetch(
    `http://127.0.0.1:8000/city/${city.toLowerCase()}`
  ).then((res) => res.json());

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const { name, lat, lng } = foundCity.data[0];

  if (!foundCity)
    return {
      redirect: { destination: "/404", permanent: false },
    };
  return {
    props: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      name,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      lat: Number(lat),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      lng: Number(lng),
    },
  };
};
