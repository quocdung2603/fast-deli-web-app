import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { LatLngTuple } from "leaflet";

interface MapModalViewerProps {
  value: { latitude: number; longitude: number };
  label: string;
}

const MapModalViewer: React.FC<MapModalViewerProps> = ({ value, label }) => {
  const mapRef = useRef<L.Map | null>(null);

  // Đảm bảo center là LatLngTuple
  const center: LatLngTuple =
    value.latitude &&
    value.longitude &&
    !isNaN(value.latitude) &&
    !isNaN(value.longitude)
      ? [value.latitude, value.longitude]
      : [21.0285, 105.8542]; // Vị trí mặc định (Hà Nội)

  // Component để cập nhật vị trí và quản lý bản đồ
  const MapUpdater = () => {
    const map = useMap();
    mapRef.current = map;

    useEffect(() => {
      if (
        value.latitude &&
        value.longitude &&
        !isNaN(value.latitude) &&
        !isNaN(value.longitude)
      ) {
        map.setView([value.latitude, value.longitude], 13);
        // Vô hiệu hóa các tương tác
        // map.dragging.disable();
        // map.touchZoom.disable();
        // map.doubleClickZoom.disable();
        // map.scrollWheelZoom.disable();
        // map.boxZoom.disable();
        // map.keyboard.disable();
        // map.zoomControl.remove();
        // // Làm mới kích thước bản đồ
        // map.invalidateSize();
      }
    }, [value, map]);

    return null;
  };

  // Tải trước tile để cache
  useEffect(() => {
    if (
      value.latitude &&
      value.longitude &&
      !isNaN(value.latitude) &&
      !isNaN(value.longitude)
    ) {
      const preloadTile = async () => {
        // Tạo một tile layer tạm để tải trước tile
        const tempLayer = L.tileLayer(
          "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          {
            attribution:
              '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            minZoom: 0,
            maxZoom: 19,
          }
        );
        // Tải tile cho khu vực hiện tại
        const bounds = L.latLngBounds([
          [value.latitude - 0.01, value.longitude - 0.01],
          [value.latitude + 0.01, value.longitude + 0.01],
        ]);
        tempLayer._preloadTiles?.(bounds, 13);
      };
      preloadTile();
    }
  }, [value]);

  return (
    <div>
      <p className="font-semibold text-sm">{label}</p>
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: "800px", width: "100%" }}
        // dragging={false}
        // touchZoom={false}
        // doubleClickZoom={false}
        // scrollWheelZoom={false}
        // boxZoom={false}
        // keyboard={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapUpdater />
        {value.latitude &&
          value.longitude &&
          !isNaN(value.latitude) &&
          !isNaN(value.longitude) && (
            <Marker position={[value.latitude, value.longitude]} />
          )}
      </MapContainer>
    </div>
  );
};

export default React.memo(MapModalViewer);
