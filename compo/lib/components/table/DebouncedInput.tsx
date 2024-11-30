import React from 'react'
import { MagnifyIcon } from '../../icons/magnify'

// A debounced input react component
export const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) => {
  const [value, setValue] = React.useState(initialValue)

  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return (
    <div className='flex justify-start items-center'>
      <MagnifyIcon className='fill-primary h-4' />
      <input {...props} value={value} className='border-0 bg-transparent shadow-none ml-2 text-sm' onChange={e => setValue(e.target.value)} />
    </div>
    
  )
}