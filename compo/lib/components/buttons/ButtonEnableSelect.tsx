import React, { useRef, useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import useOutsideClick from '../../../hooks/useOutsideClick';
import useElementPosition from '../../../hooks/useElementPosition';
import { cn } from '../../utils';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export type ButtonEnableSelectOption = {
  icon: JSX.Element;
  label: string;
  value: string;
};

type Props = {
  enabled: boolean; // state for enabled
  icon: JSX.Element; // icon for enable button
  options: ButtonEnableSelectOption[]; // options for in popover
  selection: string; // current selected option value
  textFooter?: string; // optional footer text to display below
  handleEnable: (value: boolean) => void; // function to handle change in enabled
  handleSelect: (value: string) => void; // function to handle change in selection
  popOverVisible?: boolean; // optional prop to force popover visibility
  disabled?: boolean; // optional prop to disable the button
  translationKey: string;
};

const portalRoot = document.getElementById('portal-root') || document.body;

/**
 * Button with options in a popover if enabled
 * @return {JSX.Element}
 * @author Jens && Stéphane
 */
function ButtonEnableSelect({
  enabled,
  icon,
  options,
  selection,
  textFooter,
  handleEnable,
  handleSelect,
  popOverVisible = true,
  disabled = false,
  translationKey,
}: Props): JSX.Element {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const secondaryButtonRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
  const selectedOption = options.find((x) => x.value === selection)?.icon;
  const selectedIcon = options.find((x) => x.label === selection)?.icon;
  
  /* Get position of secondary ref and calculate popover position (also on window resize) */
  const buttonPosition = useElementPosition(secondaryButtonRef);

  const updatePopoverPosition = useCallback(() => {
    if (secondaryButtonRef.current) {
      const rect = secondaryButtonRef.current.getBoundingClientRect();
      setPopoverPosition({
        top: rect.top + rect.height + 5,
        left: rect.left,
      });
    }
  }, []);

  useEffect(() => {
    updatePopoverPosition();
  }, [buttonPosition, isOpen, updatePopoverPosition]);

  /* Close popover if clicked outside of it */
  useOutsideClick({
    refs: [containerRef, popoverRef], // List of refs to detect clicks outside of
    onOutsideClick: () => setIsOpen(false),
  });

  return (
    <div ref={containerRef} className="flex flex-col items-center gap-2">
      <div className="flex rounded-[2px] shadow-xs hover:cursor-pointer">
        {/* Icon to enable or disable functionality */}
        <div
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded fill-primary hover:bg-gray-200',
            enabled && 'bg-primary fill-white hover:bg-primary-hover'
          )}
          onClick={() => {
            // Close popover and flip enabled
            setIsOpen(false);
            handleEnable(!enabled);
          }}
        >
          {icon}
        </div>

        {/* Current selection + option to change via popover */}
        <div className="relative">
          {/* Display icon of current selection */}
          <motion.div
            initial={false}
            animate={{
              width: enabled ? 30 : 0,
              opacity: enabled ? 1 : 0,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-r',
              enabled ? 'fill-primary hover:bg-gray-200' : 'fill-gray-400 hover:cursor-not-allowed'
            )}
            onClick={() => {
              if (disabled) return;
              if (enabled) setIsOpen(!isOpen);
            }}
            ref={secondaryButtonRef}
            title={t(`${translationKey}.${selection}`)}
          >
            {selectedOption ? selectedOption : selectedIcon}
          </motion.div>

          {/* Popover to change selection */}
          {enabled &&
            isOpen &&
            createPortal(
              <div
                ref={popoverRef}
                className={`absolute flex max-h-[100px] flex-col overflow-y-auto rounded-[2px] bg-white font-fira shadow-lg ${
                  popOverVisible ? 'block' : 'hidden'
                }`}
                style={{
                  top: `${popoverPosition.top -135}px`,
                  left: `${popoverPosition.left+5}px`,
                  zIndex: 9999,
                }}
              >
                {/* Loop over options */}
                {options.map((x, i) => (
                  <div
                    key={i}
                    className={cn(
                      'rounded p-2 hover:cursor-pointer hover:bg-gray-100',
                      selection === x.value && 'bg-gray-100'
                    )}
                    onClick={() => {
                      // Close popover and change selection
                      setIsOpen(false);
                      handleSelect(x.value);
                    }}
                  >
                    {t(`${translationKey}.${x.label}`)}
                  </div>
                ))}
              </div>,
              portalRoot
            )}
        </div>
      </div>

      {/* Show footer text if any */}
      {textFooter && <div className="text-[9px] font-bold uppercase text-light">{textFooter}</div>}
    </div>
  );
}

export { ButtonEnableSelect };