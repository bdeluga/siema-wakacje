import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { Point } from "@/utils/types";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

type Props = {
  position: Point;
  markers: { lat: number; lon: number }[];
};

export default function Map({ position, markers }: Props) {
  if (!markers)
    return (
      <div className="flex flex-col  gap-2 text-slate-100">
        <FontAwesomeIcon className="fa-spin text-4xl" icon={faCircleNotch} />
        <span>Wczytywanie mapy...</span>
      </div>
    );

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
