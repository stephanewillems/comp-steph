import React from 'react'
import LockIcon from '../icons/lock';

interface LockInputProps {
    label: string;
    value: string;
    }


const LockInput = ({label,value}:LockInputProps) => {
  return (
    <div className='flex flex-col items-start gap-1'>
            <label className='text-[12px] font-semibold text-primary-dark'>{label}</label>
            <span className='relative w-full'>
              <input type="text" value={value} className=' w-full rounded-md px-3 py-2 bg-background-medium text-[#9a9ea6] pointer-events-none' style={{
                border: '1px solid #B8BFCC',
              }} readOnly  />
              <LockIcon className='absolute w-4 h-4 top-2.5 right-3 fill-[#9a9ea6]' />
            </span>
          </div>
  )
}

export default LockInput