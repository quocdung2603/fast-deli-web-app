import Login from "../components/Form/Login";
import Register from "../components/Form/Register";
import { AuthRouterLink } from "../utils/RouterLink";

export const AuthRoute = [
  {
    path: AuthRouterLink.Login,
    element: Login,
  },
  {
    path: AuthRouterLink.Register,
    element: Register,
  },
];
