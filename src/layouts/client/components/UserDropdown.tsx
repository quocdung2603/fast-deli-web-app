import { useState, useRef, useEffect } from "react";
import { Menu, MenuProps } from "antd";
import {
  SettingOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import IMG_AVATAR from "../../../assets/img/avatar-1.png";

interface UserDropdownProps {
  username: string;
  onLogout: () => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ username, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Ẩn menu khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const menuItems: MenuProps["items"] = [
    {
      key: "1",
      label: "Xem tất cả trang cá nhân",
      icon: <EyeOutlined />,
      onClick: () => {},
    },
    { key: "2", label: "Cài đặt & quyền riêng tư", icon: <SettingOutlined /> },
    { key: "3", label: "Trợ giúp & hỗ trợ", icon: <QuestionCircleOutlined /> },
    {
      key: "4",
      label: "Đăng xuất",
      icon: <LogoutOutlined />,
      onClick: onLogout,
    },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar */}
      <img
        src={IMG_AVATAR}
        alt="Avatar"
        className="w-10 h-10 rounded-full cursor-pointer border border-gray-300 hover:border-blue-500"
        onClick={() => setIsOpen(!isOpen)}
      />

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded-lg shadow-lg z-50">
          <div className="p-4 flex items-center space-x-3 border-b border-gray-700">
            <img
              src={IMG_AVATAR}
              alt="Avatar"
              className="w-10 h-10 rounded-full"
            />
            <span className="text-lg font-semibold">{username}</span>
          </div>
          <Menu className="bg-white text-black" items={menuItems} />
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
