import DashboardPage from "../pages/admin/Dashboard/DashboardPage";
import OrderPage from "../pages/admin/Order/OrderPage";
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
];
