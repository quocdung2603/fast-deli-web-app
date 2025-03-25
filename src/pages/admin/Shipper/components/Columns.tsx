import { Button, TableColumnsType } from "antd";
import { Link } from "react-router-dom";
import { Shipper } from "../../../../types/Shipper/Shipper";

const Columns = (
  showModalEdit: (isOpen: boolean, data: Shipper) => void,
  showDeleteConfirm: (userId: string) => void
): TableColumnsType<Shipper> => [
  {
    title: "Têm đầy đủ",
    dataIndex: "fullName",
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
    title: "Giói tính",
    dataIndex: "gender",
    align: "center",
    render(value) {
      return <p>{value}</p>;
    },
  },
  {
    title: "Địa chỉ mail",
    dataIndex: "email",
    align: "center",
    render(value) {
      return <p>{value}</p>;
    },
  },
  {
    title: "Số điện thoại",
    dataIndex: "phoneNumber",
    align: "center",
    render(value) {
      return <p>{value}</p>;
    },
  },
  {
    title: "Phương tiện",
    dataIndex: "vehicle",
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
