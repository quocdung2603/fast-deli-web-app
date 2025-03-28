import { ClientRouterLink } from "../utils/RouterLink";
import HomePage from "../pages/Client/Home/HomePage";
import AboutPage from "../pages/Client/About/AboutPage";
import ServicePage from "../pages/Client/Services/ServicePage";
import ContactPage from "../pages/Client/Contact/ContactPage";
import OrderInfoPage from "../pages/Client/Order/OrderInfoPage";
import Profile from "../pages/Client/Profile/Profile";
export const ClientRoute = [
  {
    path: ClientRouterLink.Home,
    element: HomePage,
  },
  {
    path: ClientRouterLink.About,
    element: AboutPage,
  },
  {
    path: ClientRouterLink.Services,
    element: ServicePage,
  },
  {
    path: ClientRouterLink.Contact,
    element: ContactPage,
  },
  {
    path: ClientRouterLink.OrderInfo,
    element: OrderInfoPage,
  },
  {
    path: ClientRouterLink.Profile,
    element: Profile,
  },
];
