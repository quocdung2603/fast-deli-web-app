export enum ClientRouterLink {
  Home = "",
  About = "/about",
  Services = "/services",
  Contact = "/contact",
  OrderInfo = `/order-information/:id`,
  Profile = "/profile",
}

export enum AuthRouterLink {
  Login = "login",
  Register = "register",
}

export enum AdminRouterLink {
  Dashboard = "",
  Order = "order",
  Warehouse = "warehouse",
  Shipper = "shipper",
  User = "user",
}
