import React from 'react'
import { useTranslation } from 'react-i18next';

interface ButtonIconProps {
    icon?: React.ReactNode;
    text: string;
    onClick: () => void;
    textClasses?: string;
    disabled?: boolean;
    shadow?: boolean;
}


/* 
* ButtonIcon component is used to create a button with an icon and text.
* @param icon: React.ReactNode - icon to be displayed on the button.
* @param text: string - text to be displayed on the button.
* @param onClick: () => void - function to be called when the button is clicked.
* @param disabled: boolean - if true, the button is disabled.
* @param textClasses: string - classes to be applied to the text.
* @param shadow: boolean - if true, a shadow is applied to the button.
* @returns React.ReactNode
* 
* Example usage:
* 
* <ButtonIcon icon={<TrashIcon className='fill-red-400' />} text={'ipa.bulkDelete'} onClick={handleBulkDelete} textClasses='text-red-400' shadow />
* 
* This will render a button with a trash icon and red text that says 'ipa.bulkDelete'.
* When the button is clicked, the handleBulkDelete function will be called.
* The button will be enabled.
* 
* Disabled button example:
* <ButtonIcon icon={<FilterCircleContourIcon className={`${disabled ? 'fill-grey-400 opacity-50':''}`} />}  text='Filter' onClick={handleFilter} disabled={disabled} shadow />
* 
* No Shadow button example:
* <ButtonIcon icon={<FilterIconSimple className={`${disabled ? 'fill-grey-400 opacity-50':'fill-primary'}`} />}  text='Filter' onClick={handleFilter} disabled={disabled} shadow
*/


const ButtonIcon = ({ icon, text, onClick, textClasses,disabled,shadow }: ButtonIconProps) => {
    const { t } = useTranslation();
    const disabledClasses = disabled ? 'cursor-not-allowed opacity-50' : 'hover:cursor-pointer hover:bg-background-light-hover';
    
    if(disabled === true){
        textClasses = 'text-gray-400'
    }else{
        textClasses = textClasses ? textClasses : 'text-primary'
    }

    const handleClick = () => {
        if (!disabled) {
            onClick();
        }
    }


    const shadowClass = shadow ? 'shadow-xs bg-[#F0F3F7]' : '';

    return (
        <> 
            <button
                className={`rounded-xs flex h-8 flex-row items-center justify-start gap-3 px-2 ${shadowClass}
         ${disabledClasses} `}
                onClick={handleClick}
            >
                {icon ? icon : null}

                <div>
                    <p className={`text-[14px] font-medium ${textClasses} whitespace-nowrap`}>{t(`${text}`)}</p>
                </div>
            </button>
        </>
    )
}

export default ButtonIcon
