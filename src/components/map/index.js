import "leaflet/dist/leaflet.css";
import React from "react";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  Tooltip,
} from "react-leaflet";
import MarkerIcon from "../../assets/icons/marker-icon.png";

const icon = L.icon({ iconUrl: MarkerIcon });

export const Map = ({
  latitude,
  longitude,
  width = "300px",
  height = "300px",
  marcadores,
  zoom = 16,
}) => {
  if (!latitude && !longitude) return null;
  const position = [latitude, longitude];

  return (
    <MapContainer
      center={position}
      zoom={zoom}
      scrollWheelZoom
      style={{ height, width }}
    >
      <ChangeView center={position} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {marcadores?.map((marcador, idx) => {
        const keyMap = `${marcador.latitude}_idx_${idx}`;
        return (
          <Marker
            key={keyMap}
            position={[marcador.latitude || "0", marcador.longitude || "0"]}
            icon={marcador.icon || icon}
          >
            {marcador.tooltip && (
                <Tooltip>{marcador.tooltip}</Tooltip>
            )}
          </Marker>
        );
      })}
    </MapContainer>
  );
};

const ChangeView = ({ center }) => {
  const map = useMap();
  map.flyTo(center, 17, {
    animate: true,
  });

  return null;
};
