import Header from "@/components/Header";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dynamic from "next/dynamic";
import Head from "next/head";
import type { GetServerSideProps } from "next/types";
import { useState } from "react";
import { api } from "@/utils/api";
import Image from "next/image";
interface Props {
  name: string;
  lat: number;
  lng: number;
}

const City = ({ name, lat, lng }: Props) => {
  const [queryKey, setQueryKey] = useState("hotels");

  const { data, isFetching } = api.example.fetch.useQuery(
    `${name}/${queryKey}`,
    {
      refetchOnWindowFocus: false,
    }
  );

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
      <main className="form-control flex h-screen flex-col">
        <Header />
        <div className="m-10 flex flex-1 gap-10 overflow-hidden ">
          <div className="form-control h-full w-1/2 items-center ">
            <div className="mt-2 flex space-x-4">
              <button
                id="hotels"
                className={`btn rounded ${
                  queryKey === "hotels" ? "btn-primary" : "btn-secondary"
                }`}
                onClick={handleClick}
              >
                noclegi
              </button>
              <button
                id="recreations"
                className={`btn rounded ${
                  queryKey === "recreations" ? "btn-primary" : "btn-secondary"
                }`}
                onClick={handleClick}
              >
                rekreacja
              </button>
              <button
                id="history"
                className={`btn rounded ${
                  queryKey === "history" ? "btn-primary" : "btn-secondary"
                }`}
                onClick={handleClick}
              >
                historia
              </button>
              <button
                id="restaurants"
                className={`btn rounded ${
                  queryKey === "restaurants" ? "btn-primary" : "btn-secondary"
                }`}
                onClick={handleClick}
              >
                restauracje
              </button>
            </div>
            <div className="scrollbar mt-4 grid h-full gap-4 overflow-y-auto overflow-x-hidden">
              {isFetching ? (
                <div>Wczytywanie...</div>
              ) : (
                data &&
                data.hotels.map((hotel, idx) => (
                  <button className="btn-ghost flex p-4" key={idx}>
                    <div className="mr-4 flex h-full items-center justify-center">
                      <div className="avatar">
                        <div className="w-32 rounded">
                          <Image
                            src="/hotel.webp"
                            alt={hotel.name}
                            width={256}
                            height={256}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-control text-left">
                      <span className="my-2 text-2xl font-bold underline underline-offset-4">
                        {hotel.name}
                      </span>
                      <p className="">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Aut odio saepe unde voluptate magnam libero. Vel nobis,
                        distinctio.
                      </p>
                    </div>
                    <div className="form-control h-full justify-between">
                      <div className="rating">
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2"
                        />
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2"
                          checked
                        />
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2"
                        />
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2"
                        />
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2"
                        />
                      </div>
                      <span className="btn">200zł/noc</span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
          <div className="z-40 flex w-1/2 items-center justify-center">
            <Map position={{ lat, lng }} />
          </div>
        </div>
      </main>
    </>
  );
};

export default City;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
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
