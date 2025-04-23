import L from "leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

const MapRoutingMachine: React.FC<{ positions: L.LatLngExpression[] }> = ({
  positions,
}) => {
  const map = useMap();

  useEffect(() => {
    if (!map || positions.length < 2) return;

    // Kiểm tra tính hợp lệ của các tọa độ
    const validPositions = positions.filter((pos) => {
      const [lat, lng] = pos as [number, number];
      return (
        typeof lat === "number" &&
        typeof lng === "number" &&
        lat >= -90 &&
        lat <= 90 &&
        lng >= -180 &&
        lng <= 180
      );
    });

    if (validPositions.length < 2) {
      console.warn("Not enough valid positions to create a route.");
      return;
    }

    // Tạo các waypoints từ mảng positions
    const waypoints = validPositions.map((pos) =>
      L.latLng(pos as [number, number])
    );

    // Tạo routing control với OSRM công cộng
    const routingControl = L.Routing.control({
      waypoints: waypoints,
      lineOptions: {
        styles: [{ color: "blue", weight: 4 }], // Đường màu xanh, độ dày 4
        extendToWaypoints: false, // Không mở rộng đường đến các waypoints
        missingRouteTolerance: 0, // Độ lệch tối đa khi không tìm thấy tuyến đường
      },
      router: L.Routing.osrmv1({
        serviceUrl: "http://router.project-osrm.org/route/v1", // Máy chủ OSRM công cộng
      }),
      routeWhileDragging: false, // Không cho phép kéo để thay đổi tuyến đường
      show: false, // Ẩn hướng dẫn chi tiết
      addWaypoints: false, // Không cho phép thêm điểm trung gian
      fitSelectedRoutes: true, // Tự động zoom để hiển thị toàn bộ tuyến đường
      showAlternatives: false, // Không hiển thị tuyến đường thay thế
    }).addTo(map);

    // Xử lý lỗi định tuyến
    routingControl.on("routingerror", (error) => {
      console.error("Routing error:", error);
    });

    // Dọn dẹp khi component unmount
    return () => {
      map.removeControl(routingControl);
    };
  }, [map, positions]);

  return null;
};

export default MapRoutingMachine;
