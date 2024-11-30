import React from 'react';
import { cn } from '../utils';

interface SwitchWithLabelProps {
  label: string;
  isChecked: boolean;
  onChange: (isChecked: boolean) => void;
  className?: string;
  disabled?: boolean;
}

/**
 * Switch button with label
 * @param {SwitchWithLabelProps} props
 * @param {string} props.label
 * @param {boolean} props.isChecked
 * @param {(isChecked: boolean) => void} props.onChange
 * @return {JSX.Element}
 * @author Stéphane
 */

const SwitchWithLabel = ({ label, isChecked, onChange, className, disabled = false }: SwitchWithLabelProps) => {
  const handleSwitchChange = () => {
    if (!disabled) {
      onChange(!isChecked);
    }
  };

  return (
    <div className={cn('flex items-center space-x-2 hover:cursor-pointer', className)} onClick={handleSwitchChange}>
      <button
        type="button"
        className={`relative inline-flex h-4 w-7 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-300 transition-colors duration-200 ease-in-out disabled:cursor-not-allowed disabled:bg-gray-200 ${
          isChecked ? 'bg-primary' : ''
        }`}
        role="switch"
        aria-checked={isChecked}
        disabled={disabled}
      >
        <span className="sr-only">{label}</span>
        <span
          aria-hidden="true"
          className={`pointer-events-none inline-block h-3 w-3 translate-y-[1.5px] transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            isChecked ? 'translate-x-3.5' : 'translate-x-0.5'
          }`}
        ></span>
      </button>
      <span className="text-dark">{label}</span>
    </div>
  );
};

export default SwitchWithLabel;
