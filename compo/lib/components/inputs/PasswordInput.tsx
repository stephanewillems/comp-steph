import React, { useState } from 'react'
import EyeSlashIcon from '../../icons/eyeslash'
import EyeIcon from '../../icons/eyecontour'

interface PasswordInputProps {
    onChange: (value: string) => void
}

/* 
* Component for rendering password input
* @param onChange - function to handle input change
* @returns - returns password input
* @example
* <PasswordInput onChange={(value) => console.log(value)} />
*/

const PasswordInput = ({ onChange }: PasswordInputProps) => {
    const [typeInput, setTypeInput] = useState('password')
    const handleTypeChange = () => {
        if (typeInput === 'text') {
            setTypeInput('password')
        } else {
            setTypeInput('text')
        }
    }

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value)
    }
    return (
        <div className='relative w-full'>
            <input type={typeInput} className='pl-2 pr-10 truncate flex items-center text-[16px] w-full h-[32px]' style={{
                border: '1px solid #5C7A99',
                borderRadius: '4px',
            }} onChange={(e) => handleChangeInput(e)} />
            <span className='absolute right-3 top-1/4' onClick={handleTypeChange}>
                {
                    typeInput === 'text' ? <EyeSlashIcon /> : <EyeIcon />
                }

            </span>
        </div>
    )
}

export default PasswordInput
