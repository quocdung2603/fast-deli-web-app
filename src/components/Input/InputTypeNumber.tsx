import {
  useController,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";

interface InputTypeNumberProps<T extends FieldValues>
  extends UseControllerProps<T> {
  title: string;
  placeholder: string;
}

const InputTypeNumber = <T extends FieldValues>({
  name,
  control,
  title,
  placeholder,
  rules,
}: InputTypeNumberProps<T>) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController<T>({
    name,
    control,
    rules,
  });

  // Hàm loại bỏ số 0 đứng đầu
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    // Loại bỏ tất cả các số 0 đứng đầu
    if (/^0\d+/.test(inputValue)) {
      inputValue = inputValue.replace(/^0+/, "");
    }

    // Nếu rỗng thì gán giá trị là ''
    onChange(inputValue === "" ? "" : Number(inputValue));
  };

  return (
    <div className="w-full min-w-[200px] mb-5">
      <label className="block mb-1 text-lg text-black font-medium">
        {title}
      </label>
      <input
        type="number"
        value={value ?? ""} // Hiển thị trống khi không có giá trị
        onChange={handleChange} // Gọi hàm xử lý khi thay đổi
        className="w-full h-10 bg-gray-200 text-black text-sm border border-black rounded-3xl px-3 py-2 transition duration-300 ease focus:outline-none shadow-sm focus:shadow-md"
        placeholder={placeholder}
        min="0" // Không cho nhập số âm
      />
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};

export default InputTypeNumber;
