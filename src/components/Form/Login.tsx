import { useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import IMG_ABOUT from "../../assets/img/about.jpg";
import { AuthRouterLink, ClientRouterLink } from "../../utils/RouterLink";
import { useAuth } from "../../common/context/AuthContext";
import { UserLoginRequest } from "../../types/User/User";

const Login = () => {
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    console.log("Login data:", values);
    const dataLogin: UserLoginRequest = {
      email: values.email,
      password: values.password,
    };
    login(dataLogin);
    navigate(`${ClientRouterLink.Home}`);
  };

  return (
    <div className="flex flex-row min-h-screen">
      {/* Left Side - Image */}
      <div className="w-2/5 min-h-full">
        <img
          src={IMG_ABOUT}
          alt="About"
          className="w-full h-full object-cover"
        />
      </div>
      {/* Right Side - Form */}
      <div className="w-3/5 flex items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Đăng nhập
          </h2>
          <p className="text-center text-orange-500 mb-6">
            Chào ngày mới! Cùng chốt nhiều đơn hôm nay nhé!
          </p>

          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="email"
              label="Tài khoản"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số điện thoại hoặc email!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Nhập số điện thoại/email"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Nhập mật khẩu"
              />
            </Form.Item>

            <div className="flex justify-between mb-4">
              <Checkbox onChange={(e) => setCaptchaChecked(e.target.checked)}>
                Tôi không phải là người máy
              </Checkbox>
            </div>

            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-orange-500 hover:bg-red-500"
              disabled={!captchaChecked}
            >
              Đăng nhập
            </Button>
          </Form>

          <div className="text-center mt-4">
            <Link to={""} className="text-orange-500">
              Quên mật khẩu?
            </Link>
          </div>

          <div className="text-center text-gray-600 mt-4">
            Bạn chưa có tài khoản?{" "}
            <Link
              to={`/auth/${AuthRouterLink.Register}`}
              className="text-blue-500"
            >
              Đăng ký ngay
            </Link>
          </div>

          <div className="text-center text-blue-500 mt-2">
            <Link to={""}>Nhân sự GHN bấm vào đây để đăng nhập</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
