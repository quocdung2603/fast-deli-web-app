import { useState, useEffect } from "react";
import { Select, Spin } from "antd";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

// Biểu tượng marker mặc định cho Leaflet
const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/64/2776/2776067.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const center = { lat: 14.0583, lng: 108.2772 }; // Trung tâm Việt Nam

const PostOfficeLocator = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [city, setCity] = useState<string | undefined>();
  const [district, setDistrict] = useState<string | undefined>();
  const [postOffices, setPostOffices] = useState<
    { lat: number; lng: number; name: string }[]
  >([]);

  // Danh sách tỉnh/thành phố
  const cities = ["Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng", "Cần Thơ"];
  const districts: { [key: string]: string[] } = {
    "Hà Nội": ["Ba Đình", "Hoàn Kiếm", "Tây Hồ"],
    "TP. Hồ Chí Minh": ["Quận 1", "Quận 3", "Quận 7"],
    "Đà Nẵng": ["Hải Châu", "Thanh Khê"],
    "Cần Thơ": ["Ninh Kiều", "Bình Thủy"],
  };

  useEffect(() => {
    if (city && district) {
      setLoading(true);
      // Giả lập API lấy vị trí bưu cục
      setTimeout(() => {
        setPostOffices([
          { lat: 10.7769, lng: 106.7009, name: "Bưu cục 1 - HCM" },
          { lat: 10.762, lng: 106.682, name: "Bưu cục 2 - HCM" },
        ]);
        setLoading(false);
      }, 1000);
    }
  }, [city, district]);

  return (
    <div className="py-10 px-5 flex flex-col md:flex-row gap-6 max-w-7xl mx-auto">
      {/* Form chọn tỉnh/thành và quận/huyện */}
      <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-bold text-blue-600">BƯU CỤC GHN</h2>
        <Select
          placeholder="Chọn tỉnh/Thành phố"
          className="w-full mt-4"
          onChange={(value) => {
            setCity(value);
            setDistrict(undefined);
            setPostOffices([]); // Xóa danh sách bưu cục khi thay đổi thành phố
          }}
          options={cities.map((c) => ({ label: c, value: c }))}
        />
        <Select
          placeholder="Chọn Quận/huyện"
          className="w-full mt-4"
          value={district}
          disabled={!city}
          onChange={(value) => setDistrict(value)}
          options={(city ? districts[city] : []).map((d) => ({
            label: d,
            value: d,
          }))}
        />
        {loading && <Spin className="mt-4 mx-auto block" />}
      </div>

      {/* Bản đồ React Leaflet */}
      <div className="w-full md:w-2/3">
        <MapContainer center={center} zoom={6} style={mapContainerStyle}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {postOffices.map((pos, index) => (
            <Marker key={index} position={[pos.lat, pos.lng]} icon={customIcon}>
              <Popup>{pos.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default PostOfficeLocator;
