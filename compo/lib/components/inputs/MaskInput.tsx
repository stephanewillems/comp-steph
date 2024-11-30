import React, { useState, useRef } from 'react';

interface MaskConfig {
  icon: JSX.Element;
  placeholder: string;
  mask: string;
}

interface MaskedInputProps {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maskConfigs: MaskConfig[];
}

const applyMask = (value: string, mask: string): string => {
  let maskedValue = '';
  let valueIndex = 0;
  for (let i = 0; i < mask.length; i++) {
    if (mask[i] === '_') {
      if (valueIndex < value.length) {
        maskedValue += value[valueIndex];
        valueIndex++;
      } else {
        maskedValue += '_';
      }
    } else {
      maskedValue += mask[i];
    }
  }
  return maskedValue.toLocaleUpperCase();
};

const MaskInput = ({ handleChange, value, maskConfigs }:MaskedInputProps) => {
  const [selectedConfigIndex, setSelectedConfigIndex] = useState(0);
  const [rawValue, setRawValue] = useState(value);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^a-zA-Z0-9]/g, ''); // Remove non-alphanumeric characters
    setRawValue(rawValue);
    const formattedValue = applyMask(rawValue, maskConfigs[selectedConfigIndex].mask);
    handleChange({ target: { value: formattedValue } } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleConfigChange = (index: number) => {
    setSelectedConfigIndex(index);
    setRawValue(''); // Reset the input when changing the configuration
    handleChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
    setDropdownVisible(false);
    hiddenInputRef.current?.focus();
  };

  const selectedConfig = maskConfigs[selectedConfigIndex];


  const handleDropdown = () => {
    if(maskConfigs.length > 1){
      setDropdownVisible(!dropdownVisible);
    } else {
      return;
    }
  }

  return (
    <div className='relative rounded focus-within:ring-1 focus-within:ring-blue-500'>
      <div className='relative flex flex-row items-center justify-start'>
        <input
          ref={hiddenInputRef}
          className='absolute opacity-0'
          onChange={handleInputChange}
          value={rawValue}
          autoFocus
        />
        <input
          className='bg-white text-[16px] w-full h-[32px] pl-12 pointer-events-auto'
          style={{ border: '1px solid #5C7A99', borderRadius: '4px' }}
          value={applyMask(rawValue, selectedConfig.mask)}
          placeholder={selectedConfig.placeholder}
          onClick={() => hiddenInputRef.current?.focus()}
          readOnly
        />
        <div
          className={`absolute left-0 ml-[1.8px] bg-[#E4E9F2] h-[90%] w-11 justify-center bg-clip-content flex items-center ${maskConfigs.length > 1 ? 'cursor-pointer' : ''}`}
          onClick={handleDropdown}
        >
          {React.cloneElement(selectedConfig.icon, { className: 'w-6' })}
        </div>
      </div>
      {dropdownVisible && (
        <div className='absolute left-0 z-10 mt-1 bg-white border border-gray-300 rounded shadow-lg top-full'>
          {maskConfigs.map((config, index) => (
            <div
              key={index}
              onClick={() => handleConfigChange(index)}
              className='flex items-center p-2 cursor-pointer'
            >
              {React.cloneElement(config.icon, { className: 'w-6 mr-2' })}
              <span>{config.placeholder}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MaskInput;
