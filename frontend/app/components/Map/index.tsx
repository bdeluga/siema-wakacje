"use client";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/dist/styles.min.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import {
  useMarkersStore,
  useQueryKeyStore,
  useHighlightStore,
} from "~/app/utils/useStore";
//@ts-expect-error no types
import MarkerClusterGroup from "@changey/react-leaflet-markercluster";
import L, { LatLngExpression } from "leaflet";
import { useEffect, useRef } from "react";

interface Props {
  center: number[];
}

export default function LeafletMap({ center }: Props) {
  const mapRef = useRef<typeof MapContainer>(null);
  const markers = useMarkersStore((slice) => slice.markers);
  const queryKey = useQueryKeyStore((slice) => slice.queryKey);
  const highlightedPoint = useHighlightStore((slice) => slice.point);
  const markerIcon = new L.Icon({
    iconUrl: `/markers/${queryKey}.png`,
    iconSize: [40, 40],
  });

  useEffect(() => {
    if (mapRef.current && highlightedPoint) {
      //@ts-expect-error idk man
      mapRef.current.flyTo(highlightedPoint, 18, {
        duration: 1.5,
        animate: true,
      });
    }
  }, [highlightedPoint]);

  return (
    <div className="w-1/2 py-24 px-8">
      <MapContainer
        //@ts-expect-error it's correct
        ref={mapRef}
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
