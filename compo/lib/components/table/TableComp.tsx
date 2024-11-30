import React, { Fragment, useEffect, useState } from 'react';
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
  flexRender,
  SortingState,
  getSortedRowModel,
  ColumnOrderState,
  PaginationState,
  getPaginationRowModel,
  getFilteredRowModel,
  getExpandedRowModel,
  Row,
  RowSelectionState,
} from '@tanstack/react-table';
import { motion } from 'framer-motion';
import { ColumnIcon } from '../../icons/column';
import { SortAscIcon } from '../../icons/sortAsc';
import { SortDescIcon } from '../../icons/sortDesc';
import ColumnsView from './ColumnsView';
import TablePagination from './TablePagination';
import { FuzzyFilter } from './FuzzyFilter';
import TableGlobalFilter from './TableGlobalFilter';
import { useTranslation } from 'react-i18next';
import LoadingBar from '../loadingScreen/LoadingBar';
import { XmarkCircleFillIcon } from '../../icons/xmark-circle-fill';
import { Button } from '../buttons/Button';
import { CheckmarkIcon } from '../../icons/checkmark';
import { useAppSelector } from '../../../app/hooks';
import { selectSlideOver } from '../../../components/map/marker/markerSlice';

interface Visibility {
  isVisible?: boolean;
}

// Type guard function to check if an object has the isVisible property
const hasVisibility = (obj: any): obj is Visibility => {
  return 'isVisible' in obj;
};

interface TableRow {
  [key: string]: any;
}

interface TableCompProps<T extends TableRow> {
  data: T[];
  columns: ColumnDef<T>[];
  selectedRowsData: (data: T[]) => void;
  labelsColumns: { key: string; label: string }[];
  columnVisibility: ColumnVisibility;
  setColumnVisibility: React.Dispatch<React.SetStateAction<ColumnVisibility>>;
  LOCAL_STORAGE_KEY: string;
  defaultSortingColumn?: SortingState;
  sortChangeHandler?: (newSortingState: SortingState) => void;
  pageChangeHandler?: (newPaginationState: PaginationState) => void;
  globalFilterVisible?: boolean;
  cleanUpSelection?: boolean;
  setCleanUpSelection?: React.Dispatch<React.SetStateAction<boolean>>;
  paginationIntervals?: number[];
  paginationVisibility?: boolean;
  externalPage?: number;
  pageCount?: number;
  externalPageSize?: number;
  manPagination?: boolean;
  manSorting?: boolean;
  optionalHeaders?: React.ReactNode;
  heightTable?: string;
  renderExpandedRow?: (row: Row<T>) => React.ReactNode;
  canExpand?: boolean;
  externalRowSelection?: { [key: string]: boolean };
  onRowSelectionChange?: (rowSelection: { [key: string]: boolean }) => void;
  rowCanExpandCondition?: (row: T) => boolean;
  getRowId?: (row: T) => string;
  loading?: 'none' | 'loading' | 'succeeded' | 'failed';
  loadingMessage?: string;
  loadingErrorMessage?: string;
  loadingErrorButton?: string;
  loadingSuccessMessage?: string;
  loadingSuccesButton?: string;
  closeError?: () => void;
  closeSuccess?: () => void;
}

export type ColumnVisibility = {
  [key: string]: boolean;
};

const TableComp = <T extends {}>({
  data,
  columns,
  selectedRowsData,
  labelsColumns,
  columnVisibility,
  setColumnVisibility,
  LOCAL_STORAGE_KEY,
  defaultSortingColumn,
  globalFilterVisible = false,
  cleanUpSelection = false,
  setCleanUpSelection,
  paginationIntervals,
  sortChangeHandler,
  pageChangeHandler,
  externalPage,
  externalPageSize,
  paginationVisibility = true,
  manPagination,
  manSorting,
  pageCount,
  optionalHeaders,
  heightTable = 'h-[calc(100vh-247px)]',
  renderExpandedRow,
  canExpand = false,
  externalRowSelection,
  onRowSelectionChange,
  rowCanExpandCondition,
  getRowId,
  loading,
  loadingMessage,
  loadingErrorMessage,
  loadingErrorButton,
  loadingSuccessMessage,
  loadingSuccesButton,
  closeError,
  closeSuccess,
}: TableCompProps<T>) => {
  const [sorting, setSorting] = useState<SortingState>(defaultSortingColumn ? defaultSortingColumn : []);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>(externalRowSelection ? externalRowSelection : {});
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const { t } = useTranslation();
  const [globalFilter, setGlobalFilter] = useState('');

  const slideOver = useAppSelector(selectSlideOver);

  const table = useReactTable({
    columns,
    data,
    pageCount,
    getCoreRowModel: getCoreRowModel(),
    getRowId: getRowId ? getRowId : (row) => row.id,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    /* debugTable: true, */
    onColumnOrderChange: setColumnOrder,
    onSortingChange: setSorting,
    debugHeaders: false,
    debugColumns: false,
    onRowSelectionChange: setRowSelection,
    enableMultiSort: true,
    enableColumnFilters: true,
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: manPagination !== undefined && manPagination === true,
    manualSorting: manSorting !== undefined && manSorting === true,
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: (row) => (rowCanExpandCondition ? rowCanExpandCondition(row.original) : false),
    globalFilterFn: FuzzyFilter,
    filterFns: {
      fuzzy: FuzzyFilter,
    },
    state: {
      columnVisibility,
      sorting,
      rowSelection,
      columnOrder,
      pagination,
      globalFilter,
    },
  });

  const hiddenColumnsCount = Object.values(table.getState().columnVisibility).filter((visible) => !visible).length;
  const styleHeader = {
    /*  borderRight: '1px solid #B8BFCC', */
    borderBottom: '1px solid #B8BFCC',
    borderTop: '1px solid #B8BFCC',
  };

  const style = {
    /* borderRight: '1px solid #CDD1D8', */
    borderBottom: '1px solid #CDD1D8',
  };

  const showPopoverColumns = () => {
    setPopoverOpen(!popoverOpen);
  };

  useEffect(() => {
    // Filter selected rows to exclude those that are not visible
    const selectedRows = table.getRowModel().rows.filter((row) => {
      const isRowVisible = hasVisibility(row.original) ? row.original.isVisible !== false : true;
      return row.getIsSelected() && isRowVisible;
    });
    const rowData = selectedRows.map((row) => row.original);
    selectedRowsData(rowData);
  }, [rowSelection, table.getRowModel().rows, selectedRowsData]);

  useEffect(() => {
    // Assuming table.setColumnOrder is the correct method to update the order
    const storedOrder = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedOrder) {
      const order = JSON.parse(storedOrder);
      table.setColumnOrder(order);
    }
  }, [table, LOCAL_STORAGE_KEY]);

  useEffect(() => {
    if (cleanUpSelection) {
      setRowSelection({});
      setCleanUpSelection!(false);
    }
  }, [cleanUpSelection]);

  useEffect(() => {
    if (sortChangeHandler) {
      sortChangeHandler(sorting);
    }
  }, [sorting]);

  useEffect(() => {
    if (pageChangeHandler) {
      pageChangeHandler(pagination);
    }
  }, [pagination]);

  useEffect(() => {
    if (externalPage && externalPageSize) {
      setPagination({
        pageIndex: externalPage,
        pageSize: externalPageSize,
      });
    }
  }, [externalPage, externalPageSize, setPagination]);

  useEffect(() => {
    if (onRowSelectionChange) {
      if (externalRowSelection) {
        onRowSelectionChange(externalRowSelection);
      } else {
        onRowSelectionChange(rowSelection);
      }
    }
  }, [rowSelection]);

  const closeErrorFn = () => {
    closeError && closeError();
    loading === 'none';
  };

  const closeSuccesFn = () => {
    closeSuccess && closeSuccess();
    loading === 'none';
  };

  return (
    <>
      <div className="flex flex-row items-center justify-between px-3 text-sm font-medium text-black h-7 bg-tableHeaderTop shadow-top">
        <div className="flex flex-row items-center justify-start w-full">
          <div
            className={`relative flex flex-row items-center gap-2 px-1.5   ${popoverOpen ? 'bg-white text-primary' : ''
              }`}
          >
            <ColumnIcon fill={`${popoverOpen ? '#0073E6' : '#000'}`} />
            <button className="whitespace-nowrap" onClick={showPopoverColumns}>
              {hiddenColumnsCount} {t('lib.buttonColumn1')}
            </button>
          </div>
          <div className="w-full">{optionalHeaders && optionalHeaders}</div>
        </div>
        {globalFilterVisible && <TableGlobalFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />}
      </div>
      <div className={`relative overflow-auto ${heightTable}`}>
      {loading === 'loading' && (
          <div className="absolute top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-white bg-opacity-75">
            <div className="text-center">
              <p className="py-2 mt-5 text-primary">{loadingMessage ? t(`${loadingMessage}`) : 'Loading...'}</p>
              <LoadingBar />
            </div>
          </div>
        )}

        {loading === 'failed' && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-white bg-opacity-60">
            <div className="flex flex-col items-center gap-2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="flex flex-row items-center gap-2"
              >
                <XmarkCircleFillIcon className="w-full h-full fill-red-500" width="25px" height="25px" />
              </motion.div>
              <p>{loadingErrorMessage ? t(`${loadingErrorMessage}`) : 'Error loading data. Please try again.'}</p>

              {closeError && (
                <Button variant="primary" onClick={closeErrorFn}>
                  {t(`${loadingErrorButton}`)}
                </Button>
              )}
            </div>
          </div>
        )}
        {loading === 'succeeded' && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-white bg-opacity-60">
            <div className="flex flex-col items-center gap-2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="flex flex-row items-center gap-2"
              >
                <CheckmarkIcon className="w-full h-full fill-green-500" width="25px" height="25px" />
              </motion.div>
              <p>{loadingSuccessMessage ? t(`${loadingSuccessMessage}`) : 'Loading succes'}</p>
              {closeSuccess && (
                <Button variant="primary" className="rounded-[2px]" onClick={closeSuccesFn}>
                  {t(`${loadingSuccesButton}`)}
                </Button>
              )}
            </div>
          </div>
        )}
        <table className="w-full bg-white h-max">
          <thead className="sticky top-0 z-40 h-8  !bg-[#EAECF0]">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                style={{
                  borderTop: '1px solid #B8BFCC',
                  borderBottom: '1px solid #B8BFCC',
                }}
              >
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={`relative align-middle ${header.id === 'select' ? 'sticky left-[0px] top-0 z-10 bg-[#EAECF0]' : ''
                      } ${header.id === 'actions' ? 'sticky right-[0px] top-0 z-10 bg-[#EAECF0]' : ''}`}
                    style={styleHeader}
                  >
                    {header.isPlaceholder ? null : (
                      <div className="flex flex-row items-center " onClick={header.column.getToggleSortingHandler()}>
                        <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
                        {header.id !== 'select' && header.id !== 'actions' && (
                          <span className="w-1/6">
                            {header.column.getIsSorted() === 'asc' && header.column.getCanSort() ? (
                              <SortAscIcon className="mx-1" fill="#0073E6" />
                            ) : header.column.getIsSorted() === 'desc' && header.column.getCanSort() ? (
                              <SortDescIcon className="mx-1" fill="#0073E6" />
                            ) : header.column.getCanSort() ? (
                              <SortDescIcon className="mx-1" fill="#C3CED9" />
                            ) : null}
                          </span>
                        )}
                        <div />
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white">
            {table.getRowModel().rows.map((row, index) => {
              const shouldBeBlurred = hasVisibility(row.original) && row.original.isVisible === false;
              const rowClassNames = `${index % 2 !== 0 && 'bg-tableOdd'} h-8 w-full ${row.getIsSelected() ? '!bg-blue-100' : ''
                } ${shouldBeBlurred ? 'blur-sm pointer-events-none select-none' : ''}`;
              const rowClassIndex = ` ${canExpand ? 'bg-diagonal-stripes opacity-90' : index % 2 !== 0 ? 'bg-tableOdd' : 'bg-white'
                } ${row.getIsSelected() ? '!bg-blue-100' : ''} `;

              /*  Check if marker is open in the map */

              let isHighlighted: boolean = false;
              if (row.original.markerType === 'ipa' && slideOver?.extraData.ipId !== undefined) {
                const parsedExtraData = JSON.parse(slideOver.extraData.ipId);
                const ipId = parsedExtraData.ipId;
                isHighlighted = row.original.data.ispData.ipId === ipId;
              } else if (
                row.original.markerType === undefined &&
                slideOver?.extraData.ipId !== undefined &&
                (row.original.isp?.displayName !== undefined || row.original.isp?.displayName !== null)
              ) {
                const parsedExtraData = JSON.parse(slideOver.extraData.ipId);
                const ipId = parsedExtraData.ipId;
                isHighlighted = row.original.id === ipId;
              } else {
                isHighlighted = row.original.markerId === slideOver?.markerId;
              }

              let similarityHighlight: boolean = false;
              if (row.original.titles?.length > 1) {
                similarityHighlight = true
              } else {
                similarityHighlight = false
              }

              return (
                <Fragment key={row.id}>
                  <tr
                    className={`align-middle ${rowClassNames} 
                    ${canExpand && similarityHighlight ? '!bg-[#a4d4f2]' : canExpand ? 'bg-diagonal-stripes opacity-90' : ''} 
                    ${isHighlighted ? '!bg-[#fbf8e7]' : ''}
                    `}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className={`truncate align-middle text-sm  font-medium text-lightBlack  ${cell.column.id === 'select' ? `sticky left-[0px] z-10 ${rowClassIndex} ` : ''
                          } ${cell.column.id === 'actions' ? `sticky right-[0px] z-10 ${rowClassIndex}` : ''}
                        
                        `}
                        style={{
                          ...style,
                        }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                  {row.getIsExpanded() && renderExpandedRow && (
                    <tr className={`align-middle ${rowClassNames}`}>
                      <td
                        className="text-sm font-medium truncate align-middle text-lightBlack"
                        style={style}
                        colSpan={table.getAllLeafColumns().length}
                      >
                        {renderExpandedRow(row)}
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      {popoverOpen === true && (
        <ColumnsView
          table={table}
          labelsColumns={labelsColumns}
          onColumnOrderChange={setColumnOrder}
          LOCAL_STORAGE_KEY={LOCAL_STORAGE_KEY}
          handleClose={showPopoverColumns}
        />
      )}
      {paginationVisibility && <TablePagination table={table} paginationIntervals={paginationIntervals} />}
      {/* <pre>{JSON.stringify(table.getState().rowSelection, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(table.getAllLeafColumns(), null, 2)}</pre> */}
      {/*  <pre>{JSON.stringify(table.getState().columnOrder, null, 2)}</pre> */}
    </>
  );
};

export default TableComp;
