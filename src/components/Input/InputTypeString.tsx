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

const InputTypeString = <T extends FieldValues>({
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

  return (
    <div className="w-full min-w-[200px] mb-5">
      <label className="block mb-1 text-sm text-black font-medium">
        {title}
      </label>
      <input
        type="text"
        value={value || ""} // Dùng giá trị mặc định là 0 nếu không có giá trị
        onChange={(e) => onChange(e.target.value)} // Convert từ string sang number
        className="w-full h-10 bg-gray-200 text-black text-sm border border-black rounded-3xl px-3 py-2 transition duration-300 ease focus:outline-none shadow-sm focus:shadow-md"
        placeholder={placeholder}
      />
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};

export default InputTypeString;
