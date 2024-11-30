import React from 'react'
import { cn } from '../../utils'
import { useTranslation } from 'react-i18next'


interface ButtonSmallProps {
    label: string
    icon: JSX.Element
    onClick: () => void
    }

const ButtonSmall = ({icon,label,onClick}:ButtonSmallProps) => {

    const {t} = useTranslation()
    const handleClick = () => {
        onClick()
    }
    
  return (
    <div className="flex flex-col items-center justify-center gap-2">
            <div
                className={cn(
                    'h-8 w-8 rounded-sm flex items-center justify-center shadow-xs hover:cursor-pointer bg-background-light fill-primary hover:bg-background-light-hover'
                )}
                onClick={handleClick}
            >
               {React.cloneElement(icon,/*  { className: 'w-8 h-8' } */)}
            </div>

            <div className="font-inter text-[9px] font-bold uppercase text-light">{t(`${label}`)}</div>
        </div>
  )
}

export default ButtonSmall
