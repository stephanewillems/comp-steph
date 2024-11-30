import React, { useEffect, useState } from 'react'
import { cn } from '../../utils'
import { SelectOption } from '../select/Select'
import Label from '../text/Label'
import { useTranslation } from 'react-i18next'
import { ChevronDownIcon } from '../../icons/chevron-down'

interface InputSelectProps {
  className?: string;
  options: SelectOption[];
  label?:string;
  type: "text" | "number";
  onChange: (value: SelectOption, selected:string) => void;
}

const InputSelect = ({ className, options,label,type,onChange}: InputSelectProps) => {
    const {t} = useTranslation();
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<SelectOption | undefined>(options[0])
  const [inputValue, setInputValue] = useState('')

  const handleOptionClick = (option: SelectOption) => {
    setSelectedOption(option)
    setIsOpen(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)

  }

  useEffect(() => {
    if (selectedOption) {
      onChange({ label: inputValue, value: inputValue }, selectedOption.value as string);
    }
  }, [inputValue, selectedOption, onChange])

  return (
    <div className={`relative flex flex-col gap-1 py-1 w-full ${className}`}>
        
        {
            label && <Label>{t(`${label}`)}</Label>
        }
    <div  className={cn(
          'min-h-8 relative bg-white flex h-8 cursor-pointer items-center gap-2 rounded-md outline-none transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full',
          className
        )}  style={{
            border: '1px solid #E4E9F2',
        }}>

      <div className='h-full'
        onClick={() => setIsOpen(!isOpen)}
        >
        <div className='w-max px-2  bg-[#E4E9F2] h-full rounded-l-md flex items-center'>
          <span className='font-medium text-blue-600'>{selectedOption ? selectedOption.label : ''}</span>
          <ChevronDownIcon className='w-5 h-4 ml-1 fill-primary' />
        </div>
      </div>
      {isOpen && (
          <div className='absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg top-[45px]'>
          {options.map((option) => (
              <div
              key={option.value}
              className='px-4 py-2 cursor-pointer hover:bg-gray-100'
              onClick={() => handleOptionClick(option)}
              >
              {option.label}
            </div>
          ))}
        </div>
      )}
      <input type={type} className={`w-3/4  ${type === "number" ?'pr-1 text-right':' pl-1 text-left'}`} onChange={handleInputChange} />
      </div>
    </div>
  )
}

export default InputSelect
