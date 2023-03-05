import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next/types";
import FourOhFour from "../404";

const City = () => {
  const router = useRouter();

  const { city, lat, lng } = router.query;
  if (!lat || !lng) return <FourOhFour />;
  console.log(Number(lat), Number(lng));
  const Map = dynamic(() => import("@/components/leafletMap"), {
    loading: () => (
      <div className="flex flex-col  gap-2 text-slate-100">
        <FontAwesomeIcon className="fa-spin text-4xl" icon={faCircleNotch} />
        <span>Wczytywanie mapy...</span>
      </div>
    ),
    ssr: false,
  });
  // const cities = useFetch();
  // const inputRef = useRef<HTMLInputElement>(null);
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
          <h1 className="text-4xl text-slate-100  drop-shadow-md">{city}</h1>
          <div className="mt-10 flex-grow "></div>
        </div>
        <div className="flex h-full w-1/2 items-center justify-center">
          <Map lat={Number(lat)} lng={Number(lng)} />
        </div>
      </main>
    </>
  );
};

export default City;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  //TODO: fet from url if city is real then redirect or send props
  ctx.req.url;
  return {
    props: {},
  };
};
