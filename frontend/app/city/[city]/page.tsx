import React from "react";
import { env } from "~/env.mjs";
import { notFound } from "next/navigation";
import Map from "~/app/components/Map";
interface Props {
  params: {
    city: string;
  };
}

export default async function Page({ params: { city } }: Props) {
  const foundCity = await fetch(`${env.API_URL}/city/${city}`).then((res) => {
    if (!res.ok) notFound();
    return res.json();
  });
  console.log(foundCity);
  return <div>{JSON.stringify(foundCity, null, 2)}</div>;
}
