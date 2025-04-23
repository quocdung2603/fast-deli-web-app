import {
  Button,
  DatePicker,
  Modal,
  notification,
  Table,
  TableProps,
} from "antd";
import Search, { SearchProps } from "antd/es/input/Search";
import confirm from "antd/es/modal/confirm";
import { useEffect, useRef, useState } from "react";
import Columns from "./components/Columns";
import CreateForm from "./components/CreateForm";
import moment from "moment";
import { Shipper } from "../../../types/Shipper/Shipper";
import { ShipperServices } from "../../../services/Shipper/ShipperServices";
import { UserServices } from "../../../services/User/UserServices";
import { MapContainer, Marker, Polygon, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import { OrderShipperServices } from "../../../services/Shipper/OrderShipperServices";
import MapEffect from "../../../components/Map/MapEffect";

const mapContainerStyle = {
  width: "100%",
  height: "600px",
};

const center = { lat: 14.0583, lng: 108.2772 };

const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/64/2776/2776067.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const ShipperPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalEdit, setModalEdit] = useState<{
    isOpen: boolean;
    data: undefined | Shipper;
  }>({
    isOpen: false,
    data: undefined,
  });

  const [listData, setListData] = useState<Shipper[]>([]);
  const [shipperAreaLocation, setShipperAreaLocation] = useState<any[]>([]);
  const [shipperOrders, setShipperOrders] = useState<any[]>([]);

  const timeoutRef = useRef(setTimeout(() => {}, 0));
  const [filters, setFilters] = useState({
    start: 0,
    end: Date.now(),
    search: "",
    pageSize: 5,
    pageNumber: 1,
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (modalEdit.data) {
      setModalEdit({
        isOpen: false,
        data: undefined,
      });
      return;
    }
    setIsModalOpen(false);
  };

  const getAll = async () => {
    ShipperServices.getAll().then((res) => {
      setListData(res.data);
      //console.log(res.data);
    });
  };

  const getShipperOrder = async (shipperId: string) => {
    OrderShipperServices.getByShipperId(shipperId).then((res) => {
      setShipperOrders(res.data);
      console.log("Shipper Order", res.data);
    });
  };

  const getMarkerLocation = (data: any[]) => {
    setShipperAreaLocation(data);
    console.log(data);
  };

  useEffect(() => {
    getAll();
  }, [filters]);

  const onChange: TableProps<Shipper>["onChange"] = (pagination) => {
    //refetch data
    setFilters((prev) => ({
      ...prev,
      pageNumber: pagination.current ?? 1,
      pageSize: pagination.pageSize ?? 5,
    }));
  };

  const onSearch: SearchProps["onSearch"] = (value, _e) => {
    //refetch data
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setFilters((prev) => ({
        ...prev,
        search: value,
      }));
    }, 1500);
  };

  const showModalEdit = (isOpen: boolean, data: Shipper) => {
    setModalEdit({
      isOpen,
      data,
    });
  };

  const showDeleteConfirm = async (_id: string) => {
    const shipper = await ShipperServices.getByShipperId(_id);
    console.log(shipper.data);
    confirm({
      title: "Bạn có chắc muốn xóa dữ liệu này?",
      content: "Bạn sẽ không thể khôi phục dữ liệu sau khi xóa!",
      okText: "Xóa luôn sợ gì",
      okType: "danger",
      maskClosable: true,
      closable: true,
      onOk() {
        ShipperServices.delete(_id)
          .then(() => {
            UserServices.delete(shipper.data.userId);
            notification.success({ message: "Xóa thành công" });
            getAll();
            closeModal();
          })
          .catch(() => {
            notification.error({
              message: "Xóa thất bại ! Kiểm tra lại nha !",
            });
          });
      },
      cancelText: "Hủy",
    });
  };

  return (
    <div>
      <div className="flex items-center justify-end my-4 space-x-2">
        <DatePicker.RangePicker
          placeholder={["", "Hôm nay"]}
          allowEmpty={[false, true]}
          onChange={(date) => {
            if (!date) return;

            if (date[0]) {
              setFilters((prev) => ({
                ...prev,
                start: moment(date[0]?.toString()).valueOf(),
              }));
            }

            if (date[1]) {
              setFilters((prev) => ({
                ...prev,
                end: moment(date[1]?.toString()).valueOf(),
              }));
            }
          }}
        />
        <Search
          placeholder="Tìm kiếm"
          allowClear
          className="w-[300px]"
          onSearch={onSearch}
        />
        <Button onClick={showModal}>Thêm mới</Button>
        <Modal
          width={1200}
          title={modalEdit.isOpen ? "Sửa Thông tin" : "Thêm mới thông tin"}
          open={isModalOpen || modalEdit.isOpen}
          onCancel={closeModal}
          cancelButtonProps={{
            className: "hidden",
          }}
          okButtonProps={{
            className: "hidden",
          }}
        >
          <CreateForm
            initForm={modalEdit.data}
            getAll={getAll}
            closeModal={closeModal}
          />
        </Modal>
      </div>
      <Table
        onRow={(record, rowIndex) => {
          return {
            onClick: () => {
              console.log(record, rowIndex);
              getMarkerLocation(record.shipperArea);
              getShipperOrder(record.id);
            },
          };
        }}
        columns={Columns(showModalEdit, showDeleteConfirm)}
        dataSource={listData.map((item, index) => ({ ...item, key: index }))}
        pagination={{
          pageSize: 5,
          total: listData.length,
        }}
        onChange={onChange}
      />
      <div className="flex flex-row justify-center items-center space-x-5">
        <div className="w-1/2 h-[600px] bg-black">
          <MapContainer center={center} zoom={6} style={mapContainerStyle}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {shipperAreaLocation.map((pos, index) => (
              <Marker
                key={index + 0}
                position={[pos.latitude, pos.longitude]}
                icon={customIcon}
              ></Marker>
            ))}
            <MapEffect markers={shipperAreaLocation} />
            {shipperAreaLocation.length >= 2 && (
              <Polygon
                positions={shipperAreaLocation.map((pos) => [
                  pos.latitude,
                  pos.longitude,
                ])}
                pathOptions={{
                  color: "blue",
                  fillColor: "blue",
                  fillOpacity: 0.3,
                
                }}
              />
            )}
          </MapContainer>
        </div>
        <div className="w-1/2 h-[600px] overflow-y-auto bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-center text-black">
            Danh sách đơn hàng đang giao
          </h2>
          {shipperOrders.length === 0 ? (
            <p className="text-gray-500 text-center">Chưa có đơn hàng nào</p>
          ) : (
            <ul className="space-y-4">
              {shipperOrders.map((order) => (
                <li
                  key={order.id}
                  className="border border-gray-300 rounded-lg p-3 hover:shadow-md transition-all text-black"
                >
                  <p>
                    <strong>Mã đơn: </strong> {order.orderId}
                  </p>
                  <p>
                    <strong>Vị trí hiện tại: </strong> {order.locationCurrent}
                  </p>
                  <p>
                    <strong>Đích đến: </strong> {order.locationDelivery}
                  </p>
                  <p>
                    <strong>Trạng thái: </strong>
                    <span
                      className={
                        order.status === "Đã giao"
                          ? "text-green-600"
                          : "text-blue-600"
                      }
                    >
                      {order.status}
                    </span>
                  </p>
                  <p>
                    <strong>Ngày tạo:</strong>{" "}
                    {moment(order.createdAt).format("DD/MM/YYYY")}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShipperPage;
