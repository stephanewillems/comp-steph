import React from 'react';

interface LabeledInputProps {
  id: string;
  label: string;
  value: string;
  saveChanges: () => void;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  iconSrc: string;
}

const InputFieldButton = ({ id, label, value, onChange, saveChanges, placeholder, iconSrc, required = false }: LabeledInputProps) => {
  return (
    <div className="relative flex h-9 items-center justify-start rounded" style={{ border: '1px solid #0073E6' }}>
      <input
        type="text"
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-[350px] px-3 text-left font-inter text-base font-medium tracking-tight text-[#333333]"
        required={required}
        autoComplete='off'
      />
      <div
        className={`absolute right-0 bottom-0 flex h-[30px] w-[85px] cursor-pointer items-center justify-around rounded-br-md rounded-tr-sm bg-[#E4E9F2] ${value.length === 0 && ' pointer-events-none select-none opacity-50'}`}
        onClick={() => saveChanges()}
      >
        <img src={iconSrc} className='h-4 w-4'/>
        <label className="cursor-pointer text-left font-inter text-base font-semibold tracking-tight text-[#0073E6]">
          {label}
        </label>
      </div>
    </div>
  );
};

export default InputFieldButton;
