import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Order } from "../../../../types/Order/Order";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../common/context/AuthContext";
import InputTypeFile from "../../../../components/Input/InputTypeFile";
import InputTypeString from "../../../../components/Input/InputTypeString";
import InputTypeNumber from "../../../../components/Input/InputTypeNumber";
import { Button, notification, Modal, Spin } from "antd";
import { OrderServices } from "../../../../services/Order/OrderServices";
import MapModalViewer from "../../../../components/Map/MapModalViewer";
import InputTypeSelect from "../../../../components/Input/InputTypeSelect";

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

const OrderStatusList = [
  {
    value: "waiting",
    label: "Waiting",
  },
  {
    value: "pending",
    label: "Pending",
  },
  {
    value: "shipping",
    label: "Shipping",
  },
  {
    value: "complete",
    label: "Completed",
  },
  {
    value: "canceled",
    label: "Canceled",
  },
];

const fetchCoordinatesFromAddress = async (address: string) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        address
      )}&format=json&limit=1`,
      {
        headers: {
          "User-Agent": "YourAppName/1.0 (your.email@example.com)",
        },
      }
    );
    const data = await response.json();
    if (data.length > 0) {
      console.log("data map picker", data);
      return {
        latitude: parseFloat(data[0].lat),
        longitude: parseFloat(data[0].lon),
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return null;
  }
};

const CreateForm: React.FC<CreateFormProps> = ({
  initForm,
  getAll,
  closeModal,
}) => {
  const { control, reset, handleSubmit, watch, setValue } =
    useForm<CreateFormFields>({
      defaultValues: defaultFormValues,
    });
  const { user } = useAuth();

  // Theo dõi giá trị địa chỉ nhưng không gọi API trực tiếp
  const senderAddress = watch("senderAddress");
  const receiverAddress = watch("receiverAddress");

  // State để quản lý modal và trạng thái loading
  const [isSenderMapOpen, setIsSenderMapOpen] = useState(false);
  const [isReceiverMapOpen, setIsReceiverMapOpen] = useState(false);
  const [isLoadingSender, setIsLoadingSender] = useState(false);
  const [isLoadingReceiver, setIsLoadingReceiver] = useState(false);
  const [isMapLoading, setIsMapLoading] = useState(false);

  // Hàm xử lý tìm tọa độ
  const handleSearchCoordinates = async (
    address: string,
    field: "locationSender" | "locationReciver"
  ) => {
    if (address) {
      setIsLoadingSender(field === "locationSender");
      setIsLoadingReceiver(field === "locationReciver");
      const coords = await fetchCoordinatesFromAddress(address);
      setIsLoadingSender(false);
      setIsLoadingReceiver(false);
      if (coords) {
        setValue(field, coords);
      } else {
        notification.error({
          message: `Không tìm thấy tọa độ cho địa chỉ ${
            field === "locationSender" ? "người gửi" : "người nhận"
          }!`,
        });
      }
    }
  };

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

  // Hiển thị loading khi modal mở
  useEffect(() => {
    if (isSenderMapOpen || isReceiverMapOpen) {
      setIsMapLoading(true);
      const timer = setTimeout(() => setIsMapLoading(false), 500); // Giả lập thời gian tải
      return () => clearTimeout(timer);
    }
  }, [isSenderMapOpen, isReceiverMapOpen]);

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
          <InputTypeSelect
            title="Trạng thái"
            name="status"
            control={control}
            rules={{ required: "Trạng thái không được trống" }}
            titleOption={OrderStatusList}
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
          <div className="w-full flex flex-row space-x-2 items-center">
            <InputTypeString
              name="receiverAddress"
              control={control}
              rules={{ required: "Địa chỉ người nhận không được trống" }}
              title="Địa chỉ người nhận"
              placeholder="Nhập địa chỉ người nhận"
            />
            <Button
              type="default"
              onClick={() =>
                handleSearchCoordinates(receiverAddress, "locationReciver")
              }
              disabled={!receiverAddress}
              loading={isLoadingReceiver}
            >
              Tìm vị trí
            </Button>
          </div>
        </div>
        <div className="w-full">
          <p className="font-semibold text-sm">Vị trí người nhận:</p>
          <Controller
            name="locationReciver"
            control={control}
            rules={{
              validate: (value) =>
                (value.latitude !== 0 && value.longitude !== 0) ||
                "Vui lòng chọn một vị trí hợp lệ",
            }}
            render={({ field, fieldState: { error } }) => (
              <div className="space-y-1">
                <Button
                  type="default"
                  onClick={() => setIsReceiverMapOpen(true)}
                  disabled={
                    field.value.latitude === 0 ||
                    field.value.longitude === 0 ||
                    isNaN(field.value.latitude) ||
                    isNaN(field.value.longitude)
                  }
                >
                  Xem bản đồ
                </Button>
                <Modal
                  title="Vị trí người nhận"
                  open={isReceiverMapOpen}
                  onCancel={() => setIsReceiverMapOpen(false)}
                  footer={null}
                  width={900}
                >
                  {isMapLoading ? (
                    <div className="flex justify-center items-center h-[400px]">
                      <Spin tip="Đang tải bản đồ..." />
                    </div>
                  ) : (
                    <MapModalViewer
                      value={field.value}
                      label="Vị trí người nhận"
                    />
                  )}
                </Modal>
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
        <div className="w-full flex flex-row justify-center items-center space-x-2">
          <InputTypeString
            name="senderAddress"
            control={control}
            rules={{ required: "Địa chỉ người gửi không được trống" }}
            title="Địa chỉ người gửi"
            placeholder="Địa chỉ người gửi"
          />
          <Button
            type="default"
            onClick={() =>
              handleSearchCoordinates(senderAddress, "locationSender")
            }
            disabled={!senderAddress}
            loading={isLoadingSender}
          >
            Tìm vị trí
          </Button>
        </div>
        <div className="w-full">
          <p className="font-semibold text-sm">Vị trí người gửi:</p>
          <Controller
            name="locationSender"
            control={control}
            rules={{
              validate: (value) =>
                (value.latitude !== 0 && value.longitude !== 0) ||
                "Vui lòng chọn một vị trí hợp lệ",
            }}
            render={({ field, fieldState: { error } }) => (
              <div className="space-y-1">
                <Button
                  type="default"
                  onClick={() => setIsSenderMapOpen(true)}
                  disabled={
                    field.value.latitude === 0 ||
                    field.value.longitude === 0 ||
                    isNaN(field.value.latitude) ||
                    isNaN(field.value.longitude)
                  }
                >
                  Xem bản đồ
                </Button>
                <Modal
                  title="Vị trí người gửi"
                  open={isSenderMapOpen}
                  onCancel={() => setIsSenderMapOpen(false)}
                  footer={null}
                  width={900}
                >
                  {isMapLoading ? (
                    <div className="flex justify-center items-center h-[400px]">
                      <Spin tip="Đang tải bản đồ..." />
                    </div>
                  ) : (
                    <MapModalViewer
                      value={field.value}
                      label="Vị trí người gửi"
                    />
                  )}
                </Modal>
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

export default CreateForm;
