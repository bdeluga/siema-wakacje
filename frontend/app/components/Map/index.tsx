"use client";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/dist/styles.min.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { useMarkersStore, useQueryKeyStore } from "~/app/utils/useStore";
//@ts-expect-error no types
import MarkerClusterGroup from "@changey/react-leaflet-markercluster";
import L, { LatLngExpression } from "leaflet";
import { Point } from "~/app/utils/types";

interface Props {
  center: number[];
}

export default function LeafletMap({ center }: Props) {
  const markers = useMarkersStore((slice) => slice.markers);
  const queryKey = useQueryKeyStore((slice) => slice.queryKey);

  const markerIcon = new L.Icon({
    iconUrl: `/markers/${queryKey}.png`,
    iconSize: [40, 40],
  });
  return (
    <div className="w-1/2 py-24 px-8">
      <MapContainer
        center={center as LatLngExpression}
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
              //@ts-expect-error
              position={[marker.lat, marker.lon]}
              icon={markerIcon}
            />
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}
