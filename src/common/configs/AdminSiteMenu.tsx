import MenuItem from "antd/es/menu/MenuItem";
import { AdminRouterLink } from "../../utils/RouterLink";
import { HomeOutlined } from "@ant-design/icons";
import {
  IcDashboard,
  IcOrder,
  IcShipper,
  IcUser,
  IcWarehouse,
} from "../../components/Icon/AdminIcon";

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
    icon: <IcDashboard />,
    href: AdminRouterLink.Dashboard,
    submenu: null,
    isCollapse: false,
  },
  {
    content: "Orders",
    icon: <IcOrder />,
    href: AdminRouterLink.Order,
    submenu: null,
    isCollapse: false,
  },
  {
    content: "Warehouse",
    icon: <IcWarehouse />,
    href: AdminRouterLink.Warehouse,
    submenu: null,
    isCollapse: false,
  },
  {
    content: "Shipper",
    icon: <IcShipper />,
    href: AdminRouterLink.Shipper,
    submenu: null,
    isCollapse: false,
  },
  {
    content: "User",
    icon: <IcUser />,
    href: AdminRouterLink.User,
    submenu: null,
    isCollapse: false,
  },
];
