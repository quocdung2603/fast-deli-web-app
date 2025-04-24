import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button, Modal, notification, Spin } from "antd";
import InputTypeString from "../../../../components/Input/InputTypeString";
import { Warehouse } from "../../../../types/Order/Warehouse";
import InputTypeSelect from "../../../../components/Input/InputTypeSelect";
import InputTypeNumber from "../../../../components/Input/InputTypeNumber";
import MapModalViewer from "../../../../components/Map/MapModalViewer";
import { WarehouseServices } from "../../../../services/Order/WarehouseServices";
interface CreateFormFields extends Warehouse {}

type CreateEditArticleFormProps = {
  initForm?: CreateFormFields;
  getAll: () => void;
  closeModal: () => void;
};

const defaultFormValues = {
  name: "",
  type: "",
  address: "",
  location: {
    longitude: 0,
    latitude: 0,
  },
};

const WarehouseType = [
  {
    label: "Kho trung chuyển",
    value: "Kho trung chuyển",
  },
  {
    label: "Kho cơ sở",
    value: "Kho cơ sở",
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

const CreateForm: React.FC<CreateEditArticleFormProps> = ({
  initForm,
  getAll,
  closeModal,
}) => {
  const { control, reset, handleSubmit, setValue, watch } =
    useForm<CreateFormFields>({
      defaultValues: defaultFormValues,
    });

  const location = watch("location");

  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [isMapLoading, setIsMapLoading] = useState(false);
  const [isLocationMapOpen, setIsLocationMapOpen] = useState(false);

  useEffect(() => {
    if (initForm) {
      reset(initForm);
    } else {
      reset(defaultFormValues);
    }
  }, [initForm, reset]);

  const handleSearchCoordinates = async (address: string) => {
    if (address) {
      setIsLoadingLocation(true);
      const coords = await fetchCoordinatesFromAddress(address);
      setIsLoadingLocation(false);
      if (coords) {
        setValue("location", coords);
      } else {
        notification.error({
          message: `Không tìm thấy tọa độ cho địa chỉ!`,
        });
      }
    }
  };

  const onSubmit: SubmitHandler<CreateFormFields> = async (data) => {
    // console.log("data", data);
    try {
      if (initForm) {
        // API Update logic
        WarehouseServices.update(initForm.id.toString(), data)
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
      } else {
        // API Create logic
        WarehouseServices.create(data)
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
      <InputTypeString
        name="name"
        control={control}
        rules={{ required: "Tên kho không được để trống" }}
        title="Tên kho"
        placeholder="Nhập tên kho"
      />
      <InputTypeSelect
        name="type"
        control={control}
        rules={{ required: "Vui lòng chọn loại kho" }}
        title="Loại kho"
        titleOption={WarehouseType}
      />
      <div className="w-full flex flex-row space-x-2 items-center">
        <InputTypeString
          name="address"
          control={control}
          rules={{ required: "Địa chỉ không được để trống" }}
          title="Địa chỉ"
          placeholder="Nhập địa chỉ kho"
        />
        <Button
          type="default"
          onClick={() => handleSearchCoordinates(watch("address") || "")}
          disabled={!watch("address")}
          loading={isLoadingLocation}
        >
          Tìm vị trí
        </Button>
      </div>
      <div className="w-full">
        <p className="font-semibold text-sm">Vị trí kho:</p>
        <Controller
          name="location"
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
                onClick={() => setIsLocationMapOpen(true)}
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
                open={isLocationMapOpen}
                onCancel={() => setIsLocationMapOpen(false)}
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
