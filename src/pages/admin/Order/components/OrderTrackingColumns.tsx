import { TableColumnsType, Tag } from "antd";
import { Tracking } from "../../../../types/Order/Tracking";
import formatDateTime from "../../../../utils/FormatDateTime";

const OrderTrackingColumns = (): TableColumnsType<Tracking> => [
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

export default OrderTrackingColumns;
