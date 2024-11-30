import React from 'react';
import styles from './Slider.module.css';

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  showInput?: boolean;
  disabled?: boolean;
}

const Slider = ({ value, onChange, min = 0, max = 100, step = 5, disabled, showInput }: SliderProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseInt(e.target.value, 10));
  };

  return (
    <div className="flex items-center gap-2">
      {/* Range slider */}
      <input
        className={`${styles.inputRange} h-1 w-full appearance-none bg-gray-200 bg-transparent ${styles.sliderTrack} ${styles.sliderThumb}`}
        type="range"
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
      />

      {/* Optional to show slider as number */}
      {showInput && (
        <input
          className="w-14 rounded p-1 shadow-xs"
          type="number"
          value={value}
          onChange={handleChange}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
        />
      )}
    </div>
  );
};

export default Slider;
