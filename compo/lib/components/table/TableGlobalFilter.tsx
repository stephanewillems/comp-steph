import React from 'react'
import { DebouncedInput } from './DebouncedInput'
import { useTranslation } from 'react-i18next';

interface Props {
    globalFilter: string,
    setGlobalFilter(value: string): void
}

const TableGlobalFilter = ({ globalFilter, setGlobalFilter }: Props) => {
    const { t } = useTranslation();
    return (
        <>
            <DebouncedInput
                value={globalFilter ?? ''}
                onChange={value => setGlobalFilter(String(value))}
                className="p-2 font-lg shadow border border-block"
                placeholder={t('lib.tableGlobalFilter')}
            />
        </>
    )
}

export default TableGlobalFilter