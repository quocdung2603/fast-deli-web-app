interface InputTypeBooleanProps {
  title: string,
  content: boolean,
  setContent: React.Dispatch<React.SetStateAction<boolean>>,
}

const InputTypeBoolean: React.FC<InputTypeBooleanProps> = ({ title, content, setContent }) => {
return (
  <div className='w-full min-w-[200px] mb-5'>
    <label className='block mb-1 text-lg text-black font-medium'>
      {title}
    </label>
    <select
      className='w-full h-10 bg-gray-200 text-black text-sm border border-black rounded-3xl px-3 py-2 transition duration-300 ease focus:outline-none shadow-sm focus:shadow-md'
      value={content.toString()} // Convert boolean to string for the select element
      onChange={(e) => setContent(e.target.value === "true")} // Convert back to boolean
    >
      <option value="true">True</option>
      <option value="false">False</option>
    </select>
  </div>
);
};

export default InputTypeBoolean;