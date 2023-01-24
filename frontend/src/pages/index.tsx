//@ts-ignore
//@ts-nocheck
import { type NextPage } from "next";
import Head from "next/head";
import React, { useCallback, useRef, useState } from "react";
import Typer from "../components/Typer";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { City, Error } from "../types/types";

import {
  Typography,
  CardMedia,
  CardContent,
  Card,
  makeStyles,
} from "@mui/material";
import {
  faCircleNotch,
  faExclamationCircle,
  faSpinner,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { useFetch as useFetch } from "../utils/hooks/useFetch";
import _ from "lodash";
import Header from "@/components/Header";
import axios from "axios";

const Home: NextPage = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const cities = useFetch();
  const city = useFetch();
  const [data, setData] = useState<City>();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<Error>();
  const onChange = (value: string) => {
    if (value.length < 3) {
      cities.clear();
    }
    const fetch = (url: string) => {
      setError(undefined);
      setIsFetching(true);
      axios
        .get(url, { timeout: 5000 })
        .then((res) => {
          console.log(res.data);
          setData(res.data);
        })
        .catch((err) => setError({ msg: err.response.data.message }))
        .finally(() => setIsFetching(false));
    }; 
    fetch(`http://localhost:8000/search/?city=${value}`);
  };

  console.log(data);
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

  // TODO: change fetch to useFetch on both

  const router = useRouter();

  return (
    <>
      <Head>
        <title>Siema Wakacje</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="text-blue flex min-h-screen w-screen flex-col items-center justify-start overflow-hidden bg-view bg-cover bg-center bg-no-repeat  text-slate-800 ">
        <Header />
        {/* <h1 className="mt-4 w-full pl-32 text-[4rem] xl:text-[6rem]">
          Szukasz...&nbsp;
          <Typer />
        </h1>
        <p className="ml-32 self-start text-2xl font-bold italic text-gray-800 xl:text-3xl">
          My to znajdziemy. 
        </p> */}
        <div className=" w-full pl-32">
          <div className="relative mt-4 w-min">
            <input
              ref={inputRef}
              type={"text"}
              className={` h-14 w-96 rounded-md  border-gray-800 bg-slate-100 pl-2 pr-24  text-xl text-gray-800 duration-500 dark:bg-slate-600 dark:text-slate-100 ${
                cities.error &&
                "rounded-md border-2 border-l-[1rem] border-red-500"
              }`}
              placeholder="Wpisz miasto..."
              onChange={(e) => debounce(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button
              className=" absolute top-2 right-2 flex h-10 w-20  items-center justify-center rounded-md  border-2 border-slate-700 text-xl text-gray-800 duration-300 hover:bg-slate-700 hover:text-gray-100 disabled:pointer-events-none dark:border-slate-300 dark:text-slate-100 hover:dark:bg-slate-400 hover:dark:text-slate-800"
              onClick={handleSearch}
              disabled={cities.isFetching}
            >
              {city.isFetching ? (
                <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
              ) : (
                "Szukaj"
              )}
            </button>

            <div
              className={`scrollbar ${
                inputRef.current && inputRef.current.value.length > 2
                  ? "block"
                  : "block"
              } mt-2 h-fit max-h-[15rem] w-96 overflow-y-auto rounded-md bg-slate-100 p-2 transition-transform duration-300 dark:bg-slate-600`}
            >
              {/* {cities.data && cities.data.data ? ( */}
              {true ? <></> : null}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "20px",
          }}
        >
          {data?.places?.map((city, idx) => {
            return (
              // <button
              //   onClick={(e) => {
              //     if (inputRef.current)
              //       inputRef.current.value = e.currentTarget.name;
              //   }}
              //   key={idx}
              //   className="mx-auto my-2 block h-14 w-[98%] rounded-md border-2 border-slate-400 first:mt-0 last:mb-0"
              //   name={city.name}
              // >
              //   {city.name}
              //   {/* , {city.iso} */}
              // </button>
              <Card className="card" style={{ width: "300px" }}>
                <CardMedia
                  className="card-media"
                  component="img"
                  image={city.image}
                  alt={city.name}
                />
                <CardContent>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: ".5rem",
                    }}
                  >
                    <Typography
                      variant="h5"
                      component="h2"
                      className="card-title"
                    >
                      {city.name}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      component="h3"
                      className="card-subtitle"
                    >
                      {city.place_type}
                    </Typography>
                  </div>
                  <Typography
                    variant="subtitle2"
                    component="h3"
                    className="card-subtitle"
                  >
                    <a
                      href="https://www.warsawnightclub.com/the-view.html"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {city.website}
                    </a>
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    className="card-text"
                  >
                    {city.description}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    className="card-text"
                  >
                    Address: {city.address}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    className="card-text"
                    style={{ marginTop: "1rem" }}
                  >
                    Opening Hours:{" "}
                    {city.opening_hours.map((op, index) => {
                      return (
                        <ul
                          key={index}
                          style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr 1fr",
                            listStyleType: "none",
                          }}
                        >
                          <li
                            style={{
                              textAlign: "center",
                              fontSize: "14px",
                              fontWeight: "bold",
                            }}
                          >
                            {op.close_time}
                          </li>
                          <li
                            style={{
                              textAlign: "center",
                              fontSize: "14px",
                              fontWeight: "bold",
                            }}
                          >
                            {op.day_of_week}
                          </li>
                          <li
                            style={{
                              textAlign: "center",
                              fontSize: "14px",
                              fontWeight: "bold",
                            }}
                          >
                            {op.open_time}
                          </li>
                        </ul>
                      );
                    })}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    className="card-text"
                  >
                    Reviews:
                    {city.reviews.map((review, index) => (
                      <ul key={index} className="reviews-list">
                        <li>{review.user}</li>
                        <li>{review.rating}</li>
                        <li>{review.comment}</li>
                      </ul>
                    ))}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default Home;