import { useState, useEffect } from "react";
import { Select, Spin } from "antd";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { WarehouseServices } from "../../../../services/Order/WarehouseServices";
import { Warehouse } from "../../../../types/Order/Warehouse";

interface ApiResponse {
  code: number;
  message: string;
  data: {
    id: string;
    name: string;
    type: string;
    location: {
      latitude: number;
      longitude: number;
    };
  }[];
}

const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/64/2776/2776067.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const center = { lat: 14.0583, lng: 108.2772 };

const PostOfficeLocator = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [province, setProvince] = useState<string | undefined>();
  const [postOffices, setPostOffices] = useState<ApiResponse["data"]>([]);
  const [provinces, setProvinces] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    const fetchProvinces = async () => {
      setLoading(true);
      try {
        const response = await WarehouseServices.getAll();
        // Lấy danh sách tỉnh và sử dụng cả id và name để set vào options
        const provinceOptions = response.data.map((item: Warehouse) => ({
          label: item.name,
          value: item.id,
        }));
        setProvinces(provinceOptions);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
      setLoading(false);
    };
    fetchProvinces();
  }, []);

  useEffect(() => {
    if (province) {
      setLoading(true);
      const fetchPostOffices = async () => {
        try {
          const response = await WarehouseServices.getById(province);
          setPostOffices([response.data]); // Giả sử API trả về dữ liệu cho một tỉnh duy nhất
        } catch (error) {
          console.error("Error fetching post offices:", error);
        }
        setLoading(false);
      };
      fetchPostOffices();
    }
  }, [province]);

  return (
    <div className="py-10 px-5 flex flex-col md:flex-row gap-6 max-w-7xl mx-auto">
      <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-bold text-blue-600">BƯU CỤC GHN</h2>
        <Select
          placeholder="Chọn tỉnh"
          className="w-full mt-4"
          onChange={(value) => {
            setProvince(value);
            setPostOffices([]); // Reset post offices when province changes
          }}
          options={provinces}
        />
        {loading && <Spin className="mt-4 mx-auto block" />}
      </div>

      <div className="w-full md:w-2/3">
        <MapContainer center={center} zoom={6} style={mapContainerStyle}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {postOffices.map((pos) => (
            <Marker
              key={pos.id}
              position={[pos.location.latitude, pos.location.longitude]}
              icon={customIcon}
            >
              <Popup>{pos.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default PostOfficeLocator;
