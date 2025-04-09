import React, { useEffect, useState } from "react";
import { Card, Table, TableColumnsType, Tag } from "antd";
import { useParams } from "react-router-dom";
import { Tracking, TrackingResponse } from "../../../types/Order/Tracking";
import { TrackingServices } from "../../../services/Order/TrackingServices";
import formatDateTime from "../../../utils/FormatDateTime";
import { OrderResponseId, OrderResponseInfo } from "../../../types/Order/Order";
import { OrderServices } from "../../../services/Order/OrderServices";
import { set } from "react-hook-form";

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
        <div className="w-2/3 mb-10">
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
        <div className="w-1/3 mb-10">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d7889868.551917753!2d106.01554435401626!3d15.077134118415595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1zR0hOIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1740745498251!5m2!1svi!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            title="Bưu cục ABC Delivery"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default OrderInfoPage;
