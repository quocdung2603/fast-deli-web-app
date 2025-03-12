import React from "react";
import { Card, Table, Tag } from "antd";

interface OrderInfo {
  orderId: string;
  estimatedPickup: string;
  estimatedDelivery: string;
  status: string;
}

interface ContactInfo {
  name: string;
  phone: string;
  address: string;
}

interface OrderHistory {
  date: string;
  status: string;
  details: string;
  time: string;
  highlight?: boolean;
}

const order: OrderInfo = {
  orderId: "VNGH00231122107",
  estimatedPickup: "20/01/2025",
  estimatedDelivery: "24/01/2025 - 25/01/2025",
  status: "Giao hàng thành công",
};

const sender: ContactInfo = {
  name: "xxxx rder",
  phone: "xxxx 3333",
  address: "xxxx Quận Đống Đa Hà Nội",
};

const receiver: ContactInfo = {
  name: "xxxx èn",
  phone: "xxxx 2627",
  address: "xxxx Thành phố Dĩ An Bình Dương",
};

const historyData: OrderHistory[] = [
  {
    date: "23/01/2025",
    status: "Giao hàng thành công",
    details: "Đơn hàng được giao tại Thành phố Dĩ An Bình Dương",
    time: "15:31",
    highlight: true,
  },
  {
    date: "23/01/2025",
    status: "Cuộc gọi",
    details:
      "Huỳnh Thanh Tùng gọi điện cho xxxx èn - xxxx 2627 (Đổ chuông 19s)",
    time: "15:31",
    highlight: true,
  },
  {
    date: "23/01/2025",
    status: "Đang giao hàng",
    details: "Đơn hàng đang giao đến xxxx Thành phố Dĩ An Bình Dương",
    time: "07:36",
  },
  {
    date: "23/01/2025",
    status: "Sẵn sàng giao hàng",
    details: "Đơn hàng sẵn sàng giao tại Bưu cục Tân Đông Hiệp",
    time: "07:35",
  },
  {
    date: "22/01/2025",
    status: "Xuất hàng đi kho",
    details: "Đơn hàng xuất kho Trung Chuyển HCM 01",
    time: "04:40",
  },
  
];

const columns = [
  {
    title: "Ngày",
    dataIndex: "date",
    key: "date",
    render: (text: string) => <span className="font-semibold">{text}</span>,
  },
  {
    title: "Chi tiết",
    dataIndex: "details",
    key: "details",
    render: (text: string, record: OrderHistory) => (
      <span className={record.highlight ? "text-red-500 font-semibold" : ""}>
        {text}
      </span>
    ),
  },
  {
    title: "Thời gian",
    dataIndex: "time",
    key: "time",
    render: (text: string, record: OrderHistory) => (
      <span className={record.highlight ? "text-red-500 font-semibold" : ""}>
        {text}
      </span>
    ),
  },
];

const OrderInfoPage: React.FC = () => {
  return (
    <div className="bg-gray-100">
      {/* Thông tin đơn hàng */}
      <div className="flex flex-row w-full justify-center space-x-5 bg-white my-10">
        <Card title="THÔNG TIN ĐƠN HÀNG" className="w-1/4  border-none">
          <p>
            Mã đơn hàng: <strong>{order.orderId}</strong>
          </p>
          <p>Ngày lấy dự kiến: {order.estimatedPickup}</p>
          <p>Ngày giao dự kiến: {order.estimatedDelivery}</p>
          <p>
            Trạng thái hiện tại: <Tag color="blue">{order.status}</Tag>
          </p>
        </Card>

        <Card title="NGƯỜI GỬI" className="w-1/4  border-none">
          <p>Họ và tên: {sender.name}</p>
          <p>Điện thoại: {sender.phone}</p>
          <p>Địa chỉ: {sender.address}</p>
        </Card>

        <Card title="NGƯỜI NHẬN" className="w-1/4  border-none">
          <p>Họ và tên: {receiver.name}</p>
          <p>Điện thoại: {receiver.phone}</p>
          <p>Địa chỉ: {receiver.address}</p>
        </Card>
      </div>
      <div className="bg-gray-100 flex flex-row max-w-7xl mx-auto space-x-5">
        {/* Lịch sử đơn hàng */}
        <div className="w-1/2 mb-10">
          <Card title="Lịch sử đơn hàng" className="border-none rounded-none">
            <Table
              dataSource={historyData}
              columns={columns}
              pagination={false}
              rowKey="time"
            />
          </Card>
        </div>
        <div className="w-1/2 mb-10">
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
