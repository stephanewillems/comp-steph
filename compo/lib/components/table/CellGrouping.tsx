import React, { useState } from 'react';
import { Marker } from '../../../components/map/marker/Marker.objects';
import ModalConfirm from '../ModalConfirm';
import { WarningTriangleIcon } from '../../icons/warning-triangle';
import { useAppSelector } from '../../../app/hooks';
import { selectReportConfiguration } from '../../../components/general/caseSlice';
import { useTranslation } from 'react-i18next';
import { selectGroupingOptions, selectGroupingOptionsSocMed, selectGroupingType, selectGroupingTypeSocMed } from '../../../components/ipa/slice/ipaSlice';
import { GroupingOptions } from './HeaderGrouping';


interface CellProps {
  width?: string;
  maxWidth?: string;
  className?: string;
  pill?: boolean;
  value: string | number | Marker | JSX.Element | object;
  status?: 'error' | 'warning' | 'success' | 'info';
  type: 'socMed' | 'isp' ;
}

const CellGrouping = ({
  width = 'max-content',
  maxWidth = 'max-content',
  className,
  pill = false,
  value,
  status,
  type
}: CellProps) => {
  const { t } = useTranslation();
  const [popOver, setPopOver] = useState(false);
  let groupingTypeString = 0;
  let groupingOptions;
  if(type === 'isp'){
  groupingTypeString = useAppSelector(selectGroupingType) as number;
  groupingOptions = useAppSelector(selectGroupingOptions) as  GroupingOptions;
  } else if(type === 'socMed'){
    groupingTypeString = useAppSelector(selectGroupingTypeSocMed) as number;
    groupingOptions = useAppSelector(selectGroupingOptionsSocMed) as  GroupingOptions;
  }


  const valueString = groupingOptions && groupingOptions[groupingTypeString.toString()];

 

  const limitObject = useAppSelector(selectReportConfiguration);
  const style = {
    border: '1px solid #BAC3D4',
  };

  if (value === '') {
    style.border = 'none';
  }

  if(typeof value === 'number' && valueString === 'AddressTypeId'){
    value = value === 1 ? 'IPv4' : 'IPv6';
  }
  if(typeof value === 'number' && valueString === 'AddressSourceId'){
    value = value === 1 ? 'Residential' : 'Mobile';
  }
  if (valueString === 'Coordinates') {
    const coordinatesValue = value as { latitude: number, longitude: number, coordinatesString: string };
    value = coordinatesValue.coordinatesString;
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

export default CellGrouping;
