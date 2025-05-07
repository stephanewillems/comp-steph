import { useEffect, useRef, useState } from 'react';
import { faChevronDown, faChevronUp, faTag, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * Represents an individual selectable option.
 */
export interface Option {
  key: string;
  label: string;
}

/**
 * Props for the DropdownCheckboxSelect component.
 *
 * @example
 * ```tsx
 * import { DropdownCheckboxSelect, Option } from './DropdownCheckboxSelect';
 * import { useState } from 'react';
 * import { faTag } from '@fortawesome/free-solid-svg-icons';
 *
 * const categories: Option[] = [
 *   { key: 'web', label: 'Web Development' },
 *   { key: 'design', label: 'Design' },
 *   { key: 'marketing', label: 'Marketing' },
 *   { key: 'data', label: 'Data Science' },
 *   { key: 'ai', label: 'AI' },
 * ];
 *
 * export default function Example() {
 *   const [selected, setSelected] = useState<string[]>([]);
 *
 *   return (
 *     <DropdownCheckboxSelect
 *       options={categories}
 *       selected={selected}
 *       onChange={setSelected}
 *       placeholder="Select categories"
 *       multiple
 *       icon={faTag}
 *       maxVisibleChips={3}
 *     />
 *   );
 * }
 * ```
 */
interface DropdownCheckboxSelectProps {
  options: Option[];
  selected: string[];
  onChange: (selected: string[]) => void;
  /** Whether multiple values can be selected */
  multiple?: boolean;
  /** Placeholder to show when nothing is selected */
  placeholder?: string;
  /** Optional icon to show at the beginning of the input */
  icon?: typeof faTag;
  /** Number of chips to display before collapsing into a `+N` chip */
  maxVisibleChips?: number;
}

export const DropdownCheckboxSelect: React.FC<DropdownCheckboxSelectProps> = ({
  options,
  selected,
  onChange,
  multiple = true,
  placeholder = 'Select...',
  icon = faTag,
  maxVisibleChips = 3,
}) => {
  const [open, setOpen] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const toggleSelect = (key: string) => {
    if (multiple) {
      onChange(
        selected.includes(key)
          ? selected.filter(k => k !== key)
          : [...selected, key]
      );
    } else {
      onChange([key]);
      setOpen(false);
    }
  };

  const handleChipRemove = (key: string) => {
    const updated = selected.filter(k => k !== key);
    onChange(updated);
    if (updated.length <= maxVisibleChips) {
      setShowPopover(false);
    }
  };

  const selectedOptions = options.filter(o => selected.includes(o.key));
  const overflowCount = selectedOptions.length > maxVisibleChips ? selectedOptions.length - maxVisibleChips : 0;
  const visibleChips = selectedOptions.slice(0, maxVisibleChips);
  const hiddenChips = selectedOptions.slice(maxVisibleChips);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        !containerRef.current?.contains(e.target as Node) &&
        !popoverRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
        setShowPopover(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={containerRef}>
      <div
        className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md bg-white cursor-pointer min-h-[42px] min-w-[300px] max-w-[300px]"
        onClick={() => setOpen(prev => !prev)}
      >
        <FontAwesomeIcon icon={icon} className="text-gray-500" />
        <div className="flex flex-wrap gap-1 items-center flex-grow relative">
          {selectedOptions.length === 0 && (
            <span className="text-gray-400 text-sm">{placeholder}</span>
          )}
          {!multiple && selectedOptions[0] && (
            <span className="text-sm text-gray-800">{selectedOptions[0].label}</span>
          )}
          <AnimatePresence initial={false}>
            {multiple &&
              visibleChips.map(opt => (
                <motion.span
                  key={opt.key}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full flex items-center max-w-[160px] truncate"
                >
                  {opt.label}
                  <FontAwesomeIcon
                    icon={faTimes}
                    className="ml-1 text-gray-500 hover:text-red-600 cursor-pointer"
                    onClick={e => {
                      e.stopPropagation();
                      handleChipRemove(opt.key);
                    }}
                  />
                </motion.span>
              ))}
          </AnimatePresence>
          {multiple && overflowCount > 0 && (
            <span
              className="bg-gray-300 text-gray-700 text-xs px-2 py-1 rounded-full cursor-pointer"
              onClick={e => {
                e.stopPropagation();
                setShowPopover(prev => !prev);
              }}
            >
              +{overflowCount}
            </span>
          )}

          {showPopover && hiddenChips.length > 0 && (
            <div
              ref={popoverRef}
              className="absolute top-full left-0 mt-2 z-50 bg-white border border-gray-300 rounded shadow-md p-2 w-60 flex flex-wrap gap-1"
            >
              <AnimatePresence initial={false}>
                {hiddenChips.map(opt => (
                  <motion.span
                    key={opt.key}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full flex items-center max-w-[100px] truncate"
                  >
                    {opt.label}
                    <FontAwesomeIcon
                      icon={faTimes}
                      className="ml-1 text-gray-500 hover:text-red-600 cursor-pointer"
                      onClick={e => {
                        e.stopPropagation();
                        handleChipRemove(opt.key);
                      }}
                    />
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
        <FontAwesomeIcon icon={open ? faChevronUp : faChevronDown} className="text-gray-400" />
      </div>

      {open && (
        <ul className="absolute z-10 bg-white border border-gray-300 rounded-md mt-1 w-full shadow max-h-60 overflow-y-auto">
          {options.map(opt => {
            const isChecked = selected.includes(opt.key);
            return (
              <li
                key={opt.key}
                className={`flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                  isChecked ? 'bg-yellow-100 text-yellow-800 font-semibold' : ''
                }`}
                onClick={() => toggleSelect(opt.key)}
              >
                <div
                  className={`w-4 h-4 border rounded-sm flex items-center justify-center ${
                    isChecked ? 'bg-yellow-500 text-white' : 'border-gray-400'
                  }`}
                >
                  {isChecked && <span className="text-xs">✔</span>}
                </div>
                <span>{opt.label}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};