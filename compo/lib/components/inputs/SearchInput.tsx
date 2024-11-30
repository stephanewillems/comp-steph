import React from 'react'
import { MagnifyIcon } from '../../icons/magnify'


interface SearchInputProps {
    onChange: (value: string) => void
    value: string
    id: string
    placeholder?: string
    }

const SearchInput = ({onChange,placeholder,id,value}:SearchInputProps) => {
  return (
    <div className='relative flex flex-row items-center w-full rounded-[2px]'>
       <input
        type='text'
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className='w-full pl-3 pr-7 h-[32px] text-gray-700 font-inter font-normal text-[13px]'
        style={{
            border: '1px solid #E3E7F0',
            borderRadius: '2px',
        }}
      />
      <div className='absolute right-2'>
      <MagnifyIcon className='w-4 h-4 fill-dark' />
      </div>
    </div>
  )
}

export default SearchInput
