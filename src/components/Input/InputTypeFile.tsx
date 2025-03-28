import React from "react";
import { Controller, UseControllerProps, FieldValues } from "react-hook-form";
import { MdDriveFolderUpload } from "react-icons/md";

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
    value: string[],
    onChange: (value: string[]) => void
  ) => {
    const files = event.target.files;
    if (files) {
      const newImageUrls = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      onChange([...value, ...newImageUrls]); // Cập nhật danh sách ảnh
    }
  };

  const handleRemoveFile = (
    index: number,
    value: string[],
    onChange: (value: string[]) => void
  ) => {
    const updatedImages = value.filter((_, i) => i !== index);
    onChange(updatedImages); // Cập nhật danh sách ảnh sau khi xóa
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { value = [], onChange }, fieldState: { error } }) => (
        <div className="relative">
          <label
            htmlFor={name}
            className="mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center rounded-xl border-2 border-dashed border-blue-400 bg-white p-3 text-center"
          >
            <MdDriveFolderUpload size={40} />
            <h2 className="mt-4 text-base font-medium text-gray-700 tracking-wide">
              {label}
            </h2>
            <p className="mt-2 text-gray-500 tracking-wide">
              Upload or drag & drop your images (PNG, JPG, GIF).
            </p>
            <input
              id={name}
              type="file"
              className="hidden"
              multiple
              accept="image/png, image/jpg, image/jpeg, image/gif"
              onChange={(e) => handleFileChange(e, value, onChange)}
            />
          </label>

          {/* Hiển thị danh sách ảnh */}

          {error && <p className="text-red-500 text-sm">{error.message}</p>}
          {value.length > 0 && (
            <p className="text-green-500 text-sm">Files uploaded</p>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-2 border h-24 overflow-x-auto">
            {value.map((imgUrl: string, index: number) => (
              <div key={index} className="relative w-20 h-20">
                <img
                  src={imgUrl}
                  alt={`Uploaded ${index}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveFile(index, value, onChange)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    />
  );
};

export default InputTypeFile;
