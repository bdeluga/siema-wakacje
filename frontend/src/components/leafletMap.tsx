import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type Coords = {
  lat: number;
  lng: number;
};

const Map = ({ lat, lng }: Coords) => {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={12}
      scrollWheelZoom={true}
      className=" h-5/6 w-5/6 rounded-md "
      zoomControl={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    </MapContainer>
  );
};

export default Map;
