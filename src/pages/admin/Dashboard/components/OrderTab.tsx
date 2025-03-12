import React, { useState } from "react";
import { Tabs } from "antd";

const categories = [
  "Đơn nháp",
  "Chờ bàn giao",
  "Đã bàn giao - Đang giao",
  "Đã bàn giao - đang hoàn hàng",
  "Chờ xác nhận giao lại",
  "Hoàn tất",
  "Đơn hủy",
  "Hàng thất lạc - hư hỏng",
];

const OrderTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Chờ bàn giao");

  return (
    <div className="bg-white p-2 shadow">
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        className="flex space-x-2"
      >
        {categories.map((category) => (
          <Tabs.TabPane
            tab={
              <div
                className={`px-4 py-1 rounded-full flex items-center space-x-1
                ${
                  activeTab === category
                    ? "bg-blue-900 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                <span>{category}</span>
                <span className="text-red-500 text-sm">0</span>
              </div>
            }
            key={category}
          />
        ))}
      </Tabs>
    </div>
  );
};

export default OrderTab;
