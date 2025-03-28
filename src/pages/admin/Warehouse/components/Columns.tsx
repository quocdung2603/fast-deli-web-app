import { Warehouse } from "../../../../types/Order/Warehouse";
import { Button, TableColumnsType } from "antd";
import { Link } from "react-router-dom";
import { GeoPoint } from "../../../../types/GeoPoint";

const Columns = (
  showModalEdit: (isOpen: boolean, data: Warehouse) => void,
  showDeleteConfirm: (userId: string) => void
): TableColumnsType<Warehouse> => [
  {
    title: "Tên kho",
    dataIndex: "name",
    //filter
    filters: [
      {
        text: "A",
        value: "A",
      },
    ],
    filterMode: "tree",
    filterSearch: true,
    width: "25%",
    align: "center",
    onFilter: (value, record) => record.name.startsWith(value as string),
    //sorter
    defaultSortOrder: "descend",
    sorter: (a, b) => a.name.localeCompare(b.name),
    //render
    render(value, record) {
      return (
        <Link to={`/profile/${record.id}`} className="underline text-center">
          {value}
        </Link>
      );
    },
  },
  {
    title: "Loại kho",
    dataIndex: "type",
    //filter
    filters: [
      {
        text: "Kho trung chuyển",
        value: "Kho trung chuyển",
      },
      {
        text: "Kho cơ sở",
        value: "Kho cơ sở",
      },
    ],
    filterMode: "tree",
    filterSearch: true,
    width: "25%",
    align: "center",
    onFilter: (value, record) => record.type.startsWith(value as string),
    //render
    render(value) {
      return <p>{value}</p>;
    },
  },
  {
    title: "Vị trí",
    dataIndex: "location",
    render: (location: GeoPoint) => (
      <a
        href={`https://www.google.com/maps?q=${location.latitude},${location.longitude}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline"
      >
        Xem trên Google Maps
      </a>
    ),
  },
  {
    title: "Chức năng",
    dataIndex: "action",
    align: "center",
    width: "20%",
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
