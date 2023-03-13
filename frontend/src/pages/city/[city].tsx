import Header from "@/components/Header";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dynamic from "next/dynamic";
import Head from "next/head";
import type { GetServerSideProps } from "next/types";
import CitySection from "../../components/Section";
interface Props {
  name: string;
  lat: number;
  lng: number;
}

const City = ({ name, lat, lng }: Props) => {
  const Map = dynamic(() => import("@/components/Map"), {
    loading: () => (
      <div className="flex flex-col  gap-2 text-slate-100">
        <FontAwesomeIcon className="fa-spin text-4xl" icon={faCircleNotch} />
        <span>Wczytywanie mapy...</span>
      </div>
    ),
    ssr: false,
  });

  return (
    <>
      <Head>
        <title>{name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="form-control flex h-screen flex-col">
        <Header />
        <div className="m-10 flex flex-1 gap-10 overflow-hidden ">
          <CitySection />
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

  //fetch city data from api server
  const foundCity = await fetch(
    `http://127.0.0.1:8000/city/${city.toLowerCase()}`
  ).then(
    (res) =>
      res.json() as Promise<{
        data: { name: string; lat: string; lng: string }[];
      }>
  );

  // not found, redirect to 404
  if (!foundCity.data || !foundCity.data[0]) {
    return {
      redirect: { destination: "/404", permanent: false },
    };
  }

  //destructure data
  const [{ name, lat, lng }] = foundCity.data;

  //return props
  return {
    props: {
      name,
      lat: Number(lat),
      lng: Number(lng),
    },
  };
};
