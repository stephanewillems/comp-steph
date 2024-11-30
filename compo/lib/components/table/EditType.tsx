import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { putMarkerByCollabId, upsertMarker } from '../../../components/map/marker/markerSlice';
import { Marker, MarkerType, allMarkerTypes } from '../../../components/map/marker/Marker.objects';
import { colorPerMarkerType, iconPerMarkerType, markerOrderPerGroup } from '../../../components/map/marker/MarkerConfig';
import { updateMarkerinAllMultiMaps } from '../../../components/map/mapSlice';
import LockIcon from '../../icons/lock';
import { selectCaseId } from '../../../components/general/caseSlice';
import { selectUserPnumber } from '../../../components/general/userSlice';
import Portal from '../portalComp';
import { useTranslation } from 'react-i18next';

import moment from 'moment';

interface CellProps {
    width?: string;
    maxWidth?: string;
    value: string | Marker;
    id: string;
    row: Marker;
}

const isValidMarkerType = (value: any): value is MarkerType => {
    return allMarkerTypes.includes(value);
}

const EditType = ({ value, id, row }: CellProps) => {

    // check if value is of type MarkerType , if not return info
    if (!isValidMarkerType(value)) {
        value = 'info';
    }

    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const [edit, setEdit] = useState({
        open: false,
        id: '',
    });
    const collaborationId = useAppSelector(selectCaseId);
    const pNumber = useAppSelector(selectUserPnumber);
    const iconRef = useRef<HTMLDivElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);
    const [popoverPos, setPopoverPos] = useState({ top: 0, left: 0 });
    const [isVisible, setIsVisible] = useState(false);

    // Function to handle click outside
    const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node; // Type assertion, assuming event.target is always a Node
        if (
            iconRef.current &&
            !iconRef.current.contains(target) &&
            popoverRef.current &&
            !popoverRef.current.contains(target)
        ) {
            // Clicked outside of both iconRef and popoverRef
            setEdit({ open: false, id: '' });
        }
    };

    const handleEdit = () => {
        if (value === 'pv' || value === 'anpr') return;
        setEdit({ open: !edit.open, id: edit.id === id ? '' : id });
        setIsVisible(false);
    };

    const handleSubmit = (markerType: string) => {
        const marker: Marker = {
            ...row,
            markerType: markerType as MarkerType,
        };
        dispatch(
            upsertMarker({
                markerId: id,
                marker: {
                    ...marker,
                    updatedAt: moment().toISOString(),
                },
            })
        );

        dispatch(updateMarkerinAllMultiMaps({
            marker: {
                ...marker,
                updatedAt: moment().toISOString(),
            }
        }));
        dispatch(putMarkerByCollabId({ marker, collaborationId, pNumber }));
        setEdit({
            open: false,
            id: '',
        });
    };

    const fieldI18n: { [key: string]: string } = {
        generic: t('marker.generic'),
        markerType: t('marker.type'),
        sources: t('marker.sources'),
        specific: t('marker.specific')
    };

    useEffect(() => {
        if (edit.open && iconRef.current && popoverRef.current) {
            const iconPos = iconRef.current.getBoundingClientRect();
            let top = iconPos.top + window.scrollY + iconPos.height;
            const left = iconPos.left + window.scrollX;

            const popoverHeight = popoverRef.current.offsetHeight;
            if (top + popoverHeight > window.innerHeight) {
                top -= popoverHeight + iconPos.height;
            }

            setPopoverPos({ top, left });

            // Use a timeout to allow the popover to be positioned before making it visible
            setTimeout(() => {
                setIsVisible(true);
            }, 0);
        }
    }, [edit.open, id]);

    useEffect(() => {
        if (edit.open) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [edit.open]);

    const notAvail = value === 'pv' || value === 'anpr' ? 'pointer-events-none' : 'cursor-pointer';


    return (
        <>
            <div
                ref={iconRef}
                className={`flex flex-row-reverse items-center justify-center  ${notAvail}`}
                onClick={handleEdit}
            >
                <span
                    style={{ fill: `${colorPerMarkerType[value as keyof typeof colorPerMarkerType]}`, width: '18px' }}
                    className=""
                >
                    {React.createElement(iconPerMarkerType[value as keyof typeof iconPerMarkerType])}
                </span>
                {value === 'pv' || value === 'anpr' ? (
                    <LockIcon className="ml-[-16px] h-4 w-4 fill-primary-light pt-[1px]" />
                ) : (
                    ''
                )}
            </div>

            {edit.open === true && edit.id === id && (
                <Portal>
                    <div
                        className="absolute z-50 flex items-center justify-center"
                        style={{
                            top: `${popoverPos.top}px`,
                            left: `${popoverPos.left}px`,
                            visibility: isVisible ? 'visible' : 'hidden',
                        }}
                        ref={popoverRef}
                    >
                        <div className="bg-white rounded-lg shadow-lg p-7">
                            {
                                Object.entries(markerOrderPerGroup).map(([group, markers], i) => (
                                    <div key={i}>
                                        {/* Marker group title unless specific2 */}
                                        {group !== 'specific2' && (
                                            <div className="space-y-5 text-[12px] font-semibold text-gray-700">{fieldI18n[group]}</div>
                                        )}

                                        {/* Markers from this group */}
                                        <div className="grid grid-cols-4 gap-4 mb-4">
                                            {markers
                                                .filter((marker) => marker !== 'pv')
                                                .filter((marker) => marker !== 'anpr')
                                                .map((marker, j) => (
                                                    <div
                                                        key={`${i}-${j}`}
                                                        className="p-2 rounded-md hover:bg-background-light-hover"
                                                        style={{ border: '1px solid #d3d8e0' }}
                                                    >
                                                        <div
                                                            className={`flex h-5 w-5 cursor-pointer items-center justify-center rounded-full`}
                                                            style={{ fill: colorPerMarkerType[marker] }}
                                                            onClick={() => {
                                                                handleSubmit(marker);
                                                            }}
                                                        >
                                                            {React.createElement(iconPerMarkerType[marker])}
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </Portal>
            )}
        </>
    );
};

export default EditType;