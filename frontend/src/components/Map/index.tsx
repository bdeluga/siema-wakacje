import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { Point } from "@/utils/types";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

type Props = {
  position: Point;
  markers: { lat: number; lon: number }[];
};

export default function Map({ position, markers }: Props) {
  return (
    <MapContainer
      center={[position.lat, position.lng]}
      zoom={12}
      scrollWheelZoom={true}
      attributionControl={false}
      zoomControl={false}
      className="h-full w-full"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {markers?.map((marker, idx) => (
        <Marker key={idx} position={[marker.lat, marker.lon]} />
      ))}
    </MapContainer>
  );
}
