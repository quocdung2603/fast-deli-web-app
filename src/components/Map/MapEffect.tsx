import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

interface MapEffectProps {
  markers: { latitude: number; longitude: number }[];
}

const MapEffect: React.FC<MapEffectProps> = ({ markers }) => {
  const map = useMap();

  useEffect(() => {
    if (markers.length === 0) return;

    const bounds = L.latLngBounds(
      markers.map((pos) => [pos.latitude, pos.longitude])
    );

    map.fitBounds(bounds, { padding: [50, 50] }); // zoom bản đồ tới các marker
  }, [markers, map]);

  return null;
};

export default MapEffect;
