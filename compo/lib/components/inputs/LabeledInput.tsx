import React from 'react';
import Label from '../text/Label';
import { useTranslation } from 'react-i18next';

interface LabeledInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}

const LabeledInput = ({ id, label, value, onChange, placeholder, required = false }:LabeledInputProps) => {
  const {t} = useTranslation();
  return (
    <div className='flex flex-col items-start justify-center gap-1 px-2 mb-4'>
        <Label> {t(`${label}`)}{required && <span className='text-red-500'>*</span>}</Label>
      <input
        type='text'
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className='w-full px-3 py-1.5 text-gray-700'
        style={{
            border: '1px solid #748EA8',
            borderRadius: '2px',
        }}
      />
    </div>
  );
};

export default LabeledInput;
