import { useController, FieldValues, UseControllerProps, Path, PathValue } from 'react-hook-form';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';

interface InputDescriptionProps<T extends FieldValues> extends UseControllerProps<T> {
  placeholder: string;
  defaultValue?: PathValue<T, Path<T>>;  // Cập nhật kiểu defaultValue
}

const InputDescription = <T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  placeholder,
}: InputDescriptionProps<T>) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController<T>({
    name,
    control,
    defaultValue: defaultValue as PathValue<T, Path<T>>, // Cập nhật với kiểu mặc định phù hợp
    rules,
  });

  return (
    <div className="w-full min-w-[200px] mb-5 text-black">
      <CKEditor
        editor={ClassicEditor}
        config={{
          toolbar: {
            items: [
              'undo',
              'redo',
              '|',
              'heading',
              '|',
              'fontSize',
              'fontColor',
              'fontBackgroundColor',
              '|',
              'bold',
              'italic',
              'strikethrough',
              'subscript',
              'superscript',
              'code',
              '-',
              '|',
              'alignment',
              'link',
              'imageUpload',
              'blockQuote',
              'codeBlock',
              '|',
              'bulletedList',
              'numberedList',
              'todoList',
              'outdent',
              'indent',
            ],
          },
          image: {
            toolbar: [
              'imageTextAlternative',
              'imageStyle:full',
              'imageStyle:side',
            ],
          },
          placeholder: placeholder,
        }}
        data={value} // Sử dụng giá trị từ react-hook-form
        onChange={(event, editor) => {
          const data = editor.getData(); // Lấy dữ liệu từ CKEditor
          onChange(data); // Đồng bộ dữ liệu với react-hook-form
        }}
      />
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};

export default InputDescription;
