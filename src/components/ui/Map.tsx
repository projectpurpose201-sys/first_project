import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
// You might need to manually import marker icons if they don't show up
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;


interface MapProps {
  center: LatLngExpression;
  zoom?: number;
  markers?: { position: LatLngExpression; popupText: string }[];
  route?: LatLngExpression[];
  className?: string;
}

export const Map: React.FC<MapProps> = ({
  center,
  zoom = 13,
  markers = [],
  route = [],
  className = 'h-64 w-full rounded-lg',
}) => {
  return (
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={true} className={className}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((marker, idx) => (
        <Marker key={idx} position={marker.position}>
          <Popup>{marker.popupText}</Popup>
        </Marker>
      ))}
      {route.length > 0 && <Polyline pathOptions={{ color: 'blue' }} positions={route} />}
    </MapContainer>
  );
};
