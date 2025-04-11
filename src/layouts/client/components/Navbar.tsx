import { Menu } from "antd";
import { PhoneOutlined } from "@ant-design/icons";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthRouterLink, ClientRouterLink } from "../../../utils/RouterLink";
import OrderTrackingInput from "./OrderTrackingInput";
import UserDropdown from "./UserDropdown";
import { useAuth } from "../../../common/context/AuthContext";
import LanguageSelector from "../../../components/Lang/LanguageSelector";
import { useTranslation } from "react-i18next";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token, user, logout } = useAuth();
  const { t } = useTranslation();

  const HandleOnLogout = () => {
    logout();
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
            ABC Delivery
          </button>

          {/* Menu */}
          <Menu
            mode="horizontal"
            className="hidden md:flex space-x-4 border-none"
            selectedKeys={[location.pathname]}
            onClick={({ key }) => navigate(key)}
          >
            <Menu.Item key={ClientRouterLink.Home} className="text-red-500">
              {t("Client.Navbar.home")}
            </Menu.Item>
            <Menu.Item key={ClientRouterLink.About}>
              {t("Client.Navbar.about")}
            </Menu.Item>
            <Menu.Item key={ClientRouterLink.Services}>
              {t("Client.Navbar.services")}
            </Menu.Item>
            <Menu.Item key={ClientRouterLink.Contact}>
              {t("Client.Navbar.contact")}
            </Menu.Item>
          </Menu>

          {/* Đăng nhập / Đăng ký */}
          {!token ? (
            <div className="flex flex-row items-center">
              <button
                className="border rounded-tl-2xl rounded-bl-2xl py-2 px-1 bg-red-400 hover:bg-red-500 text-sm text-white"
                onClick={() => navigate(`/auth/${AuthRouterLink.Login}`)}
              >
                {t("Client.Navbar.login")}
              </button>
              <button
                className="border rounded-tr-2xl rounded-br-2xl py-2 px-1 bg-red-400 hover:bg-red-500 text-sm text-white"
                onClick={() => navigate(`/auth/${AuthRouterLink.Register}`)}
              >
                {t("Client.Navbar.register")}
              </button>
            </div>
          ) : (
            <div className="flex flex-row items-center space-x-10">
              <OrderTrackingInput />
              <UserDropdown
                username={user?.fullName}
                onLogout={HandleOnLogout}
              />
            </div>
          )}

          {/* Ngôn ngữ */}
          <LanguageSelector />

          {/* Số điện thoại */}
          <div className="flex items-center space-x-2">
            <PhoneOutlined className="text-red-500 text-lg" />
            <span className="font-bold">{t("Client.Navbar.phone")}</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
