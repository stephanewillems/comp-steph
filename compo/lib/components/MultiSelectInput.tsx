import React, { useState, useRef, useEffect } from 'react';

/**
 * Represents an individual selectable item.
 */
export interface MultiSelectOption {
  /** Unique identifier for the option */
  key: string;

  /** Text displayed in dropdown and chips */
  label: string;
}

/**
 * Props for the `MultiSelectDropdown` component.
 */
export interface MultiSelectDropdownProps {
  /**
   * All available options in the dropdown.
   */
  options: MultiSelectOption[];

  /**
   * An array of selected `key`s from the options.
   */
  selected: string[];

  /**
   * Callback when selection changes.
   */
  onChange: (selected: string[]) => void;

  /**
   * Input placeholder text.
   * @default "Search and select..."
   */
  placeholder?: string;

  /**
   * Additional className for outer container.
   */
  className?: string;
}

/**
 * `MultiSelectDropdown` is a chip-based multi-select input with fuzzy filtering and keyboard navigation.
 *
 * @component
 *
 * @example
 * ```tsx
 * import { useState } from 'react';
 * import { MultiSelectDropdown, MultiSelectOption } from './MultiSelectDropdown';
 *
 * const emailOptions: MultiSelectOption[] = [
 *   { key: 'admin@eroselite.com', label: 'admin@eroselite.com' },
 *   { key: 'support@platform.com', label: 'support@platform.com' },
 * ];
 *
 * export default function EmailPicker() {
 *   const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
 *
 *   return (
 *     <MultiSelectDropdown
 *       options={emailOptions}
 *       selected={selectedEmails}
 *       onChange={setSelectedEmails}
 *       placeholder="Type email..."
 *     />
 *   );
 * }
 * ```
 */
export const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  options,
  selected,
  onChange,
  placeholder = 'Search and select...',
  className = '',
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const unselectedOptions = options.filter(o => !selected.includes(o.key));
  const filteredOptions = inputValue
    ? unselectedOptions.filter(o =>
        o.label.toLowerCase().includes(inputValue.toLowerCase())
      )
    : unselectedOptions;

  const selectedOptions = options.filter(o => selected.includes(o.key));

  const handleSelect = (item: MultiSelectOption) => {
    const updated = [...selected, item.key];
    onChange(updated);
    setInputValue('');
    setIsOpen(false);
    setHighlightedIndex(0);
  };

  const handleRemove = (key: string) => {
    const updated = selected.filter(k => k !== key);
    onChange(updated);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev => (prev + 1) % filteredOptions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev =>
        prev === 0 ? filteredOptions.length - 1 : prev - 1
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const item = filteredOptions[highlightedIndex];
      if (item) handleSelect(item);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (!listRef.current) return;
    const el = listRef.current.children[highlightedIndex] as HTMLElement;
    if (el) el.scrollIntoView({ block: 'nearest' });
  }, [highlightedIndex]);

  return (
    <div className={`relative w-full ${className}`}>
      <div
        className='flex flex-wrap items-center gap-1 p-2 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500 bg-white min-h-[42px]'
        onClick={() => inputRef.current?.focus()}
      >
        {selectedOptions.map(item => (
          <span
            key={item.key}
            className='bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center gap-1'
          >
            {item.label}
            <button
              type='button'
              onClick={e => {
                e.stopPropagation();
                handleRemove(item.key);
              }}
              className='text-xs ml-1 hover:text-red-500'
            >
              &times;
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          className='flex-grow outline-none bg-transparent text-sm min-w-[80px] py-1'
          placeholder={placeholder}
          value={inputValue}
          onChange={e => {
            setInputValue(e.target.value);
            setIsOpen(true);
            setHighlightedIndex(0);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
        />
      </div>

      {isOpen && filteredOptions.length > 0 && (
        <ul
          ref={listRef}
          className='absolute z-50 bg-white border border-gray-200 mt-1 w-full rounded-md shadow-lg max-h-48 overflow-y-auto'
        >
          {filteredOptions.map((item, index) => (
            <li
              key={item.key}
              className={`px-4 py-2 cursor-pointer ${
                index === highlightedIndex ? 'bg-blue-100' : 'hover:bg-gray-100'
              }`}
              onMouseDown={() => handleSelect(item)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
