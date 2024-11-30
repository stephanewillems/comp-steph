import React from 'react'
import { useTranslation } from 'react-i18next';



interface CellProps {
    children?: React.ReactNode;
    className?: string;
    borderLeft?: string;
    parentKey?: string;
    translationActive?: boolean;
}

const Header = ({ children, className, borderLeft, parentKey, translationActive = true }: CellProps) => {
    const { t } = useTranslation()
    return <p
        className={`text-sm font-bold text-left text-[#294766] w-max ${className} px-3`}
        style={{ borderLeft: borderLeft }}

    >   {translationActive ?
        parentKey === undefined ? t(`${children as string}`) : t(`${parentKey}.${children as string}`)
        : children as string
        }
    </p>;
}

export default Header