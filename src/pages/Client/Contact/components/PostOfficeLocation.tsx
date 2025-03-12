import { useState, useEffect } from "react";
import { Select, Spin } from "antd";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

const center = { lat: 14.0583, lng: 108.2772 }; // Việt Nam

const PostOfficeLocator = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [city, setCity] = useState<string | undefined>();
  const [district, setDistrict] = useState<string | undefined>();
  const [postOffices, setPostOffices] = useState<
    { lat: number; lng: number }[]
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
          { lat: 10.7769, lng: 106.7009 },
          { lat: 10.762, lng: 106.682 },
        ]);
        setLoading(false);
      }, 1000);
    }
  }, [city, district]);

  return (
    <div className="py-10 px-5 flex flex-col md:flex-row gap-6  max-w-7xl mx-auto">
      {/* Form chọn tỉnh/thành và quận/huyện */}
      <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-bold text-blue-600">BƯU CỤC GHN</h2>
        <Select
          placeholder="Chọn tỉnh/Thành phố"
          className="w-full mt-4"
          onChange={(value) => {
            setCity(value);
            setDistrict(undefined);
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

      {/* Bản đồ Google */}
      {/* <div className="w-full md:w-2/3">
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
          <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={6}>
            {postOffices.map((pos, index) => (
              <Marker key={index} position={pos} />
            ))}
          </GoogleMap>
        </LoadScript>
      </div> */}
      <div className="w-full md:w-2/3">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d7889868.551917753!2d106.01554435401626!3d15.077134118415595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1zR0hOIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1740745498251!5m2!1svi!2s"
          width={mapContainerStyle.width}
          height={mapContainerStyle.height}
          style={{ border: 0 }}
          title="Bưu cục ABC Delivery"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default PostOfficeLocator;
