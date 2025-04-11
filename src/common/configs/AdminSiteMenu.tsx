import MenuItem from "antd/es/menu/MenuItem";
import { AdminRouterLink } from "../../utils/RouterLink";
import {
  IcDashboard,
  IcOrder,
  IcShipper,
  IcUser,
  IcWarehouse,
} from "../../components/Icon/AdminIcon";
import { useTranslation } from "react-i18next";

interface MenuItem {
  content: string;
  icon?: React.ReactNode;
  href?: string;
  submenu?: MenuItem[] | null;
  isCollapse: boolean;
}

export const AdminSiteMenu = (): MenuItem[] => {
  const { t } = useTranslation();

  return [
    {
      content: `${t("Admin.dashboard")}`,
      icon: <IcDashboard />,
      href: AdminRouterLink.Dashboard,
      submenu: null,
      isCollapse: false,
    },
    {
      content: `${t("Admin.order")}`,
      icon: <IcOrder />,
      href: AdminRouterLink.Order,
      submenu: null,
      isCollapse: false,
    },
    {
      content: `${t("Admin.warehouse")}`,
      icon: <IcWarehouse />,
      href: AdminRouterLink.Warehouse,
      submenu: null,
      isCollapse: false,
    },
    {
      content: `${t("Admin.shipper")}`,
      icon: <IcShipper />,
      href: AdminRouterLink.Shipper,
      submenu: null,
      isCollapse: false,
    },
    {
      content: `${t("Admin.user")}`,
      icon: <IcUser />,
      href: AdminRouterLink.User,
      submenu: null,
      isCollapse: false,
    },
  ];
};
