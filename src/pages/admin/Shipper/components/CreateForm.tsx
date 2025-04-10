import { useEffect } from "react";
import { SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import { Button, notification } from "antd";
import InputTypeString from "../../../../components/Input/InputTypeString";
import InputTypeSelect from "../../../../components/Input/InputTypeSelect";
import { Shipper } from "../../../../types/Shipper/Shipper";
import { ShipperServices } from "../../../../services/Shipper/ShipperServices";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { UserServices } from "../../../../services/User/UserServices";

interface CreateFormFields extends Shipper {}

type CreateEditArticleFormProps = {
  initForm?: CreateFormFields;
  getAll: () => void;
  closeModal: () => void;
};

const defaultFormValues: CreateFormFields = {
  id: "",
  userId: "",
  fullName: "",
  email: "",
  phoneNumber: "",
  gender: true,
  address: "",
  vehicle: {
    name: "",
    color: "",
    licensePlateNumber: "",
    typeVehicle: "",
  },
  status: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  shipperArea: [],
};

const CreateForm: React.FC<CreateEditArticleFormProps> = ({
  initForm,
  getAll,
  closeModal,
}) => {
  const { control, reset, handleSubmit } = useForm<CreateFormFields>({
    defaultValues: defaultFormValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "shipperArea",
  });

  useEffect(() => {
    if (initForm) {
      reset(initForm);
    } else {
      reset(defaultFormValues);
    }
  }, [initForm, reset]);

  const onSubmit: SubmitHandler<CreateFormFields> = async (data) => {
    //console.log(JSON.stringify(data));
    try {
      if (initForm) {
        // API Update logic
        ShipperServices.update(initForm.id.toString(), data)
          .then(() => {
            notification.success({ message: "Cập nhật thành công" });
            getAll();
            closeModal();
          })
          .catch(() => {
            notification.error({
              message: "Cập nhật thất bại ",
            });
          });
        await UserServices.update(data.userId, {
          fullName: data.fullName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          gender: data.gender,
          address: data.address,
        });
      } else {
        // API Create logic
        ShipperServices.create(data)
          .then(() => {
            notification.success({ message: "ThêmThêm thành công" });
            getAll();
            closeModal();
          })
          .catch(() => {
            notification.error({
              message: "Thêm thất bại ",
            });
          });
      }
      reset(defaultFormValues);
    } catch (err) {
      notification.error({ message: "Có lỗi xảy ra, vui lòng kiểm tra lại!" });
    }
  };

  return (
    <form method="POST" className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full flex flex-col justify-center items-center space-y-5 border p-2">
        <p className="font-semibold text-base">Thông tin cá nhân</p>
        <div className="w-full flex flex-row justify-between items-center space-x-3">
          <InputTypeString
            name="fullName"
            control={control}
            rules={{ required: "Họ và tên không được để trống" }}
            title="Họ và tên"
            placeholder="Nhập họ và tên"
          />
          <InputTypeString
            name="email"
            control={control}
            rules={{ required: "Email kho không được để trống" }}
            title="Email"
            placeholder="Nhập email"
          />
          <InputTypeString
            name="phoneNumber"
            control={control}
            rules={{ required: "Số điện thoại kho không được để trống" }}
            title="Số điện thoại"
            placeholder="Nhập số điện thoại"
          />
        </div>
        <div className="w-full flex flex-row justify-between items-center space-x-3">
          <InputTypeSelect
            name="gender"
            control={control}
            rules={{ required: "Giới tính không được để trống" }}
            title="Giới tính"
            titleOption={[
              { label: "Nam", value: true },
              { label: "Nữ", value: false },
            ]}
          />
          <InputTypeSelect
            name="status"
            control={control}
            rules={{ required: "Trạng thái hoạt động không được để trống" }}
            title="Trạng thái hoạt động"
            titleOption={[
              { label: "Hoạt động", value: true },
              { label: "Không hoạt động", value: false },
            ]}
          />
          <InputTypeString
            name="address"
            control={control}
            rules={{ required: "Địa chỉ thường trú kho không được để trống" }}
            title="Địa chỉ thường trú"
            placeholder="Nhập địa chỉ thường trú"
          />
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center space-y-5 border p-2">
        <p className="font-semibold text-base">Thông tin cá nhân</p>
        <div className="w-full flex flex-row justify-between items-center space-x-3">
          <InputTypeString
            name="vehicle.name"
            control={control}
            rules={{ required: "Phương tiện giao hàng không được để trống" }}
            title="Phương tiện giao hàng"
            placeholder="Nhập phương tiện giao hàng"
          />
          <InputTypeString
            name="vehicle.color"
            control={control}
            rules={{ required: "Màu sắc phương tiện không được để trống" }}
            title="Màu sắc phương tiện"
            placeholder="Nhập màu sắc phương tiện"
          />
        </div>
        <div className="w-full flex flex-row justify-between items-center space-x-3">
          <InputTypeSelect
            name="vehicle.typeVehicle"
            control={control}
            rules={{ required: "Loại phương tiện không được để trống" }}
            title="Loại phương tiện"
            titleOption={[
              { label: "Xe gắn máy", value: "xe gắn máy" },
              { label: "Xe ô tô", value: "xe ô tô" },
              { label: "Xe mô tô 2 bánh", value: "xe mô tô 2 bánh" },
              { label: "Xe mô tô 3 bánh", value: "xe mô tô 3 bánh" },
            ]}
          />
          <InputTypeString
            name="vehicle.licensePlateNumber"
            control={control}
            rules={{
              required: "Biển kiểm soát phương tiện không được để trống",
            }}
            title="Biển kiểm soát phương tiện"
            placeholder="Nhập biển kiểm soát phương tiện phương tiện"
          />
        </div>
      </div>
      <div className="w-full flex flex-col justify-center space-y-3 border p-2">
        <p className="font-semibold text-base text-center">
          Phạm vi hoạt động (Shipper Area)
        </p>
        <div className="flex flex-col space-y-2">
          {fields.map((item, index) => (
            <div key={item.id} className="flex items-center space-x-3">
              <InputTypeString
                name={`shipperArea.${index}.latitude`}
                control={control}
                title="Latitude"
                placeholder="Nhập vĩ độ"
                rules={{ required: "Latitude không được bỏ trống" }}
              />
              <InputTypeString
                name={`shipperArea.${index}.longitude`}
                control={control}
                title="Longitude"
                placeholder="Nhập kinh độ"
                rules={{ required: "Longitude không được bỏ trống" }}
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-500 hover:text-red-700"
              >
                <DeleteOutlined />
              </button>
            </div>
          ))}
        </div>
        <div className="text-left">
          <button
            type="button"
            onClick={() => append({ latitude: 0, longitude: 0 })}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <PlusOutlined className="mr-1" /> Thêm địa điểm
          </button>
        </div>
      </div>
      <div className="text-right">
        <Button
          type="primary"
          htmlType="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          {initForm ? "Cập nhật" : "Tạo"}
        </Button>
      </div>
    </form>
  );
};

export default CreateForm;
