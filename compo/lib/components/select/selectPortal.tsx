import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { ChevronDownIcon } from '../../icons/chevron-down';
import { MagnifyIcon } from '../../icons/magnify';
import { cn } from '../../utils';

type SelectPropsBase = {
  idPrefix?: string;
  className?: string;
  classNameOption?: string;
  classNameDropdown?: string;
  optionWidth?: number;
  placeholder?: string;
  initialOptions: SelectOption[];
  isOpenStatus?: (isOpen: boolean) => void;
};

export type SelectOption = {
  label: string;
  value: string | number | null;
  icon?: React.ReactNode;
};

type MultipleSelectProps = {
  multiple: true;
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
};

type SingleSelectProps = {
  multiple?: false;
  value?: SelectOption;
  onChange: (value: SelectOption | undefined) => void;
};

type SelectPropsWithServerSearch<T extends boolean> = SelectPropsBase & {
  serverSearch: T;
  handleOnSearch: T extends true ? (searchTerm: string) => void : (searchTerm?: string) => void;
};

type SelectPropsWithoutServerSearch = SelectPropsBase & {
  serverSearch?: false;
  handleOnSearch?: (searchTerm: string) => void;
};

type SelectProps = (SingleSelectProps | MultipleSelectProps) &
  (SelectPropsWithServerSearch<true> | SelectPropsWithServerSearch<false> | SelectPropsWithoutServerSearch>;

export const Select = ({
  idPrefix = '',
  className,
  classNameOption,
  classNameDropdown,
  optionWidth = 100,
  placeholder,
  multiple,
  value,
  onChange,
  initialOptions,
  serverSearch,
  handleOnSearch,
  isOpenStatus,
}: SelectProps) => {
  const searchInputId = `${idPrefix}-searchInput`;
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [options, setOptions] = useState(initialOptions);
  const [showToolTip, setShowToolTip] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number; width: number }>({
    top: 0,
    left: 0,
    width: 0,
  });

  useEffect(() => {
    setOptions(initialOptions);
  }, [initialOptions]);

  useEffect(() => {
    if (isOpen && containerRef.current) {
      const { top, left, height, width } = containerRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: top + height, // Position dropdown below the select input
        left,
        width,
      });
    }
  }, [isOpen]);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node) &&
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
      isOpenStatus && isOpenStatus(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside as unknown as EventListener);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside as unknown as EventListener);
    };
  }, []);

  function selectOption(option: SelectOption) {
    if (multiple) {
      const isSelected = value.includes(option);
      if (isSelected) {
        const newValue = value.filter((o) => o.value !== option.value);
        onChange(newValue);
      } else {
        onChange([...value, option]);
      }
    } else {
      if (!value || option.value !== value.value) {
        onChange(option);
        setIsOpen(false);
        isOpenStatus && isOpenStatus(false);
      }
    }
  }

  /**
   * Handle search input changes
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    if (serverSearch) {
      handleOnSearch?.(newSearchTerm);
    }
  }

  useEffect(() => {
    if (isOpen) {
      setSearchTerm('');
      document.getElementById(searchInputId)?.focus();
    }
  }, [isOpen]);

  const dropdown = (
    <div
      ref={dropdownRef}
      className={cn(
        `absolute z-50 max-h-96 overflow-y-auto rounded-md bg-white shadow-lg ${classNameDropdown}`,
        isOpen ? 'block' : 'hidden'
      )}
      style={{
        top: dropdownPosition.top,
        left: dropdownPosition.left,
        width: dropdownPosition.width,
      }}
    >
      <div
        className="flex flex-row items-center px-2 py-1"
        style={{
          borderBottom: '1px solid #E7E9F2',
        }}
        key={idPrefix}
      >
        <input
          id={searchInputId}
          type="text"
          value={searchTerm}
          placeholder="Search..."
          onChange={(e) => {
            e.stopPropagation();
            handleSearchChange(e);
          }}
          onClick={(e) => e.stopPropagation()}
          className="h-7 w-full px-1"
        />
        <MagnifyIcon className="h-4 w-4" />
      </div>
      <ul className="list-none">
        {options
          .filter((option) => serverSearch || option.label.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((option, index) => (
            <li
              key={option.value}
              onClick={(e) => {
                e.stopPropagation();
                selectOption(option);
              }}
              onMouseEnter={() => setHighlightedIndex(index)}
              className={`flex cursor-pointer px-3 py-1.5 ${
                index === highlightedIndex ? 'bg-blue-100' : ''
              }`}
              style={{ borderBottom: '1px solid #E7E9F2' }}
            >
              {option.icon && <div className="mr-2">{option.icon}</div>}
              {option.label}
            </li>
          ))}
      </ul>
    </div>
  );

  return (
    <div
      ref={containerRef}
      onClick={() => {
        setIsOpen((prev) => !prev);
        isOpenStatus && isOpenStatus(!isOpen);
      }}
      tabIndex={0}
      className={cn(
        'relative flex items-center gap-2 p-2 rounded-md outline-none',
        className
      )}
      style={{ border: '1px solid #5C7A99' }}
    >
      {/* Selected Items */}
      <div>{multiple ? 'Multiple selection logic here' : value?.label || placeholder}</div>
      {/* Chevron */}
      <ChevronDownIcon className={`transition-all ${isOpen ? 'rotate-180' : ''}`} />
      {/* Render Dropdown via Portal */}
      {isOpen && ReactDOM.createPortal(dropdown, document.body)}
    </div>
  );
};
