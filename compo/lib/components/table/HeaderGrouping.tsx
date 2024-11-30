import React from 'react'
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../app/hooks';
import { selectGroupingOptions, selectGroupingOptionsSocMed, selectGroupingType, selectGroupingTypeSocMed } from '../../../components/ipa/slice/ipaSlice';

export interface GroupingOptions {
    [key: string]: string;
  }


interface CellProps {
    className?: string;
    borderLeft?: string;
    parentKey?: string;
    type: 'socMed' | 'isp';
}

const HeaderGrouping = ({  className, borderLeft, parentKey,type }: CellProps) => {
    const { t } = useTranslation()
    let groupingTypeString = 1;
    let groupingOptions
    if(type === 'isp'){
    groupingTypeString = useAppSelector(selectGroupingType) as number;
    groupingOptions = useAppSelector(selectGroupingOptions) as  GroupingOptions;
    } else if (type === 'socMed'){
        groupingTypeString = useAppSelector(selectGroupingTypeSocMed) as number;
        groupingOptions = useAppSelector(selectGroupingOptionsSocMed) as  GroupingOptions;
    }

    let value = groupingOptions && groupingOptions[groupingTypeString.toString()];

    if(value === 'IpAddress'){
        value = 'publicIp'
    }
    
    return <p
        className={`text-sm font-bold text-left text-[#294766] w-max ${className} px-3`}
        style={{ borderLeft: borderLeft }}

    >   {
            parentKey === undefined ? t(`${value as string}`) : t(`${parentKey}.${value as string}`)
        }
    </p>;
}

export default HeaderGrouping