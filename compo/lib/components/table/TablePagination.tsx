import React from 'react'
import { ChevronLeftIcon } from '../../icons/chevron-left'
import { ChevronRightIcon } from '../../icons/chevron-right'
import { useTranslation } from 'react-i18next'

interface Props {
    table: any,
    paginationIntervals: number[] | undefined
}

const TablePagination = ({ table, paginationIntervals }: Props) => {
    const { t } = useTranslation();

    return (
        <>
            <div className="flex items-center justify-end gap-2 mt-2 mb-1 mr-5">
                <button
                    className="p-1 border rounded"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <ChevronLeftIcon className={table.getCanPreviousPage() ? 'fill-primary' : 'fill-secondary'} />
                </button>
                <span className='bg-slate-300 rounded px-1.5 py-0.5 text-primary text-xs'>
                    {
                        table.getState().pagination.pageIndex + 1
                    }
                </span>
                <button
                    className="p-1 border rounded"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    <ChevronRightIcon color='#5C7A99' className={table.getCanNextPage() ? 'fill-primary' : 'fill-secondary'} />
                </button>
                <div>
                    <select
                        value={table.getState().pagination.pageSize}
                        className='bg-slate-300 rounded py-0.5 text-sm text-slate-500'
                        onChange={e => {
                            table.setPageSize(Number(e.target.value))
                        }}>
                        {paginationIntervals && paginationIntervals.map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                {pageSize}
                            </option>
                        ))}
                    </select>
                    <label className='ml-2 text-xs'>{t('general.perPage')}</label>
                </div>

            </div>
        </>
    )
}

export default TablePagination
