import React, { useState } from "react";
import { DatePicker, Dropdown, Menu, Select } from "antd";
import { DownOutlined, CalendarOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const filterOptions = [
  { label: "Trạng thái", options: ["Tất cả", "Chờ xử lý", "Đã hoàn thành"] },
  {
    label: "Tùy chọn thanh toán",
    options: ["Tất cả", "Đã thanh toán", "Chưa thanh toán"],
  },
  { label: "In vận đơn", options: ["Tất cả", "Đã in", "Chưa in"] },
  { label: "Giao thất bại - thu tiền", options: ["Tất cả", "Có", "Không"] },
  { label: "Thu hồi chứng từ", options: ["Tất cả", "Có", "Không"] },
  { label: "Loại đơn hàng", options: ["Tất cả", "Hỏa tốc", "Tiêu chuẩn"] },
];

const OrderFilter: React.FC = () => {
  const [startDate, setStartDate] = useState(dayjs("2025-02-03"));
  const [endDate, setEndDate] = useState(dayjs("2025-03-05"));
  const [orderCount, setOrderCount] = useState(0);
  const [filters, setFilters] = useState<Record<string, string>>({});

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const menu = (
    <div className="bg-white p-4 shadow-lg rounded-lg w-64 space-y-3">
      {filterOptions.map(({ label, options }) => (
        <div key={label}>
          <span className="text-gray-500 text-sm">{label}</span>
          <Select
            className="w-full mt-1"
            defaultValue="Tất cả"
            options={options.map((opt) => ({ value: opt, label: opt }))}
            onChange={(value) => handleFilterChange(label, value)}
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex items-center space-x-4 bg-white p-3 shadow">
      {/* Dropdown Lọc hiển thị */}
      <Dropdown overlay={menu} trigger={["click"]}>
        <button className="text-blue-700 font-medium flex items-center">
          Lọc hiển thị <DownOutlined className="ml-1" />
        </button>
      </Dropdown>

      <span className="text-gray-500">Thời gian tạo đơn</span>

      {/* Ngày bắt đầu */}
      <div className="flex items-center border rounded-full px-3 py-1">
        <span className="text-gray-500 mr-2">Từ</span>
        <DatePicker
          value={startDate}
          onChange={(date) => setStartDate(date!)}
          format="DD/MM/YYYY"
          suffixIcon={<CalendarOutlined />}
          className="border-none text-orange-500"
        />
      </div>

      {/* Ngày kết thúc */}
      <div className="flex items-center border rounded-full px-3 py-1">
        <span className="text-gray-500 mr-2">Đến</span>
        <DatePicker
          value={endDate}
          onChange={(date) => setEndDate(date!)}
          format="DD/MM/YYYY"
          suffixIcon={<CalendarOutlined />}
          className="border-none text-orange-500"
        />
      </div>

      {/* Hiển thị số đơn hàng */}
      <span className="text-gray-600">
        Hiển thị{" "}
        <span className="text-blue-600 font-medium">{orderCount}/0</span> đơn
        hàng
      </span>
    </div>
  );
};

export default OrderFilter;
