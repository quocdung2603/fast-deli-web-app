import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, notification } from "antd";
import InputTypeString from "../../../../components/Input/InputTypeString";
import InputTypeSelect from "../../../../components/Input/InputTypeSelect";
import InputTypeNumber from "../../../../components/Input/InputTypeNumber";
import { Shipper } from "../../../../types/Shipper/Shipper";
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

const CreateForm: React.FC<CreateEditArticleFormProps> = ({
  initForm,
  getAll,
  closeModal,
}) => {
  const { control, reset, handleSubmit } = useForm<CreateFormFields>({
    defaultValues: defaultFormValues,
  });

  useEffect(() => {
    if (initForm) {
      reset(initForm);
    } else {
      reset(defaultFormValues);
    }
  }, [initForm, reset]);

  const onSubmit: SubmitHandler<CreateFormFields> = async (data) => {
    try {
      if (initForm) {
        // API Update logic
        // WarehouseServices.update(initForm.warehouseID.toString(), data)
        //   .then(() => {
        //     notification.success({ message: "Cập nhật thành công" });
        //     getAll();
        //     closeModal();
        //   })
        //   .catch(() => {
        //     notification.error({
        //       message: "Cập nhật thất bại ",
        //     });
        //   });
      } else {
        // API Create logic
        // WarehouseServices.create(data)
        //   .then(() => {
        //     notification.success({ message: "ThêmThêm thành công" });
        //     getAll();
        //     closeModal();
        //   })
        //   .catch(() => {
        //     notification.error({
        //       message: "Thêm thất bại ",
        //     });
        //   });
      }
      reset(defaultFormValues);
    } catch (err) {
      notification.error({ message: "Có lỗi xảy ra, vui lòng kiểm tra lại!" });
    }
  };

  return (
    <form method="POST" className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
