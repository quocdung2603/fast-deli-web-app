import { useState } from "react";
import { Input, Select, Checkbox, Button, Form } from "antd";
import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import IMG_ABOUT from "../../assets/img/about.jpg";
import { Link } from "react-router-dom";
import { AuthRouterLink } from "../../utils/RouterLink";

const { Option } = Select;

const Register = () => {
  const [agreeTerms, setAgreeTerms] = useState(false);

  const onFinish = (values: any) => {
    console.log("Form values:", values);
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
      <div className="w-3/5 flex flex-col items-center justify-center">
        <div className="bg-white p-10 w-full mx-3">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            TẠO TÀI KHOẢN GHN
          </h2>
          <p className="font-bold text-center text-red-500 mb-6">
            GHN luôn đồng hành cùng bạn
          </p>

          <Form layout="vertical" onFinish={onFinish}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                name="purpose"
                label="Mục đích sử dụng"
                rules={[{ required: true, message: "Vui lòng chọn mục đích" }]}
              >
                <Select placeholder="Chọn mục đích">
                  <Option value="personal">Cá nhân</Option>
                  <Option value="business">Doanh nghiệp</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="username"
                label="Tên tài khoản"
                rules={[
                  { required: true, message: "Vui lòng nhập tên tài khoản" },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Tên tài khoản" />
              </Form.Item>

              <Form.Item
                name="shippingScale"
                label="Quy mô vận chuyển"
                rules={[{ required: true, message: "Vui lòng chọn quy mô" }]}
              >
                <Select placeholder="Chọn quy mô">
                  <Option value="small">Nhỏ</Option>
                  <Option value="medium">Vừa</Option>
                  <Option value="large">Lớn</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="industry"
                label="Ngành hàng"
                rules={[
                  { required: true, message: "Vui lòng chọn ngành hàng" },
                ]}
              >
                <Select placeholder="Chọn ngành hàng">
                  <Option value="fashion">Thời trang</Option>
                  <Option value="electronics">Điện tử</Option>
                </Select>
              </Form.Item>
            </div>

            <Form.Item
              name="phone"
              label="Số điện thoại"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại" },
              ]}
            >
              <Input
                prefix={<PhoneOutlined />}
                placeholder="Nhập số điện thoại"
              />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập email",
                  type: "email",
                },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Nhập email" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu", min: 8 },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Nhập mật khẩu"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Nhập lại mật khẩu"
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true, message: "Vui lòng nhập lại mật khẩu" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Mật khẩu không khớp!"));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Nhập lại mật khẩu"
              />
            </Form.Item>

            <Form.Item>
              <Checkbox
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
              >
                Tôi đã đọc và đồng ý với <Link to="#">Điều khoản dịch vụ</Link>{" "}
                và <Link to="#">Chính sách bảo mật</Link> của Giao Hàng Nhanh.
              </Checkbox>
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              disabled={!agreeTerms}
            >
              Đăng ký
            </Button>
          </Form>

          <p className="text-center text-gray-600 mt-4">
            Bạn đã có tài khoản?{" "}
            <Link
              to={`/auth/${AuthRouterLink.Login}`}
              className="text-blue-500"
            >
              Đăng nhập ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
