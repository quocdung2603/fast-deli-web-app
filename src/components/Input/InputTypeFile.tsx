import React from "react";
import { Controller, UseControllerProps, FieldValues } from "react-hook-form";
import { IconUploadFile } from "../../Common/Icon/Icon";

interface InputTypeFileProps<T extends FieldValues>
  extends UseControllerProps<T> {
  label: string;
}

const InputTypeFile = <T extends FieldValues>({
  name,
  control,
  label,
  rules,
}: InputTypeFileProps<T>) => {
  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: any) => void
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      onChange(file); // Truyền file vào react-hook-form thay vì tên file
    }
  };

  const handleRemoveFile = (onChange: (value: any) => void) => {
    onChange(null); // Xóa file
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <div className="relative">
          <label
            htmlFor="dropzone-file"
            className="mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center rounded-xl border-2 border-dashed border-blue-400 bg-white p-6 text-center"
          >
            {value ? (
              <div className="w-full text-center">
                <img
                  src={
                    typeof value === "string"
                      ? value
                      : URL.createObjectURL(value)
                  } // Kiểm tra kiểu dữ liệu
                  alt="Selected file"
                  className="w-48 h-48 object-cover mx-auto"
                />
                {/* <p className="text-gray-700">{value}</p> */}
                <button
                  type="button"
                  onClick={() => handleRemoveFile(onChange)}
                  className="mt-2 text-red-500"
                >
                  Xóa ảnh
                </button>
              </div>
            ) : (
              <>
                <IconUploadFile />
                <h2 className="mt-4 text-xl font-medium text-gray-700 tracking-wide">
                  {label}
                </h2>
                <p className="mt-2 text-gray-500 tracking-wide">
                  Upload or drag & drop your file SVG, PNG, JPG, or GIF.
                </p>
              </>
            )}
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={(e) => handleFileChange(e, onChange)} // Truyền hàm onChange vào
            />
          </label>
          {error && <p className="text-red-500 text-sm">{error.message}</p>}
          {value && <p className="text-green-500 text-sm">File uploaded</p>}
        </div>
      )}
    />
  );
};

export default InputTypeFile;
