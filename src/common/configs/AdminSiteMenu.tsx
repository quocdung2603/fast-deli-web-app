import MenuItem from "antd/es/menu/MenuItem";
import { AdminRouterLink } from "../../utils/RouterLink";
import { HomeOutlined } from "@ant-design/icons";

interface MenuItem {
  content: string;
  icon?: React.ReactNode;
  href?: string;
  submenu?: MenuItem[] | null;
  isCollapse: boolean;
}

export const AdminSiteMenu: MenuItem[] = [
  {
    content: "Dashboard",
    icon: <HomeOutlined />,
    href: AdminRouterLink.Dashboard,
    submenu: null,
    isCollapse: false,
  },
  {
    content: "Orders",
    icon: <HomeOutlined />,
    href: AdminRouterLink.Order,
    submenu: null,
    isCollapse: false,
  },
  {
    content: "Warehouse",
    icon: <HomeOutlined />,
    href: AdminRouterLink.Warehouse,
    submenu: null,
    isCollapse: false,
  },
];
