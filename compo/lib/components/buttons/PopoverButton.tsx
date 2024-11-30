
import React, { useState } from 'react';

type menuItem = {
    itemText: string;
    itemClassName?: string;
    fontClassName?: string;
    onClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void
    iconLink?: string;
    iconSize?: string;
}

type Props = {
    buttonClassName?: string;
    buttonText: string;
    menuPosition: string;
    menuClassName?: string;
    items: menuItem[];
};

/**
 * Popover Button
 * @return {JSX.Element}
 * @author Carlos 
 */
function PopoverButton({ buttonClassName, buttonText, menuPosition, menuClassName, items }: Props): JSX.Element {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const buttonIconUp = "/pv-icons/white_chevron_up.svg";
    const visible = isOpen ? "visible" : "hidden";

    // Default classes for button and menu
    /* const defaultButtonClass = "px-4 py-2 bg-[#00A1F2] text-white rounded font-inter font-medium leading-6 "; */
    /* const defaultMenuClass = "absolute w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10 popover-content"; */
    /* const defaultMenuItemClass = "block px-4 py-2 text-gray-800 hover:bg-gray-100"; */
    /* const defaultMenuItemFontClass = "font-inter font-medium text-black"; */
    /* const defaultMenuItemIconSize = "size-4"; */

    // Default position of the menu is top
    let position = " bottom-full mb-2 left-0";
    if (menuPosition === "bottom") {
        position = " mt-2";
    }


    const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
    }

    return (
        <div className="relative">
            <button key={crypto.randomUUID()} className={`flex items-center px-4 py-2 bg-[#00A1F2] text-white rounded font-inter font-medium leading-6 active:bg-red-500 ${buttonClassName}`}
                onClick={handleOnClick}
                >{buttonText}
                <img src={buttonIconUp} className={`ml-2 ${isOpen ? 'rotate-0' : 'rotate-180'}`} />
            </button>


            <div className={`absolute w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10 popover-content ${visible} ${menuClassName} ${position}`}>
                <div className="py-1">
                    {
                        items && items.map((item: menuItem, index: number) => (
                            <div key={index} className={`flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 ${item.itemClassName}`}>
                                {
                                    item.iconLink &&
                                    <img src={item.iconLink} className={`mr-2 size-4 ${item.iconSize}`} />
                                }
                                <a className={`font-inter font-medium text-black ${item.fontClassName}`} onClick={(e) => item.onClick(e)}>{item.itemText}</a>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default PopoverButton;
