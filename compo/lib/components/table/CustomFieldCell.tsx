import React  from 'react';
import { CustomFieldType } from '../../../components/map/marker/Marker.objects';

interface CustomFieldProps {
  width?: string;
  maxWidth?: string;
  className?: string;
  value: CustomFieldType | undefined;
}

const CustomFieldCell = ({
  width = 'max-content',
  maxWidth = 'max-content',
  className,
  value
}: CustomFieldProps) => {
  const style = {
    border: '1px solid #BAC3D4',
  };

  if (value === undefined) {
    style.border = 'none';
  }

  return (
    <div className="flex flex-row justify-between w-full">
        <div
          className={`truncate px-3 font-inter text-[13px] font-medium text-lightBlack  ${className}`}
          style={{ width: width, maxWidth: maxWidth }}
        >
          <div className="flex flex-row gap-3">
            {
              value?.value !== undefined && value.value !== "" ?
               <>
               <div className='flex items-center gap-2'>
                    <div className='py-[1.5px] px-[6px] rounded-[2px] line leading-4 ' style={{ backgroundColor: value.color
                    , border: `1px solid ${value.color === '#ffffff' ? '#A2B7CC' : value.color}`
                     }}>
                        <p className='text-[12px] font-fira font-medium'>{value.label}</p>
                    </div>
                    <p className='text-[12px] font-fira font-medium'>{value.value}</p>
                </div>
               </>
               :
               <div>{" "}</div>
            }
          </div>  
        </div>
      
    </div>
  );
};

export default CustomFieldCell;
