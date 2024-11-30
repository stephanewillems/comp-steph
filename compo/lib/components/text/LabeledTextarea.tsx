import React from 'react';
import Label from './Label';

interface LabeledTextAreaProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
}

const LabeledTextArea = ({ id, label, value, onChange, placeholder, required = false, rows=4 }:LabeledTextAreaProps) => {
  return (
    <div className='flex flex-col items-start justify-center gap-1 mb-4'>
      <Label> {label}{required && <span className='text-red-500'>*</span>}</Label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className='w-full px-3 py-2 text-gray-700 border rounded'
        rows={rows}
        style={{
            border: '1px solid #748EA8',
            borderRadius: '2px',
            
        }}
      ></textarea>
    </div>
  );
};

export default LabeledTextArea;
