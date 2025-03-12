import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, notification } from "antd";
import InputTypeString from "../../../../components/Input/InputTypeString";
import { Warehouse } from "../../../../types/Warehouse";
import InputTypeSelect from "../../../../components/Input/InputTypeSelect";
import InputTypeNumber from "../../../../components/Input/InputTypeNumber";
interface CreateFormFields extends Warehouse {}

type CreateEditArticleFormProps = {
  initForm?: CreateFormFields;
  getAll: () => void;
  closeModal: () => void;
};

const defaultFormValues = {
  name: "",
  type: "",
  location: {
    latitute: 0,
    longitute: 0,
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputTypeNumber
          name="location.longitute"
          control={control}
          rules={{ required: "Kinh độ của kho không được để trống" }}
          title="Kinh độ"
          placeholder="Nhập kinh độ của kho"
        />
        <InputTypeNumber
          name="location.latitute"
          control={control}
          rules={{ required: "Vĩ độ của kho không được để trống" }}
          title="Vĩ độ"
          placeholder="Nhập vĩ độ của kho"
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
