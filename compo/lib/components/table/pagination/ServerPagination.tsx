import React, { Fragment, useEffect, useRef, useState } from 'react';
import { ChevronLeftIcon } from '../../../icons/chevron-left';
import { AnimatePresence, motion } from 'framer-motion';

interface ServerPaginationProps {
  pageSize: number;
  setPageSize: (value: number) => void;
  steps: number[];
  totalAmount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const ServerPagination = ({
  setPageSize,
  steps,
  pageSize,
  currentPage,
  onPageChange,
  totalAmount,
}: ServerPaginationProps) => {
  const [openPopover, setOpenPopover] = useState(false);
  const totalPages = Math.ceil(totalAmount / pageSize);
  const [openInputField, setOpenInputField] = useState(false);
  const [labelPosition, setLabelPosition] = useState('0px');
  const popoverRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const range = () => {
    if (totalPages <= 3) {
      // If there are 3 or fewer total pages, show all directly.
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      if (currentPage === 1) {
        // If on the first page.
        return [1, 2, '...', totalPages];
      } else if (currentPage === totalPages) {
        // If on the last page.
        return [1, '...', totalPages - 1, totalPages];
      } else {
        let pages = [];
        if (currentPage === 2) {
          // Special case for the second page.
          pages = [1, 2, '...', totalPages];
        } else if (currentPage === totalPages - 1) {
          // Special case for the second-to-last page.
          pages = [1, '...', totalPages - 1, totalPages];
        } else {
          // General case for any page in the middle.
          pages = [1, '...', currentPage, '...', totalPages];
        }
        return pages;
      }
    }
  };


  useEffect(() => {
    if (openInputField) {
      inputRef.current?.focus();
    }
  }, [openInputField]);

  useEffect(() => {
    if (openPopover) {
      const position = getPositionForValueLabel();
      setLabelPosition(position);
    }
  }, [openPopover, pageSize]);

  const popoverVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  };

  const handleGoToPage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
    setOpenInputField(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setOpenPopover(false);
      }
    };

    if (openPopover) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openPopover]);

  const handlePopoverPageSize = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation();
    setOpenPopover(!openPopover);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const index = parseInt(e.target.value, 10);
    const newValue = steps[index];
    setPageSize(newValue);
  };

  const handleClickOnStep = (stepValue: number) => {
    setPageSize(stepValue);
  };

  const getPositionForValueLabel = () => {
    const index = steps.indexOf(pageSize);
    const slider = document.getElementById('range-slider');
    if (slider) {
      const sliderWidth = slider.offsetWidth;
      const handleWidth = 26;
      const usableWidth = sliderWidth - handleWidth;
      const position = (index / (steps.length - 1)) * usableWidth + handleWidth / 2;
      return `${position}`;
    }
    return '0px';
  };



  return (
    <div className="relative flex flex-row items-center justify-center gap-4">
      <div className="flex flex-row items-center justify-center text-md">
        <button
          className="p-1 border rounded"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeftIcon className={currentPage === 1 ? 'fill-secondary' : 'fill-darkGrey' } />
        </button>
        { range().length === 0 ? <span className='px-1 py-1 text-sm font-semibold rounded-sm font-inter bg-lightGrey text-darkGrey'>0</span> :
        range().map((page, index) => (
          <Fragment key={index}>
            {page === '...' ? (
              <span onClick={() => setOpenInputField(true)} className="px-2 py-1 cursor-pointer">
                ...
              </span>
            ) : (
              <button
                className={`rounded-sm px-1 py-1 font-inter text-sm font-semibold ${
                  page === currentPage ? 'bg-lightGrey text-primary' : 'text-darkGrey'
                }`}
                onClick={() => handleGoToPage(Number(page))}
              >
                {page ?? '0'}
              </button>
            )}
          </Fragment>
        ))
        }
        <button
          className="p-1 border rounded"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          <ChevronLeftIcon className={`rotate-180 ${currentPage === totalPages ? 'fill-secondary' : 'fill-darkGrey'}`} />
        </button>
        {openInputField && (
          <div
            className="absolute p-2 bg-white shadow-xl rounded-xs bottom-5"
            style={{
              border: '1px solid #E5E5E5',
            }}
          >
            <input
              ref={inputRef}
              type="number"
              className="w-10 active:outline-primary"
              onBlur={(e) => handleGoToPage(parseInt((e.target as HTMLInputElement).value))}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleGoToPage(parseInt((e.target as HTMLInputElement).value));
                }
              }}
            />
          </div>
        )}
      </div>
      <div className="flex flex-row items-center w-32 gap-1">
        <span
          className={`px-1 py-1 font-inter text-sm font-semibold transition-all  duration-150  hover:cursor-pointer hover:bg-primary/20 hover:text-primary ${
            openPopover ? 'bg-primary/20 text-primary' : 'bg-lightGrey text-darkGrey'
          }`}
          style={{
            borderRadius: '4px',
          }}
          onClick={(e) => handlePopoverPageSize(e)}
        >
          {pageSize}
        </span>
        <p className="text-sm font-inter">per pagina</p>
        <AnimatePresence>
          {openPopover && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={popoverVariants}
              transition={{ duration: 0.3 }}
              ref={popoverRef}
              className="absolute right-10 top-[-80px] w-[230px] rounded-sm bg-white px-4 pb-4 pt-10 shadow-xl"
              style={{
                border: '1px solid #E5E5E5',
              }}
            >
              {/* add styling for slider and ThumbSlider. No external FILE! */}
              <style>
                {`
              input[type="range"]::-webkit-slider-runnable-track {
                width: 100%;
                height: 6px;
                background: linear-gradient(90deg, #0073E6 ${labelPosition}px, #ddd ${labelPosition}px); 
              }

              input[type="range"]::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                height: 16px;
                width: 16px;
                border-radius: 50%;
                background: #0073E6;
                cursor: pointer;
                margin-top: -5px; // Adjust this to ensure the thumb is centered on the track
                transition: height 0.2s, width 0.2s, margin-top 0.2s; // Smooth transition for size change
              }
              
              `}
              </style>

              {/* END STYLING */}
              <input
                id="range-slider"
                type="range"
                className={`cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700
              
              `}
                min="0"
                max="4"
                value={steps.indexOf(pageSize)}
                onChange={handleChange}
                onMouseUp={(e) => setPageSize(steps[parseInt(e.currentTarget.value, 10)])}
                onTouchEnd={(e) => setPageSize(steps[parseInt(e.currentTarget.value, 10)])}
                step="1"
              />
              <div className="flex justify-between px-2 pt-1 text-xs">
                {steps.map((step) => (
                  <span key={step} onClick={() => handleClickOnStep(step)}>
                    <div className="h-[4px] w-[2px]  bg-primary" style={{ borderRadius: '4px' }} />
                  </span>
                ))}
              </div>
              <div className="absolute text-center" style={{ left: `${labelPosition}px`, top: '12px' }}>
                <div className="rounded-sm bg-primary/20 px-1 py-[1px] text-sm  font-bold text-primary">{pageSize}</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ServerPagination;
