import React from "react";

interface inputBrailleProps{
    className?:string,
    nameLabel:string,
    type:string,
    value?:string,
    setValue: (value:string)=>void,
}

const InputBraille:React.FC<inputBrailleProps> = ({className,nameLabel,type,value="",setValue}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setValue(inputValue === "" ? "" : inputValue);
      };
	return (
		<div className={`${className} relative w-1/3`}>
			<input
				type={type || "text"}
				value={value}
				onChange={handleChange}
				className="peer relative w-full border-small bg-transparent border-solid border-gray-600 border-opacity-30 focus:rounded focus:border-red focus:z-0 p-3 outline-none transitionHight z-1"
			/>
			<label
				htmlFor=""
				className={`${value === "" ? "top-3":"-top-3 z-1"} absolute left-4 bg-white text-gray-400 text-sm px-1 peer-focus:-top-3 peer-focus:z-1 z-0 transitionHight`}>
				{nameLabel}
			</label>
		</div>
	);
};

export default InputBraille;
