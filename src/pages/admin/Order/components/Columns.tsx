import { Button, TableColumnsType } from "antd";
import { Link } from "react-router-dom";
import { Order } from "../../../../types/Order/Order";

const Columns = (
  showModalEdit: (isOpen: boolean, data: Order) => void,
  showDeleteConfirm: (userId: string) => void
): TableColumnsType<Order> => [
  {
    title: "Mã đơn hàng",
    dataIndex: "orderCode",
    align: "center",
    render(value, record) {
      return (
        <Link to={`/profile/${record.id}`} className="underline text-center">
          {value}
        </Link>
      );
    },
  },
  {
    title: "Địa chỉ gửi",
    dataIndex: "senderAddress",
    align: "center",
    render(value) {
      return <p>{value}</p>;
    },
  },
  {
    title: "Tên người nhận",
    dataIndex: "reciverName",
    align: "center",
    //render
    render(value) {
      return <p>{value}</p>;
    },
  },
  {
    title: "Số điện thoại nhận",
    dataIndex: "reciverPhone",
    align: "center",
    render(value) {
      return <p>{value}</p>;
    },
  },
  {
    title: "Trạng thái đơn hàng",
    dataIndex: "status",
    align: "center",
    render(value) {
      return <p>{value}</p>;
    },
  },
  {
    title: "Chức năng",
    dataIndex: "action",
    align: "center",
    render(_, record) {
      return (
        <div className="flex flex-row justify-center space-x-3">
          <Button
            onClick={() => {
              showModalEdit(true, record);
            }}
          >
            Edit
          </Button>
          <Button
            onClick={() => {
              showDeleteConfirm(record.id.toString());
            }}
          >
            Delete
          </Button>
        </div>
      );
    },
  },
];

export default Columns;
