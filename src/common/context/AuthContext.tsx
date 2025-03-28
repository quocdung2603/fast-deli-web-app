import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { UserLoginRequest, UserLoginResponse } from "../../types/User/User";
import { ClientRouterLink } from "../../utils/RouterLink";
import { UserServices } from "../../services/User/UserServices";
import { notification } from "antd";
import { UserInfoResponse, User } from "../../types/User/User";

interface AuthContextType {
  login: (loginData: UserLoginRequest) => void;
  logout: () => void;
  token: string | null | undefined;
  user: User | null | undefined;
}

const USER_TOKEN = import.meta.env.VITE_USER_TOKEN;
const USER = import.meta.env.VITE_USER;
export const AuthConext = createContext<AuthContextType | null | undefined>(
  undefined
);

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null | undefined>(() => {
    const storeUser = localStorage.getItem(USER);
    if (storeUser) {
      try {
        const parsedUser = JSON.parse(storeUser);
        return parsedUser as User;
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        return null;
      }
    }
    return undefined;
  });
  const [token, setToken] = useState<string | null | undefined>(() => {
    const storeToken = localStorage.getItem(USER_TOKEN);
    return storeToken ? storeToken : undefined;
  });

  const login = async (loginData: UserLoginRequest) => {
    const res: UserLoginResponse = await UserServices.login(
      loginData.email,
      loginData.password
    );
    localStorage.setItem(USER_TOKEN, res.data);
    const findUser: UserInfoResponse = await UserServices.findUserByToken(
      res.data
    );
    localStorage.setItem(USER, JSON.stringify(findUser.data));
    setUser(findUser.data);
    setToken(res.data);
    navigate(ClientRouterLink.Home);
  };
  const logout = () => {
    localStorage.removeItem(USER_TOKEN);
    localStorage.removeItem(USER);
    setToken(null);
    setUser(null);
    navigate(ClientRouterLink.Home);
  };
  const checkToken = async () => {
    try {
      const res: { data: boolean } = await UserServices.checktoken(token);
      if (res?.data == false) {
        logout();
      }
    } catch (error) {
      notification.error({ message: "Hết hạn token vui lòng đăng nhập lại!" });
      logout();
    }
  };

  useEffect(() => {
    checkToken();
  }, [token, user]);
  return (
    <AuthConext.Provider value={{ login, logout, token, user }}>
      {children}
    </AuthConext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthConext);
  if (!context) throw new Error("User này bị rỗng");
  return context;
};
