import { useEffect, useState } from "react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { Button, notification } from "antd";
import InputTypeString from "../../../../components/Input/InputTypeString";
import InputTypeSelect from "../../../../components/Input/InputTypeSelect";
import { Shipper } from "../../../../types/Shipper/Shipper";
import { ShipperServices } from "../../../../services/Shipper/ShipperServices";
import { UserServices } from "../../../../services/User/UserServices";
import MapModalPicker from "../../../../components/Map/MapModalPicker";
import { Warehouse } from "../../../../types/Order/Warehouse";
import { WarehouseServices } from "../../../../services/Order/WarehouseServices";

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

  const [listWarehouse, setListWarehouse] = useState<
    { latitude: number; longitude: number }[]
  >([]);

  const getAllWarehouse = async () => {
    WarehouseServices.getAll().then((res) => {
      const locations = res.data.map((warehouse: Warehouse) => ({
        latitude: warehouse.location.latitude,
        longitude: warehouse.location.longitude,
      }));
      console.log(locations);
      setListWarehouse(locations);
    });
  };
  // const { fields, append, remove } = useFieldArray({
  //   control,
  //   name: "shipperArea",
  // });

  useEffect(() => {
    if (initForm) {
      reset(initForm);
    } else {
      reset(defaultFormValues);
    }
  }, [initForm, reset]);

  useEffect(() => {
    getAllWarehouse();
  }, []);

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
      <div className="w-full">
        <p className="font-semibold text-sm">Chọn khu vực shipper:</p>
        <Controller
          name="shipperArea"
          control={control}
          rules={{
            validate: (value) =>
              (Array.isArray(value) && value.length > 0) ||
              "Vui lòng chọn ít nhất một vị trí hợp lệ",
          }}
          render={({ field, fieldState: { error } }) => (
            <div className="space-y-1">
              <MapModalPicker
                value={field.value || []} // Đảm bảo value luôn là mảng
                onChange={field.onChange}
                label="Chọn khu vực shipper"
                multiple={true}
                AdditionalLocations={listWarehouse} // Truyền danh sách vị trí thêm vào
              />
              {Array.isArray(field.value) && field.value.length > 0 && (
                <div className="text-sm text-gray-600">
                  <p>📍 Các vị trí đã chọn:</p>
                  <ul className="list-disc pl-5">
                    {field.value.map((point, index) => (
                      <li key={index} className="font-medium">
                        ({point.latitude.toFixed(6)},{" "}
                        {point.longitude.toFixed(6)})
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {error && <p className="text-sm text-red-600">{error.message}</p>}
            </div>
          )}
        />
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
