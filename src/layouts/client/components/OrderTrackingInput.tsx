import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClientRouterLink } from "../../../utils/RouterLink";

const OrderTrackingInput: React.FC = () => {
  const [orderCode, setOrderCode] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`${ClientRouterLink.OrderInfo}`);
    // if (orderCode.trim()) {
    //   console.log("Tìm kiếm đơn hàng:", orderCode);
    //   // Thực hiện API call để tra cứu đơn hàng tại đây
    // }
  };

  return (
    <div className="w-full max-w-md">
      <Input
        placeholder="Nhập mã đơn hàng bạn cần tra cứu..."
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
