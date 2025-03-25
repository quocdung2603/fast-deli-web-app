import { Button, TableColumnsType } from "antd";
import { Link } from "react-router-dom";
import { User } from "../../../../types/User/User";

const Columns = (
  showModalEdit: (isOpen: boolean, data: User) => void,
  showDeleteConfirm: (userId: string) => void,
  showBanConnfirm: (userId: string) => void
): TableColumnsType<User> => [
  {
    title: "Têm đầy đủ",
    dataIndex: "fullName",
    align: "center",
    render(value, record) {
      return (
        <Link
          to={`/profile/${record.userId}`}
          className="underline text-center"
        >
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
      return <p>{value ? "Nam" : "Nữ" }</p>;
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
    title: "Vai trò",
    dataIndex: "role",
    align: "center",
    render(value) {
      return <p>{value}</p>;
    },
  },
  {
    title: "Trạng thái tài khoản",
    dataIndex: "accountStatus",
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
          {/* <Button
            onClick={() => {
              showModalEdit(true, record);
            }}
          >
            Edit
          </Button> */}
          <Button
            onClick={() => {
              showBanConnfirm(record.userId.toString());
            }}
          >
            Ban
          </Button>
          <Button
            onClick={() => {
              showDeleteConfirm(record.userId.toString());
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
