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
import { User } from "../../../types/User/User";

const RoleList = [
  {
    label: "Admin",
    value: "admin",
  },
  {
    label: "Manager",
    value: "manager",
  },
  {
    label: "User",
    value: "user",
  },
];

const AccountStatusList = [
  {
    label: "Active",
    value: "active",
  },
  {
    label: "Inactive",
    value: "inactive",
  },
  {
    label: "Banned",
    value: "banned",
  },
];

const UserPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalEdit, setModalEdit] = useState<{
    isOpen: boolean;
    data: undefined | User;
  }>({
    isOpen: false,
    data: undefined,
  });

  const [listData, setListData] = useState<User[]>(
    Array.from({ length: 10 }, (_, i) => ({
      userId: `${i + 1}`,
      fullName: `User ${i + 1}`,
      email: `user${i + 1}@gmail.com`,
      phoneNumber: `012345678${i}`,
      address: "Ha Noi",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      accountStatus:
        i % 3 === 0 ? "active" : i % 3 === 1 ? "inactive" : "banned",
      dateOfBirth: new Date(),
      gender: i % 2 === 0, // Luân phiên true/false
      nationality: "Viet Nam",
      password: "defaultPassword",
    }))
  );

  const timeoutRef = useRef(setTimeout(() => {}, 0));
  const [filteredData, setFilteredData] = useState<User[]>(listData);

  const [filters, setFilters] = useState({
    role: "",
    accountStatus: "",
    start: 0,
    end: Date.now(),
    search: "",
    pageSize: 5,
    pageNumber: 1,
  });

  useEffect(() => {
    const filtered = listData.filter((user) => {
      const matchRole = filters.role ? user.role === filters.role : true;
      const matchStatus = filters.accountStatus
        ? user.accountStatus === filters.accountStatus
        : true;
      const matchSearch = filters.search
        ? user.fullName.toLowerCase().includes(filters.search.toLowerCase())
        : true;
      const matchDate = filters.start
        ? new Date(user.createdAt).getTime() >= filters.start &&
          new Date(user.createdAt).getTime() <= filters.end
        : true;

      return matchRole && matchStatus && matchSearch && matchDate;
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
    // WarehouseServices.getAll().then((res) => {
    //   setListData(res.metadata.data);
    // });
  };

  useEffect(() => {
    getAll();
  }, [filters]);

  const onChange: TableProps<User>["onChange"] = (pagination) => {
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

  const rowSelection: TableProps<User>["rowSelection"] = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: User[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    // getCheckboxProps: (record: User) => ({
    //   disabled: record. === 'Disabled User', // Column configuration not to be checked
    //   name: record.name,
    // }),
  };

  const showModalEdit = (isOpen: boolean, data: User) => {
    setModalEdit({
      isOpen,
      data,
    });
  };

  const showDeleteConfirm = (_id: string) => {
    confirm({
      title: "Bạn có chắc muốn xóa dữ liệu này?",
      content: "Bạn sẽ không thể khôi phục dữ liệu sau khi xóa!",
      okText: "Xóa luôn sợ gì",
      okType: "danger",
      maskClosable: true,
      closable: true,
      onOk() {
        // WarehouseServices.delete(_id)
        //   .then(() => {
        //     notification.success({ message: "Xóa thành công" });
        //     getAll();
        //     closeModal();
        //   })
        //   .catch(() => {
        //     notification.error({
        //       message: "Xóa thất bại ! Kiểm tra lại nha !",
        //     });
        //   });
      },
      cancelText: "Hủy",
    });
  };

  const showBanConnfirm = (_id: string) => {
    confirm({
      title: "Bạn có chắc muốn khóa tài khoản này không?",
      content: "Bạn sẽ không thể khôi phục dữ liệu sau khi khóa!",
      okText: "Khóa",
      okType: "danger",
      maskClosable: true,
      closable: true,
      onOk() {
        // WarehouseServices.delete(_id)
        //   .then(() => {
        //     notification.success({ message: "Khóa thành công" });
        //     getAll();
        //     closeModal();
        //   })
        //   .catch(() => {
        //     notification.error({
        //       message: "Khóa thất bại ! Kiểm tra lại nha !",
        //     });
        //   });
      },
      cancelText: "Hủy",
    });
  };

  return (
    <div>
      <div className="flex items-center justify-end my-4 space-x-5">
        <div className="flex flex-col space-y-2 ">
          <p className="text-sm font-bold text-left text-black">Vai trò</p>
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
            options={RoleList}
            onChange={(value) => handleFilterChange("role", value)}
          />
        </div>
        <div className="flex flex-col space-y-2 ">
          <p className="text-sm font-bold text-left text-black">
            Trạng thái tài khoản
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
            options={AccountStatusList}
            onChange={(value) => handleFilterChange("accountStatus", value)}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <p className="text-sm font-bold text-left text-black">
            Ngày tạo tài khoản
          </p>
          <DatePicker.RangePicker
            placeholder={["", "Hôm nay"]}
            allowEmpty={[false, true]}
            onChange={handleDateChange}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <p className="text-sm font-bold text-left text-black">
            Tìm kiếm tài khoản
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
          width={800}
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
          {/* <CreateForm
            initForm={modalEdit.data}
            getAll={getAll}
            closeModal={closeModal}
          /> */}
        </Modal>
      </div>
      <Table
        rowSelection={{ type: "checkbox", ...rowSelection }}
        columns={Columns(showModalEdit, showDeleteConfirm, showBanConnfirm)}
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

export default UserPage;
