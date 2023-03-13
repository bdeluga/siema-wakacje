import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface Coords {
  lat: number;
  lng: number;
}
type Props = {
  position: Coords;
  markers?: Coords[];
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
        <Marker key={idx} position={[marker.lat, marker.lng]} />
      ))}
    </MapContainer>
  );
}
