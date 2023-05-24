import React from "react";
import { env } from "~/env.mjs";
import { notFound } from "next/navigation";
import Section from "~/app/components/Section";
import { City } from "~/app/utils/types";
import LeafletMap from "~/app/components/Map";
interface Props {
  params: {
    city: string;
  };
}

interface response {
  metadata: any;
  data: City[];
}

export default async function Page({ params: { city } }: Props) {
  const foundCity: response = await fetch(`${env.API_URL}/city/${city}`).then(
    (res) => {
      if (!res.ok) notFound();

      return res.json();
    }
  );

  const { lat, lng } = foundCity.data[0];

  return (
    <main className="flex flex-1 h-screen w-screen">
      <Section city={city} />
      <LeafletMap center={[lat, lng]} />
    </main>
  );
}
