import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import { ChevronDownIcon } from '../../icons/chevron-down';
import { MagnifyIcon } from '../../icons/magnify';
import { cn } from '../../utils';

/*
 * Component for rendering select input
 * @param idPrefix - prefix for the id of the select component
 * @param className - overwrite general component styling
 * @param classNameOption - overwrite selected options styling
 * @param classNameDropdown - overwrite dropdown styling
 * @param optionWidth - virtual width that is reserved for selected options (boxes)
 * @param placeholder - if no value is selected yet
 * @param multiple - if multiple selections are allowed
 * @param value - selected value
 * @param onChange - function to handle value change
 * @param initialOptions - initial options
 * @param serverSearch - if server search is enabled
 * @param handleOnSearch - function to handle search
 * @param isOpenStatus - function to handle open status
 * @returns - returns select input
 * @example
 * <Select idPrefix='select' className='w-64' classNameOption='bg-blue-100' classNameDropdown='bg-blue-100' optionWidth={100} placeholder='Selecteer' multiple={false} value={value} onChange={(value) => console.log(value)} initialOptions={[{ label: 'Option 1', value: 'option1' }, { label: 'Option 2', value: 'option2' }]} serverSearch={false} handleOnSearch={(searchTerm) => console.log(searchTerm)} isOpenStatus={(isOpen) => console.log(isOpen)} />
 * <Select idPrefix='select' className='w-64' classNameOption='bg-blue-100' classNameDropdown='bg-blue-100' optionWidth={100} placeholder='Selecteer' multiple={true} value={value} onChange={(value) => console.log(value)} initialOptions={[{ label: 'Option 1', value: 'option1' }, { label: 'Option 2', value: 'option2' }]} serverSearch={true} handleOnSearch={(searchTerm) => console.log(searchTerm)} isOpenStatus={(isOpen) => console.log(isOpen)} />
 */

type SelectPropsBase = {
  idPrefix?: string; // Prefix for the id of the select component
  className?: string; // Overwrite general component styling
  classNameOption?: string; // Overwrite selected options styling
  classNameDropdown?: string; // Overwrite dropdown styling
  optionWidth?: number; // virtual width that is reserved for selected options (boxes)
  placeholder?: string; // If no value is selected yet
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
  (SelectPropsWithServerSearch<true> | SelectPropsWithServerSearch<false> | SelectPropsWithoutServerSearch);

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
  const [options, setOptions] = useState(initialOptions);
  const [showToolTip, setShowToolTip] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setOptions(initialOptions);
  }, [initialOptions]);

  /**
   * showToolTipHandler
   * @param {MouseEvent<HTMLButtonElement>} e
   */
  function showToolTipHandler(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setShowToolTip(!showToolTip);
  }

  /**
   * @param {SelectOption} option
   * Select the option
   */
  function selectOption(option: SelectOption) {
    if (multiple) {
      const isSelected = value.includes(option);
      if (isSelected) {
        const newValue = value.filter((o) => o.value !== option.value);
        onChange(newValue);

        const newOptions = [...options, option].sort((a, b) => a.label.localeCompare(b.label));
        setOptions(newOptions);
      } else {
        // Multiple selections
        const newValue = [...value, option];
        onChange(newValue);

        const newOptions = options.filter((o) => o.value !== option.value);
        setOptions(newOptions);
      }
    } else {
      // Single selection
      if (!value || option.value !== value.value) {
        onChange(option);
        /*   console.log(option); */
        setIsOpen(false);
        isOpenStatus && isOpenStatus(false);
      }
    }
  }

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0);
  }, [isOpen]);

  const selectedItemsRef = useRef<HTMLDivElement>(null);
  const [itemsThatCanFit, setItemsThatCanFit] = useState(0);

  useEffect(() => {
    if (selectedItemsRef.current && value) {
      const containerWidth = selectedItemsRef.current.offsetWidth;
      const itemsThatCanFit = Math.floor(containerWidth / optionWidth);
      setItemsThatCanFit(itemsThatCanFit);
    }
  }, [value]);

  /**
   * handleInputFocus
   * @param {React.FocusEvent<HTMLInputElement>} e
   */
  function handleInputFocus(e: React.FocusEvent<HTMLInputElement>) {
    e.stopPropagation();
  }

  // Autofocus on search input if dropdown opens
  useEffect(() => {
    if (isOpen) document.getElementById(searchInputId)?.focus();
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false); // Close the popover if click is outside the component
        isOpenStatus && isOpenStatus(false);
      }
    };

    // Listen for any click in the document
    document.addEventListener('mousedown', handleClickOutside as unknown as EventListener);

    return () => {
      // Clean up the listener to avoid memory leaks
      document.removeEventListener('mousedown', handleClickOutside as unknown as EventListener);
    };
  }, []);

  /**
   * Handle search input changes
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    if (serverSearch) {
      handleOnSearch?.(newSearchTerm); // Call the parent's onSearch method if serverSearch is true
    }
  }

  useEffect(() => {
    if (isOpen === false) {
      setSearchTerm('');
    }
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      /* onBlur={() => setIsOpen(false)} */
      onClick={() => {
        setIsOpen((prev) => !prev);
        isOpenStatus && isOpenStatus(!isOpen);
      }}
      tabIndex={0}
      className={cn(
        'min-h-8 relative flex h-[32px] cursor-pointer items-center gap-2 rounded-[2px] p-2 outline-none transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50',
        className
      )}
      style={{ border: '1px solid #5C7A99' }}
    >
      {/* Start blue bar */}
      <div
        className={`absolute -bottom-[1px] left-0 h-[1.5px] rounded-md bg-primary  bg-clip-padding transition-all duration-150 ${
          isOpen ? 'w-full text-clip' : 'w-0'
        }`}
      ></div>
      {/* Div with chevron */}
      <div className="flex flex-1 items-center gap-2 whitespace-nowrap" ref={selectedItemsRef}>
        {/* Placeholder if nothing is selected yet */}
        {((multiple && value.length === 0) || (!multiple && value?.value === undefined)) && placeholder}

        {multiple ? (
          value.slice(0, itemsThatCanFit).map((v) => (
            <button
              key={v.value}
              onClick={(e) => {
                e.stopPropagation();
                selectOption(v);
              }}
              className={cn(
                'flex items-center gap-1 rounded-sm p-1 text-sm text-black transition-all duration-150 ease-in-out',
                classNameOption
              )}
              style={{ border: '1px solid #d1d5db' }}
            >
              {/* Use title to show as tooltip on hover */}
              <span className="flex max-w-[80px] flex-row items-center gap-1 truncate" title={v.label}>
                {v?.icon}
                {v.label}
              </span>

              <span className="hover:text-red-500">&times;</span>
            </button>
          ))
        ) : (
          <span className="flex max-w-[320px] flex-row items-center gap-3 truncate text-inherit" title={value?.label}>
            {value?.icon} {value?.label}
          </span>
        )}
        {/* Labels in div with chevron */}
        {multiple && value.length > itemsThatCanFit && (
          <div className="rounded-sm p-1 text-sm text-black">
            <button
              onClick={(e) => {
                e.stopPropagation();
                showToolTipHandler(e);
              }}
            >
              {' '}
              + {value.length - itemsThatCanFit}
            </button>
            {/* Tooltip extra */}
            {showToolTip && (
              <div className="absolute right-0 z-50 mt-2 flex max-h-60 w-40 flex-col gap-3 overflow-auto rounded border bg-white p-2 shadow-lg">
                {value.slice(itemsThatCanFit).map((v) => (
                  <button
                    key={v.value}
                    onClick={(e) => {
                      e.stopPropagation();
                      selectOption(v);
                    }}
                    className={cn(
                      'flex items-center justify-between gap-1 rounded-sm p-1 text-sm text-black transition-all duration-150 ease-in-out',
                      classNameOption
                    )}
                    style={{ border: '1px solid #d1d5db' }}
                  >
                    {/* Use title to show as tooltip on hover */}
                    <span className="max-w-[80px] truncate" title={v.label}>
                      {v.label}
                    </span>

                    <span className="hover:text-red-500">&times;</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <ChevronDownIcon className={`fill-arrowGrey ${isOpen ? 'rotate-180 ' : ''}transition-all duration-150`} />
      {/* Dropdown list items + Search */}
      <div
        className={`absolute left-0 top-[calc(100%+2px)] ${classNameDropdown} z-40 m-0 max-h-96 overflow-y-auto rounded-md bg-white p-0 drop-shadow-lg  ${
          isOpen ? 'block' : 'hidden'
        }`}
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
            placeholder="Zoeken..."
            onChange={(e) => {
              e.stopPropagation();
              handleSearchChange(e);
            }}
            onClick={(e) => e.stopPropagation()}
            onFocus={handleInputFocus}
            className="h-7 w-full flex-1 px-1 "
          />
          <MagnifyIcon className="h-4 w-4" />
        </div>

        <ul className={` block list-none `}>
          {options
            .filter((option) => serverSearch || option.label.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((option, index) => (
              <li
                onClick={(e) => {
                  e.stopPropagation();
                  selectOption(option);
                }}
                onMouseEnter={() => setHighlightedIndex(index)}
                key={option.value}
                className={`flex cursor-pointer flex-row px-3 py-1.5 font-inter text-base ${
                  index === highlightedIndex ? 'bg-blue-100' : ''
                }`} // Improved highlight styling
                style={{
                  borderBottom: '1px solid #E7E9F2',
                }}
              >
                {option.icon && <div className="mr-2 flex items-center">{option.icon}</div>}
                {option.label}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
