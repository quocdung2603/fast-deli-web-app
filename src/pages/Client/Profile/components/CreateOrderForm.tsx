import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Order } from "../../../../types/Order/Order";
import React, { useEffect } from "react";
import { useAuth } from "../../../../common/context/AuthContext";
import InputTypeFile from "../../../../components/Input/InputTypeFile";
import InputTypeString from "../../../../components/Input/InputTypeString";
import InputTypeNumber from "../../../../components/Input/InputTypeNumber";
import { Button, notification } from "antd";
import { OrderServices } from "../../../../services/Order/OrderServices";
import MapModalPicker from "../../../../components/Map/MapModalPicker";

interface CreateFormFields extends Order {}

type CreateFormProps = {
  initForm?: CreateFormFields;
  getAll: () => void;
  closeModal: () => void;
};

const defaultFormValues: CreateFormFields = {
  id: "",
  userId: "",
  orderCode: "",
  reciverName: "",
  reciverPhone: "",
  senderAddress: "",
  receiverAddress: "",
  note: "",
  weight: 0,
  deliveryFee: 0,
  images: "",
  status: "",
  createAt: new Date(),
  updateAt: new Date(),
  locationSender: { latitude: 0, longitude: 0 },
  locationReciver: { latitude: 0, longitude: 0 },
};

const CreateOrderForm: React.FC<CreateFormProps> = ({
  initForm,
  getAll,
  closeModal,
}) => {
  const { control, reset, handleSubmit, watch } = useForm<CreateFormFields>({
    defaultValues: defaultFormValues,
  });
  const { user } = useAuth();

  const onSubmit: SubmitHandler<CreateFormFields> = async (data) => {
    try {
      if (initForm) {
        await OrderServices.update(initForm.id.toString(), data);
        notification.success({ message: "Cập nhật thành công" });
      } else {
        if (user) {
          const dataReq = { ...data, userId: user?.userId, status: "waiting" };
          await OrderServices.create(dataReq);
          notification.success({ message: "Thêm thành công" });
        }
      }

      closeModal();
      getAll();
      reset(defaultFormValues);
    } catch (err) {
      notification.error({ message: "Có lỗi xảy ra, vui lòng kiểm tra lại!" });
    }
  };

  useEffect(() => {
    if (initForm) {
      reset(initForm);
    } else {
      reset(defaultFormValues);
    }
  }, [initForm, reset]);

  return (
    <form
      method="POST"
      className="w-full p-3 flex flex-col space-y-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-base font-bold text-center">Tạo đơn hàng</h2>
      <div className="w-full flex flex-row space-x-4">
        <div className="w-1/2 h-[270px]">
          <InputTypeFile
            name="images"
            control={control}
            rules={{}}
            label="Chọn ảnh sản phẩm"
          />
        </div>
        <div className="w-1/2 flex flex-col space-y-4">
          <InputTypeNumber
            name="weight"
            control={control}
            rules={{ required: "Khối lượng không được trống" }}
            title="Khối lượng"
            placeholder="Nhập khối lượng"
          />
          <InputTypeNumber
            name="deliveryFee"
            control={control}
            rules={{ required: "Phí giao hàng không được trống" }}
            title="Phí giao hàng"
            placeholder="Nhập phí giao hàng"
          />
        </div>
      </div>
      <div className="w-full flex flex-col justify-between items-center space-y-4 border p-2">
        <p className="text-right text-base">Thông tin người nhận</p>
        <div className="w-full flex flex-row justify-between items-center space-x-10">
          <InputTypeString
            name="reciverName"
            control={control}
            rules={{ required: "Tên người nhận không được trống" }}
            title="Tên người nhận"
            placeholder="Nhập tên người nhận"
          />
          <InputTypeString
            name="reciverPhone"
            control={control}
            rules={{ required: "SĐT người nhận không được trống" }}
            title="SĐT người nhận"
            placeholder="Nhập SĐT người nhận"
          />
          <InputTypeString
            name="receiverAddress"
            control={control}
            rules={{ required: "Địa chỉ người nhận không được trống" }}
            title="Địa chỉ người nhận"
            placeholder="Nhập địa chỉ người nhận"
          />
        </div>
        <div className="w-full">
          <p className="font-semibold text-sm">Chọn vị trí người nhận:</p>
          <Controller
            name="locationReciver"
            control={control}
            rules={{
              validate: (value) =>
                value.latitude !== 0 && value.longitude !== 0 ||
                "Vui lòng chọn một vị trí hợp lệ",
            }}
            render={({ field, fieldState: { error } }) => (
              <div className="space-y-1">
                <MapModalPicker
                  value={field.value}
                  onChange={field.onChange}
                  label="Chọn vị trí người nhận"
                  multiple={false}
                />
                {field.value?.latitude && field.value?.longitude && (
                  <p className="text-sm text-gray-600">
                    📍 Vị trí đã chọn:{" "}
                    <span className="font-medium">
                      ({field.value.latitude.toFixed(6)},{" "}
                      {field.value.longitude.toFixed(6)})
                    </span>
                  </p>
                )}
                {error && (
                  <p className="text-sm text-red-600">{error.message}</p>
                )}
              </div>
            )}
          />
        </div>
      </div>
      <div className="w-full flex flex-col justify-between space-y-4 border p-2">
        <InputTypeString
          name="senderAddress"
          control={control}
          rules={{ required: "Địa chỉ người gửi không được trống" }}
          title="Địa chỉ người gửi"
          placeholder="Địa chỉ người gửi"
        />
        <div className="w-full">
          <p className="font-semibold text-sm">Chọn vị trí người gửi:</p>
          <Controller
            name="locationSender"
            control={control}
            rules={{
              validate: (value) =>
                value.latitude !== 0 && value.longitude !== 0 ||
                "Vui lòng chọn một vị trí hợp lệ",
            }}
            render={({ field, fieldState: { error } }) => (
              <div className="space-y-1">
                <MapModalPicker
                  value={field.value}
                  onChange={field.onChange}
                  label="Chọn vị trí người gửi"
                  multiple={false}
                />
                {field.value?.latitude && field.value?.longitude && (
                  <p className="text-sm text-gray-600">
                    📍 Vị trí đã chọn:{" "}
                    <span className="font-medium">
                      ({field.value.latitude.toFixed(6)},{" "}
                      {field.value.longitude.toFixed(6)})
                    </span>
                  </p>
                )}
                {error && (
                  <p className="text-sm text-red-600">{error.message}</p>
                )}
              </div>
            )}
          />
        </div>
      </div>
      <div className="w-full flex flex-col justify-between space-y-4 border p-2">
        <InputTypeString
          name="note"
          control={control}
          rules={{}}
          title="Ghi chú"
          placeholder="Nhập ghi chú"
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

export default CreateOrderForm;