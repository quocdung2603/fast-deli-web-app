import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const OrderTrackingInput: React.FC = () => {
  const [orderCode, setOrderCode] = useState("");
  const { t } = useTranslation();

  const handleSearch = () => {
    if (!orderCode.trim()) return;
    const url = `/order-information/${orderCode}`;
    window.open(url, "_blank");
  };

  return (
    <div className="w-full max-w-md">
      <Input
        placeholder={t("Client.OrderTracking.placeholder")}
        value={orderCode}
        onChange={(e) => setOrderCode(e.target.value)}
        onPressEnter={handleSearch}
        suffix={
          <SearchOutlined
            className="cursor-pointer text-gray-500 hover:text-blue-500"
            onClick={handleSearch}
          />
        }
        className="rounded-lg border border-blue-400 focus:ring focus:ring-blue-300"
      />
    </div>
  );
};

export default OrderTrackingInput;
