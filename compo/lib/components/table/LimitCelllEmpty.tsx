import React, { useState } from 'react'
import { Marker } from '../../../components/map/marker/Marker.objects';
import ModalConfirm from '../ModalConfirm';
import { WarningTriangleIcon } from '../../icons/warning-triangle';
import { useAppSelector } from '../../../app/hooks';
import { selectReportConfiguration } from '../../../components/general/caseSlice';
import { useTranslation } from 'react-i18next';

interface CellProps {
    width?: string;
    maxWidth?: string;
    className?: string;
    pill?: boolean;
    value: string | Marker;
    status?: "error" | "warning" | "success" | "info";
}


const LimitCell = ({ width = "200px", maxWidth = "200px", className, pill = false, value, status }: CellProps) => {
    const { t } = useTranslation();
    const [popOver, setPopOver] = useState(false);
    const limitMarkers = useAppSelector(selectReportConfiguration).markerLimit
    const style = {
        border: '1px solid #BAC3D4'
    }

    if (value === "") {
        style.border = 'none'
    }

    return (
        <div className='flex flex-row justify-between w-full' >
            {
                pill ?
                    <div className={`font-medium truncate text-[13px] font-fira text-lightBlack px-3 w-max ml-3  ${className}`}
                        style={{ ...style }}
                    >
                        <div className='flex flex-row gap-3'>
                            <span> {value as React.ReactNode} / {limitMarkers} </span>
                            {status === 'error' ? <WarningTriangleIcon onClick={() => { setPopOver(true) }} className='fill-[#FF0008] hover:cursor-pointer' /> : ''}
                        </div>
                    </div>
                    :
                    <div
                        className={`font-medium truncate text-[13px] font-inter text-lightBlack px-3  ${className}`}
                        style={{ width: width, maxWidth: maxWidth }}
                    >
                        <div className='flex flex-row gap-3'>
                            <span> {value as React.ReactNode} / {limitMarkers} </span>
                            {status === 'error' ? <WarningTriangleIcon onClick={() => { setPopOver(true) }} className='fill-[#FF0008] hover:cursor-pointer' /> : ''}
                        </div>
                    </div>
            }

            {
                popOver &&

                <ModalConfirm
                    titleModal='Maximum 100 Markers!'
                    onClose={() => setPopOver(false)}
                    isOpen={popOver}
                    buttonsTextCancel={null}
                    onConfirm={() => setPopOver(false)}
                    buttonsVariantConfirm={'delete'}
                    buttonsVariantCancel={'secondary'}
                    typeModal='delete'
                    buttonsTextConfirm={t('multiMap.sluiten')}
                >
                    <p>{t('lib.tableCell1')}</p>
                    <p>{t('lib.limitCell1')}</p>
                </ModalConfirm>
            }

        </div>
    );
}

export default LimitCell