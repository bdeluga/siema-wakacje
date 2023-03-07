import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { memo } from "react";

interface Coords {
  lat: number;
  lng: number;
}
type Props = {
  position: Coords;
  markers?: Coords[];
};

const Map = ({ position, markers }: Props) => {
  return (
    <MapContainer
      //@ts-expect-error idk man leaflet sucks
      center={[position.lat, position.lng]}
      zoom={12}
      scrollWheelZoom={true}
      zoomControl={false}
      className="h-full w-full"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {markers?.map((marker, idx) => (
        <Marker key={idx} position={[marker.lat, marker.lng]} />
      ))}
    </MapContainer>
  );
};

const MemoizedMap = memo(Map);

export default MemoizedMap;
