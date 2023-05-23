import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/dist/styles.min.css";
import type { Point } from "@/utils/types";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { useQueryKeyStore } from "@/useStore";
import L from "leaflet";
//@ts-expect-error missing declaration
import MarkerClusterGroup from "@changey/react-leaflet-markercluster";
type Props = {
  position: Point;
  markers: { lat: number; lon: number }[];
};

export default function Map({ position, markers }: Props) {
  const { queryKey } = useQueryKeyStore();

  if (!markers)
    return (
      <div className="flex flex-col  gap-2 text-slate-100">
        <FontAwesomeIcon className="fa-spin text-4xl" icon={faCircleNotch} />
        <span>Wczytywanie mapy...</span>
      </div>
    );

  const markerIcon = new L.Icon({
    iconUrl: `/markers/${queryKey}.png`,
    iconSize: [40, 40],
  });

  return (
    <MapContainer
      center={[position.lat, position.lng]}
      zoom={16}
      scrollWheelZoom={true}
      attributionControl={false}
      zoomControl={false}
      className="h-full w-full"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <MarkerClusterGroup>
        {markers?.map((marker, idx) => (
          <Marker
            key={idx}
            position={[marker.lat, marker.lon]}
            icon={markerIcon}
          />
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}