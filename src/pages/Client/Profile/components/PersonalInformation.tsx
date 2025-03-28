import { useState } from "react";
import { IoMdPerson } from "react-icons/io";
import { useAuth } from "../../../../common/context/AuthContext";
import InputBraille from "../../../../components/Input/InputBraille";
import { Button } from "antd";

const PersonalInformation = () => {
  const { user } = useAuth();

  // Khởi tạo state với dữ liệu từ user
  const [name, setName] = useState<string>(user?.fullName || "Lê Tuấn Kiệt");
  const [email, setEmail] = useState<string>(user?.email || "admin@gmail.com");
  const [gender, setGender] = useState<string>(user?.gender ? "Nam" : "Nữ");
  const [phone, setPhone] = useState<string>(user?.phoneNumber || "0346883312");
  const [address, setAddress] = useState<string>(user?.address || "Bình Dương");

  return (
    <div className="w-full space-y-5">
      <div className="flex gap-6 items-center mb-8">
        <IoMdPerson className="rounded-full shadow-custom text-8xl text-gray-300" />
        <div>
          <h1 className="text-lg font-medium">
            {user?.fullName || "Lê Tuấn Kiệt"}
          </h1>
          <p className="text-blue-700 text-sm font-medium">Đổi mật khẩu</p>
        </div>
      </div>
      <div className="border border-gray-500 border-opacity-30 p-4">
        <div className="flex justify-between mb-4">
          <h1 className="text-base font-medium">Thông tin cá nhân</h1>
          <div>
            <Button className="py-3 px-4 rounded-full before:rounded-full after:rounded-full">
              Cập nhật
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-6">
            <InputBraille
              value={name}
              setValue={setName}
              nameLabel="Họ và tên"
              type="text"
              className="w-full"
            />
          </div>
          <div className="flex gap-6">
            <InputBraille
              value={gender}
              setValue={setGender}
              nameLabel="Giới tính"
              type="text"
            />
            <InputBraille
              value={phone}
              setValue={setPhone}
              nameLabel="Số điện thoại"
              type="text"
            />
          </div>
          <div className="flex gap-6">
            <InputBraille
              value={email}
              setValue={setEmail}
              nameLabel="Email"
              type="email"
              className="w-full"
            />
          </div>
          <div className="flex gap-6">
            <InputBraille
              value={address}
              setValue={setAddress}
              nameLabel="Địa chỉ"
              type="text"
              className="w-full"
            />
          </div>
        </div>
      </div>
      <div className="border border-gray-500 border-solid border-opacity-30 p-4">
        <div className="flex justify-between mb-4">
          <h1 className="text-base font-medium">Thông tin ngân hàng</h1>
          <div>
            <Button className="py-3 px-4 rounded-full before:rounded-full after:rounded-full">
              Cập nhật
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex">
            <InputBraille
              value=""
              setValue={() => {}}
              nameLabel="Số tài khoản ngân hàng"
              type="text"
              className="w-full"
            />
          </div>
          <div className="flex">
            <InputBraille
              value=""
              setValue={() => {}}
              nameLabel="Tên ngân hàng"
              type="text"
              className="w-full"
            />
          </div>
          <div className="flex">
            <InputBraille
              value=""
              setValue={() => {}}
              nameLabel="Chi nhánh ngân hàng"
              type="text"
              className="w-full"
            />
          </div>
          <div className="flex">
            <InputBraille
              value=""
              setValue={() => {}}
              nameLabel="Tên chủ tài khoản"
              type="text"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
