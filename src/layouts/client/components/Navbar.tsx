import { Menu } from "antd";
import { PhoneOutlined } from "@ant-design/icons";
import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { AuthRouterLink, ClientRouterLink } from "../../../utils/RouterLink";
import OrderTrackingInput from "./OrderTrackingInput";
import UserDropdown from "./UserDropdown";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const HandleOnLogout = () => {
    // Xử lý đăng xuất
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-t-4 border-red-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            className="bg-red-500 px-4 py-2 text-white text-xl font-bold cursor-pointer"
            onClick={() => navigate("/")}
          >
            Logistica
          </button>

          {/* Menu */}
          <Menu
            mode="horizontal"
            className="hidden md:flex space-x-4 border-none"
            selectedKeys={[location.pathname]} // Chọn item theo đường dẫn
            onClick={({ key }) => navigate(key)} // Xử lý điều hướng
          >
            <Menu.Item
              key={`${ClientRouterLink.Home}`}
              className="text-red-500"
            >
              Home
            </Menu.Item>
            <Menu.Item key={`${ClientRouterLink.About}`}>About</Menu.Item>
            <Menu.Item key={`${ClientRouterLink.Services}`}>Services</Menu.Item>
            <Menu.Item key={`${ClientRouterLink.Contact}`}>Contact</Menu.Item>
          </Menu>

          {/* Đăng nhập / Đăng ký */}
          {/* <div className="flex flex-row items-center">
            <button
              className="border rounded-tl-2xl rounded-bl-2xl py-2 px-1 bg-red-400 hover:bg-red-500 text-sm text-white"
              onClick={() => navigate(`/auth/${AuthRouterLink.Login}`)}
            >
              Đăng nhập
            </button>
            <button
              className="border rounded-tr-2xl rounded-br-2xl py-2 px-1 bg-red-400 hover:bg-red-500 text-sm text-white"
              onClick={() => navigate(`/auth/${AuthRouterLink.Register}`)}
            >
              Đăng ký
            </button>
          </div> */}
          <div className="flex flex-row items-center space-x-10">
            <OrderTrackingInput />
            <UserDropdown username="Nguyen Van A" onLogout={HandleOnLogout} />
          </div>

          {/* Số điện thoại */}
          <div className="flex items-center space-x-2">
            <PhoneOutlined className="text-red-500 text-lg" />
            <span className="font-bold">+012 345 6789</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
