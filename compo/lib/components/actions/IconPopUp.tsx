import React, { CSSProperties, ReactElement, ReactNode, cloneElement, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import useOutsideClick from '../../../hooks/useOutsideClick';
import { TriangleIcon } from '../../icons/triangle';

interface DotsProps {
    onClick?: () => void;
    children: ReactNode;
    icon: ReactNode;
    position?: 'top' | 'down' | 'left' | 'right';
}

/* 
* IconPopUp is a component that renders a pop-up menu when an icon is clicked.
* It takes the following props:
* - onClick: a function that is called when the icon is clicked
* - children: the content of the pop-up menu
* - icon: the icon that triggers the pop-up menu
* - position: the position of the pop-up menu relative to the icon (top, down, left, right)
* 
* The component uses the useRef and useState hooks to manage the state of the pop-up menu.
* It also uses the useOutsideClick hook to close the pop-up menu when a click occurs outside of it.
* The getPopUpStyle and getTriangleStyle functions calculate the position and style of the pop-up menu and the triangle icon.
* The component returns the icon and the pop-up menu, which are rendered using the createPortal function.
* 
* Example usage:
* 
* <IconPopUp
*    onClick={() => console.log('Icon clicked')}
*   icon={<Icon />}
*  position='down'
* >
*   <div>Pop-up content</div>
* </IconPopUp>
* 
*/

const MODAL_ROOT = document.getElementById('modal-root') || document.body;

const IconPopUp = ({ onClick, icon, children, position = 'down' }: DotsProps) => {
    const [open, setOpen] = useState(false);
    const iconRef = useRef<HTMLDivElement>(null);
    const popUpRef = useRef<HTMLDivElement>(null);

    const handlePopOpen = () => {
        onClick && onClick();
        setOpen(!open);
    };

    const handleOutsideClick = () => {
        setOpen(false);
    };

    useOutsideClick({
        refs: [iconRef, popUpRef],
        onOutsideClick: handleOutsideClick,
    });

    const getPopUpStyle = (): CSSProperties => {
        if (!iconRef.current) return {};
        const iconRect = iconRef.current.getBoundingClientRect();
        const styles: CSSProperties = {
            position: 'absolute',
            zIndex: 1000,
        };

        switch (position) {
            case 'top':
                styles.left = `${iconRect.left + window.scrollX}px`;
                styles.top = `${iconRect.top + window.scrollY - 10}px`;
                styles.transform = 'translateY(-100%)';
                break;
            case 'down':
                styles.left = `${iconRect.left + window.scrollX}px`;
                styles.top = `${iconRect.bottom + window.scrollY + 10}px`;
                break;
            case 'left':
                styles.left = `${iconRect.left + window.scrollX - 10}px`;
                styles.top = `${iconRect.top + window.scrollY - 20}px`;
                styles.transform = 'translateX(-100%)';
                break;
            case 'right':
                styles.left = `${iconRect.right + window.scrollX + 10}px`;
                styles.top = `${iconRect.top + window.scrollY - 20}px`;
                break;
        }
        return styles;
    };

    const getTriangleStyle = (): CSSProperties => {
        const styles: CSSProperties = {
            position: 'absolute',
        };

        switch (position) {
            case 'top':
                styles.left = '9px';
                styles.bottom = '-23px';
                styles.transform = 'translateX(-50%) rotate(180deg)';
                break;
            case 'down':
                styles.left = '10px';
                styles.top = '-23px';
                styles.transform = 'translateX(-50%)';
                break;
            case 'left':
                styles.top = '25px';
                styles.right = '-23px';
                styles.transform = 'translateY(-50%) rotate(90deg)';
                break;
            case 'right':
                styles.top = '25px';
                styles.left = '-23px';
                styles.transform = 'translateY(-50%) rotate(270deg)';
                break;
        }
        return styles;
    };

    return (
        <>
            <div ref={iconRef}>
                {
                    cloneElement(icon as ReactElement,
                        {
                            onClick: handlePopOpen,
                            className: `${(icon as ReactElement).props.className} cursor-pointer ${open ? 'fill-primary-hover' : 'fill-primary-light'}`
                        }
                    )
                }
            </div>
            {open && createPortal(
                <div ref={popUpRef} style={getPopUpStyle()} className='absolute'>
                    <div className='relative'>
                        <div className='bg-white p-2.5 rounded-[2px] shadow-lg z-50'>
                            {children}
                        </div>
                        <TriangleIcon style={getTriangleStyle()} className=' absolute  fill-white h-12 w-12 z-40' />
                    </div>
                </div>,
                MODAL_ROOT
            )}
        </>
    );
};

export default IconPopUp;
