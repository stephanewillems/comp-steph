import React from 'react';

interface CellProps {
  width?: string;
  maxWidth?: string;
  className?: string;
  icon: JSX.Element;
}

const IconCell = ({
  width = 'max-content',
  maxWidth = 'max-content',
  className,
  icon,
}: CellProps) => {
  const style = {
    border: '1px solid #BAC3D4',
  };

  if (icon === null) {
    style.border = 'none';
  }

  return (
    <div className="flex flex-row justify-between w-full">
        <div
          className={`truncate px-3 font-inter text-[13px] font-medium text-lightBlack  ${className}`}
          style={{ width: width, maxWidth: maxWidth }}
        >
          <div className="flex flex-row gap-3">
            <span> {icon} </span>
          </div>
        </div>

    </div>
  );
};

export default IconCell;
