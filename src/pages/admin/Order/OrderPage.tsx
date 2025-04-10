import {
  Button,
  DatePicker,
  Modal,
  notification,
  Select,
  Table,
  TableProps,
} from "antd";
import Search, { SearchProps } from "antd/es/input/Search";
import confirm from "antd/es/modal/confirm";
import { useEffect, useRef, useState } from "react";
import Columns from "./components/Columns";
import CreateForm from "./components/CreateForm";
import moment from "moment";
import { OrderResponse, OrderResponseId } from "../../../types/Order/Order";
import { OrderServices } from "../../../services/Order/OrderServices";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import formatDateTime from "../../../utils/FormatDateTime";
import L from "leaflet";
import { TrackingServices } from "../../../services/Order/TrackingServices";
import { Tracking, TrackingResponse } from "../../../types/Order/Tracking";
import OrderTrackingColumns from "./components/OrderTrackingColumns";
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

const OrderStatusList = [
  {
    value: "waiting",
    label: "Waiting",
  },
  {
    value: "pending",
    label: "Pending",
  },
  {
    value: "shipping",
    label: "Shipping",
  },
  {
    value: "complete",
    label: "Completed",
  },
  {
    value: "canceled",
    label: "Canceled",
  },
];

const OrderShippingStatusList = [
  {
    value: "unassigned",
    label: "Chưa chỉ định",
  },
  {
    value: "assigned",
    label: "Đã chỉ định",
  },
];

const OrderPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTrackingModal, setIsTrackingModal] = useState(false);
  const [modalEdit, setModalEdit] = useState<{
    isOpen: boolean;
    data: undefined | any;
  }>({
    isOpen: false,
    data: undefined,
  });

  const [listData, setListData] = useState<OrderResponse[]>([]);

  const timeoutRef = useRef(setTimeout(() => {}, 0));

  const [filteredData, setFilteredData] = useState<OrderResponse[]>(listData);

  const [ordersAtCurrentLocation, setOrdersAtCurrentLocation] = useState<any[]>(
    []
  );

  const [orderTracking, setOrderTracking] = useState<Tracking[]>([]);

  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const [filters, setFilters] = useState({
    orderStatus: "",
    // orderState: "",
    start: Date.now(),
    end: Date.now(),
    search: "",
    pageSize: 5,
    pageNumber: 1,
  });

  useEffect(() => {
    const filtered = listData.filter((item) => {
      const isOrderStatusMatch =
        !filters.orderStatus || item.status === filters.orderStatus;
      // const isOrderStateMatch =
      //   !filters.orderState || item. === filters.orderState;
      const isSearchMatch = !filters.search
        ? true
        : item.orderCode.toLowerCase().includes(filters.search.toLowerCase()) ||
          item.reciverName.toLowerCase().includes(filters.search.toLowerCase());
      const isDateMatch = filters.start
        ? new Date(item.createAt).getTime() >= filters.start &&
          new Date(item.createAt).getTime() <= filters.end
        : true;
      return (
        isOrderStatusMatch &&
        // isOrderStateMatch &&
        isSearchMatch &&
        isDateMatch
      );
    });

    setFilteredData(filtered);
  }, [filters, listData]);

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
    const req: OrderResponseId = await OrderServices.getAll();
    //console.log("req", req.data);
    setListData(req.data);
  };

  const getOrderByCurrentlyLocation = async () => {
    try {
      const trackingData = await Promise.all(
        listData.map(async (item) => {
          const res: TrackingResponse = await TrackingServices.getByOrderId(
            item.id
          );

          // Tìm các tiến trình có status === "ready"
          const readyItem = res.data.find((o) => o.status === "ready");

          if (readyItem) {
            return {
              ...readyItem,
              orderId: item.id, // 👈 để liên kết với đơn hàng
            };
          }

          return null;
        })
      );

      const filteredTrackingData = trackingData.filter(Boolean);
      setOrdersAtCurrentLocation(filteredTrackingData);

      // ✅ In tại đây thay vì sau setState
      console.log("✅ filteredTrackingData:", filteredTrackingData);
    } catch (err) {
      console.error("❌ Lỗi lấy dữ liệu tracking:", err);
    }
  };

  const getTrackingOrder = async (orderId: string) => {
    console.log("OrderId", orderId);
    const res = await TrackingServices.getByOrderId(orderId);
    console.log("ABC", res.data);
    setOrderTracking(res.data);
  };

  useEffect(() => {
    getAll();
  }, [filters]);

  useEffect(() => {
    setFilteredData(listData);
    getOrderByCurrentlyLocation();
  }, [listData]);

  const onChange: TableProps<OrderResponse>["onChange"] = (pagination) => {
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
    }, 500);
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleDateChange = (dates: any) => {
    if (!dates) return;
    setFilters((prev) => ({
      ...prev,
      start: dates[0] ? moment(dates[0].toString()).valueOf() : prev.start,
      end: dates[1] ? moment(dates[1].toString()).valueOf() : prev.end,
    }));
  };

  const showModalEdit = (isOpen: boolean, data: any) => {
    setModalEdit({
      isOpen,
      data,
    });
  };

  const showTrackingModal = () => {
    setIsTrackingModal(true);
  };

  const showDeleteConfirm = (id: string) => {
    confirm({
      title: "Bạn có chắc muốn xóa dữ liệu này?",
      content: "Bạn sẽ không thể khôi phục dữ liệu sau khi xóa!",
      okText: "Xóa luôn sợ gì",
      okType: "danger",
      maskClosable: true,
      closable: true,
      onOk() {
        OrderServices.delete(id)
          .then(() => {
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

  const ordersAtSelectedLocation = selectedLocation
    ? ordersAtCurrentLocation.filter(
        (item) =>
          item.location.latitude === selectedLocation.lat &&
          item.location.longitude === selectedLocation.lng
      )
    : [];

  return (
    <div>
      <div className="flex items-center justify-end my-4 space-x-5">
        <div className="flex flex-col space-y-2">
          <p className="text-black text-sm font-bold text-start">
            Tình trạng đơn hàng
          </p>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Search to Select"
            optionFilterProp="label"
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={OrderShippingStatusList}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <p className="text-black text-sm font-bold text-start">
            Trạng thái đơn hàng
          </p>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Search to Select"
            optionFilterProp="label"
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={OrderStatusList}
            onChange={(value) => handleFilterChange("orderStatus", value)}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <p className="text-black text-sm font-bold text-start">
            Thời gian tạo đơn
          </p>
          <DatePicker.RangePicker
            placeholder={["", "Hôm nay"]}
            allowEmpty={[false, true]}
            onChange={handleDateChange}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <p className="text-black text-sm font-bold text-start">
            Tìm kiếm đơn hàng
          </p>
          <Search
            placeholder="Tìm kiếm"
            allowClear
            className="w-[300px]"
            onSearch={onSearch}
          />
        </div>
        <Button onClick={showModal}>Thêm mới</Button>
        <Modal
          width={1000}
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
        columns={Columns(showModalEdit, showDeleteConfirm)}
        dataSource={filteredData.map((item, index) => ({
          ...item,
          key: index,
        }))}
        pagination={{
          pageSize: 5,
          total: filteredData.length,
        }}
        onChange={onChange}
      />
      <div className="flex flex-row justify-center items-center space-x-5">
        <div className="w-1/2 h-[600px]">
          <MapContainer center={center} zoom={6} style={mapContainerStyle}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <MapEffect
              markers={
                selectedLocation
                  ? [
                      {
                        latitude: selectedLocation.lat,
                        longitude: selectedLocation.lng,
                      },
                    ]
                  : []
              }
            />
            {ordersAtCurrentLocation.map((pos) => (
              <Marker
                key={pos.id}
                position={[pos.location.latitude, pos.location.longitude]}
                icon={customIcon}
                eventHandlers={{
                  click: () => {
                    setSelectedLocation({
                      lat: pos.location.latitude,
                      lng: pos.location.longitude,
                    });
                  },
                }}
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
        <div className="w-1/2 h-[600px] bg-white overflow-auto p-4">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Đơn hàng tại vị trí đã chọn:
          </h2>
          {ordersAtSelectedLocation.length === 0 ? (
            <p className="text-gray-500">
              Click vào một điểm trên bản đồ để xem danh sách đơn hàng.
            </p>
          ) : (
            <ul className="space-y-3">
              {ordersAtSelectedLocation.map((order) => (
                <li
                  key={order.id}
                  className="p-3 bg-gray-100 rounded shadow text-sm text-black"
                >
                  <div className="flex flex-row items-center">
                    <div className="w-11/12 flex flex-col">
                      <p>
                        <strong>Mã đơn:</strong> {order.orderId}
                      </p>
                      <p>
                        <strong>Mô tả:</strong> {order.description}
                      </p>
                      <p>
                        <strong>Trạng thái:</strong> {order.status}
                      </p>
                      <p>
                        <strong>Thời gian:</strong>{" "}
                        {formatDateTime(order.timeStamp.toString(), 1)}
                      </p>
                    </div>
                    <div className="w-1/12 flex flex-col">
                      <button
                        onClick={() => {
                          showTrackingModal();
                          getTrackingOrder(order.orderId);
                        }}
                      >
                        <span className="text-blue-500 hover:underline">
                          Chi tiết
                        </span>
                      </button>
                    </div>
                    <Modal
                      width={1000}
                      title="Chi tiết đơn hàng"
                      open={isTrackingModal}
                      onCancel={() => setIsTrackingModal(false)}
                      cancelButtonProps={{
                        className: "hidden",
                      }}
                      okButtonProps={{
                        className: "hidden",
                      }}
                    >
                      <Table
                        dataSource={orderTracking}
                        columns={OrderTrackingColumns()}
                        pagination={false}
                        rowKey="time"
                      />
                    </Modal>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
