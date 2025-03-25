import DashboardPage from "../pages/admin/Dashboard/DashboardPage";
import OrderPage from "../pages/admin/Order/OrderPage";
import ShipperPage from "../pages/admin/Shipper/ShipperPage";
import UserPage from "../pages/admin/User/UserPage";
import WarehousePage from "../pages/admin/Warehouse/WarehousePage";
import { AdminRouterLink } from "../utils/RouterLink";

export const AdminRoute = [
  {
    path: AdminRouterLink.Dashboard,
    element: DashboardPage,
  },
  {
    path: AdminRouterLink.Order,
    element: OrderPage,
  },
  {
    path: AdminRouterLink.Warehouse,
    element: WarehousePage,
  },
  {
    path: AdminRouterLink.Shipper,
    element: ShipperPage,
  },
  {
    path: AdminRouterLink.User,
    element: UserPage,
  },
];
