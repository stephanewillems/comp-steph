import React, { useState } from 'react';
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
  value: string | number | Marker | JSX.Element;
  status?: 'error' | 'warning' | 'success' | 'info';
}

const Cell = ({
  width = 'max-content',
  maxWidth = 'max-content',
  className,
  pill = false,
  value,
  status,
}: CellProps) => {
  const { t } = useTranslation();
  const [popOver, setPopOver] = useState(false);

  const limitObject = useAppSelector(selectReportConfiguration);
  const style = {
    border: '1px solid #BAC3D4',
  };

  if (value === '') {
    style.border = 'none';
  }
  if(value === null || value === undefined) {
    value = '';
  }

  return (
    <div className="flex flex-row justify-between w-full ">
      {pill ? (
        <div
          className={`mx-3 w-max truncate px-3 font-fira text-[13px] font-medium text-lightBlack  ${className}`}
          style={{ ...style }}
        >
          <div className="flex flex-row gap-3">
            <span className=""> {value as React.ReactNode} </span>
            {status === 'error' ? (
              <WarningTriangleIcon
                onClick={() => {
                  setPopOver(true);
                }}
                className="fill-[#FF0008] hover:cursor-pointer"
              />
            ) : (
              ''
            )}
          </div>
        </div>
      ) : (
        <div
          className={`truncate px-3 font-inter text-[13px] font-medium text-lightBlack  ${className}`}
          style={{ width: width, maxWidth: maxWidth }}
        >
          <div className="flex flex-row gap-3">
            <span> {value as React.ReactNode} </span>
            {status === 'error' ? (
              <WarningTriangleIcon
                onClick={() => {
                  setPopOver(true);
                }}
                className="fill-[#FF0008] hover:cursor-pointer"
              />
            ) : (
              ''
            )}
          </div>
        </div>
      )}

      {popOver && (
        <ModalConfirm
          titleModal={`${t('multiMap.maximum')} ${limitObject.markerLimit} ${t('multiMap.marker')}!`}
          onClose={() => setPopOver(false)}
          isOpen={popOver}
          buttonsTextCancel={null}
          onConfirm={() => setPopOver(false)}
          buttonsVariantConfirm={'delete'}
          buttonsVariantCancel={'secondary'}
          typeModal="delete"
          buttonsTextConfirm={t('multiMap.sluiten')}
        >
          <p>{t('lib.tableCell1')}</p>
          <p>{t('lib.tableCell2')}</p>
        </ModalConfirm>
      )}
    </div>
  );
};

export default Cell;
