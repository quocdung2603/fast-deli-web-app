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
import {
  Order,
  OrderResponse,
  OrderResponseId,
} from "../../../types/Order/Order";
import { OrderServices } from "../../../services/Order/OrderServices";

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
    console.log("req", req.data);
    setListData(req.data);
  };

  useEffect(() => {
    getAll();
  }, [filters]);

  useEffect(() => {
    setFilteredData(listData);
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
    </div>
  );
};

export default OrderPage;
