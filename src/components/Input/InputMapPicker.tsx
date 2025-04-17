import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import { GeoPoint } from "../../types/GeoPoint";
import L from "leaflet";

const WarehouseIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/64/2776/2776067.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

interface SingleMapPickerProps {
  value: GeoPoint;
  onChange: (val: GeoPoint) => void;
  multiple?: false;
  maxMarkers?: number;
  AdditionalLocations?: GeoPoint[];
}

interface MultiMapPickerProps {
  value: GeoPoint[];
  onChange: (val: GeoPoint[]) => void;
  multiple: true;
  maxMarkers?: number;
  AdditionalLocations?: GeoPoint[];
}

type MapPickerProps = SingleMapPickerProps | MultiMapPickerProps;

const InputMapPicker: React.FC<MapPickerProps> = ({
  value,
  onChange,
  multiple = false,
  maxMarkers = 5,
  AdditionalLocations = [],
}) => {
  const defaultPosition: [number, number] = [14.0583, 108.2772];

  const [positions, setPositions] = useState<GeoPoint[]>(() => {
    if (multiple) {
      return Array.isArray(value) && value.length > 0 ? value : [];
    }

    const point = value as GeoPoint;
    if (point?.latitude !== 0 && point?.longitude !== 0) {
      return [point];
    }

    return [];
  });

  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setMapReady(true), 0); // đảm bảo map render sau khi khởi tạo vị trí
  }, []);

  const LocationMarkers = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        const newLocation = { latitude: lat, longitude: lng };

        if (multiple) {
          if (positions.length >= maxMarkers) {
            alert(`Chỉ được chọn tối đa ${maxMarkers} vị trí.`);
            return;
          }
          const updated = [...positions, newLocation];
          setPositions(updated);
          (onChange as (val: GeoPoint[]) => void)(updated);
        } else {
          setPositions([newLocation]);
          (onChange as (val: GeoPoint) => void)(newLocation);
        }
      },
    });

    const handleRemoveMarker = (index: number) => {
      const updated = positions.filter((_, i) => i !== index);
      setPositions(updated);
      if (multiple) {
        (onChange as (val: GeoPoint[]) => void)(updated);
      } else {
        (onChange as (val: GeoPoint) => void)(
          updated[0] || { latitude: 0, longitude: 0 }
        );
      }
    };

    // Hàm xử lý khi click vào Marker trong AdditionalLocations
    const handleAdditionalMarkerClick = (pos: GeoPoint) => {
      const newLocation = { latitude: pos.latitude, longitude: pos.longitude };

      // Kiểm tra xem đã có Marker tại vị trí này trong positions chưa
      const existingMarkerIndex = positions.findIndex(
        (p) => p.latitude === newLocation.latitude && p.longitude === newLocation.longitude
      );

      if (existingMarkerIndex !== -1) {
        // Nếu đã có Marker, xóa nó
        handleRemoveMarker(existingMarkerIndex);
      } else {
        // Nếu chưa có, thêm Marker mới
        if (multiple) {
          if (positions.length >= maxMarkers) {
            alert(`Chỉ được chọn tối đa ${maxMarkers} vị trí.`);
            return;
          }
          const updated = [...positions, newLocation];
          setPositions(updated);
          (onChange as (val: GeoPoint[]) => void)(updated);
        } else {
          setPositions([newLocation]);
          (onChange as (val: GeoPoint) => void)(newLocation);
        }
      }
    };

    return (
      <>
        {positions.map((pos, idx) => (
          <Marker
            key={idx}
            position={[pos.latitude, pos.longitude]}
            eventHandlers={{
              click: () => handleRemoveMarker(idx),
            }}
          />
        ))}
        {AdditionalLocations.map((pos, idx) => (
          <Marker
            key={`additional-${idx}`}
            position={[pos.latitude, pos.longitude]}
            icon={WarehouseIcon}
            eventHandlers={{
              click: () => handleAdditionalMarkerClick(pos),
            }}
          />
        ))}
      </>
    );
  };

  useEffect(() => {
    if (multiple && Array.isArray(value)) {
      setPositions(value);
    } else if (
      !multiple &&
      (value as GeoPoint).latitude &&
      (value as GeoPoint).longitude
    ) {
      setPositions([value as GeoPoint]);
    }
  }, [value, multiple]);

  const center: [number, number] =
    positions.length > 0
      ? [positions[0].latitude, positions[0].longitude]
      : defaultPosition;

  const handleClearAll = () => {
    setPositions([]);
    if (multiple) {
      (onChange as (val: GeoPoint[]) => void)([]);
    } else {
      (onChange as (val: GeoPoint) => void)({ latitude: 0, longitude: 0 });
    }
  };

  return (
    <div>
      {mapReady && (
        <MapContainer
          center={center}
          zoom={6}
          scrollWheelZoom={true}
          style={{ height: "700px", width: "100%" }}
        >
          <TileLayer
            attribution="© OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarkers />
        </MapContainer>
      )}

      {multiple && positions.length > 0 && (
        <button
          onClick={handleClearAll}
          style={{
            marginTop: "10px",
            backgroundColor: "#dc2626",
            color: "white",
            padding: "8px 12px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Xóa tất cả vị trí
        </button>
      )}
    </div>
  );
};

export default InputMapPicker;