import React, { useEffect, useState } from "react";
import { Card, Table, TableColumnsType, Tag } from "antd";
import { useParams } from "react-router-dom";
import { Tracking, TrackingResponse } from "../../../types/Order/Tracking";
import { TrackingServices } from "../../../services/Order/TrackingServices";
import formatDateTime from "../../../utils/FormatDateTime";
import { OrderResponseInfo } from "../../../types/Order/Order";
import { OrderServices } from "../../../services/Order/OrderServices";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";

const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

const center = { lat: 14.0583, lng: 108.2772 };

const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/64/2776/2776067.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const columns: TableColumnsType<Tracking> = [
  {
    title: "Ngày",
    dataIndex: "date",
    render: (_, record) => (
      <span className="font-semibold">
        {formatDateTime(record.timeStamp.toString(), 2)}
      </span>
    ),
  },
  {
    title: "Giờ",
    dataIndex: "time",
    render: (_, record) => (
      <span className="font-semibold">
        {formatDateTime(record.timeStamp.toString(), 1)}
      </span>
    ),
  },
  {
    title: "Tiến trình dự kiến",
    dataIndex: "description",
    render: (_, record) => (
      <span className="font-semibold">{record.description}</span>
    ),
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    render: (_, record) => {
      if (record.status === "ready") {
        return <Tag color="green">Đã lấy hàng</Tag>;
      } else if (record.status === "shipping") {
        return <Tag color="blue">Đang giao hàng</Tag>;
      } else if (record.status === "delivered") {
        return <Tag color="red">Đã giao hàng</Tag>;
      } else {
        return <Tag color="default">Không xác định</Tag>; // fallback
      }
    },
  },
];

const OrderInfoPage: React.FC = () => {
  const [orderData, setOrderData] = useState<OrderResponseInfo | any>();
  const [listTracking, setListTracking] = useState<Tracking[]>([]);
  const { id } = useParams();
  console.log(id);

  const getOrderInfo = async () => {
    const order: OrderResponseInfo = await OrderServices.getById(id!);
    setOrderData(order.data);
    console.log("order", order.data);
    //
    const tracking: TrackingResponse = await TrackingServices.getByOrderId(id!);
    setListTracking(tracking.data);
    console.log("res", tracking.data);
  };

  useEffect(() => {
    if (id) {
      getOrderInfo();
    }
  }, [id]);

  return (
    <div className="bg-gray-100">
      {/* Thông tin đơn hàng */}
      {orderData && (
        <div className="flex flex-row w-full justify-center space-x-5 bg-white my-10">
          <Card title="THÔNG TIN ĐƠN HÀNG" className="w-1/4  border-none">
            <p>
              Mã đơn hàng: <strong>{orderData.orderCode}</strong>
            </p>
            {/* <p>
              Ngày lấy dự kiến:{" "}
              {formatDateTime(listTracking[0].timeStamp.toString(), 2)}
            </p> */}
            <p>
              Trạng thái hiện tại: <Tag color="blue">{orderData.status}</Tag>
            </p>
          </Card>

          <Card title="NGƯỜI GỬI" className="w-1/4  border-none">
            <p>Địa chỉ: {orderData.senderAddress}</p>
          </Card>

          <Card title="NGƯỜI NHẬN" className="w-1/4  border-none">
            <p>Họ và tên: {orderData.infoUser.fullName}</p>
            <p>Điện thoại: {orderData.infoUser.phoneNumber}</p>
            <p>Địa chỉ: {orderData.receiverAddress}</p>
          </Card>
          <Card title="THÔNG TIN ĐƠN HÀNG" className="w-1/4  border-none">
            <p>Cân nặng: {orderData.weight}</p>
            <p>Phí vận chuyển: {orderData.deliveryFee}</p>
          </Card>
        </div>
      )}
      <div className="bg-gray-100 flex flex-row max-w-7xl mx-auto space-x-5">
        {/* Lịch sử đơn hàng */}
        <div className="w-3/5 mb-10">
          <Card
            title="Tiến trình đơn hàng"
            className="border-none rounded-none"
          >
            <Table
              dataSource={listTracking}
              columns={columns}
              pagination={false}
              rowKey="time"
            />
          </Card>
        </div>
        <div className="w-2/5 mb-10">
          <MapContainer center={center} zoom={6} style={mapContainerStyle}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {listTracking
              .filter(
                (pos) => pos.status == "ready" || pos.status == "shipping"
              )
              .map((pos) => (
                <Marker
                  key={pos.id}
                  position={[pos.location.latitude, pos.location.longitude]}
                  icon={customIcon}
                >
                  <Popup>
                    <div className="flex flex-col justify-start">
                      <span className="font-semibold">{pos.description}</span>
                      <span>Trạng thái hiện tại: {pos.status}</span>
                      <span>
                        Thời gian:
                        {formatDateTime(pos.timeStamp.toString(), 1)}
                      </span>
                    </div>
                  </Popup>
                </Marker>
              ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default OrderInfoPage;
