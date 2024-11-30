import React, { useEffect, useRef, useState } from 'react';
import { TriangleIcon } from '../../icons/triangle';

import { Column } from '@tanstack/react-table';
import { DndContext, useSensors, useSensor, PointerSensor, KeyboardSensor, closestCenter } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import Draggable from './Draggable';
import SortableItem from './SortableItem';
import { useTranslation } from 'react-i18next';
import useOutsideClick from '../../../hooks/useOutsideClick';
import SearchInput from '../inputs/SearchInput';

interface Props {
  table: any;
  labelsColumns: { key: string; label: string }[];
  onColumnOrderChange: (newOrder: string[]) => void;
  LOCAL_STORAGE_KEY: string;
  handleClose: () => void;
}

const ColumnsView = ({ table, labelsColumns, onColumnOrderChange, LOCAL_STORAGE_KEY, handleClose }: Props) => {
  const { t } = useTranslation();
  const columnsRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(() => {
    const storedColumnOrder = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedColumnOrder
      ? JSON.parse(storedColumnOrder)
      : table.getAllLeafColumns().map((col: Column<any, any>) => col.id);
  });

  const [filteredColumns, setFilteredColumns] = useState(columns);

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 5,
    },
  });

  const sensors = useSensors(
    pointerSensor,
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const toggleAllColumns = () => {
    const newVisibility: Record<string, boolean> = {};
    table.getAllColumns().forEach((column: Column<any, any>) => {
      newVisibility[column.id] = column.id === 'select' || column.id === 'actions' ? true : true;
    });
    table.setColumnVisibility(newVisibility);
  };

  const hideAllColumns = () => {
    const newVisibility: Record<string, boolean> = {};
    table.getAllColumns().forEach((column: Column<any, any>) => {
      newVisibility[column.id] = column.id === 'select' || column.id === 'actions' ? true : false;
    });
    table.setColumnVisibility(newVisibility);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active?.id !== over?.id) {
      const activeIndex = columns.indexOf(active.id);
      const overIndex = columns.indexOf(over!.id);
      const newColumns = arrayMove(columns, activeIndex, overIndex);
      setColumns(newColumns);
      setFilteredColumns(newColumns);
      table.setColumnOrder(newColumns);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newColumns));
    }
  };

  useEffect(() => {
    onColumnOrderChange(columns);
  }, [columns]);

  useOutsideClick({
    refs: [columnsRef],
    onOutsideClick: handleClose,
  });

  const [searchValue, setSearchValue] = useState('');

  const searchOnchange = (value: string) => {
    setSearchValue(value);
  };

  useEffect(() => {
    const columnsFiltered = columns.filter((columnId: string) => {
      const columnLabel = labelsColumns.find((c) => c.key === columnId)?.label || columnId;
      return columnLabel.toLowerCase().includes(searchValue.toLowerCase());
    });
    setFilteredColumns(columnsFiltered);
  }, [searchValue, columns, labelsColumns]);

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="absolute left-[20px] top-[27px] z-50 flex w-[290px] flex-col justify-between rounded-sm bg-white font-inter font-medium shadow-lg"
        ref={columnsRef}>
        <TriangleIcon className="absolute -top-8 fill-white h-16 shadow-md" />
        <SortableContext items={filteredColumns} strategy={verticalListSortingStrategy}>
          <div
            className="pb-5 overflow-y-scroll rounded-md"
            style={{
              minHeight: '200px',
              maxHeight: '400px',
            }}
          >
            <div
              className="sticky top-0 z-50 flex flex-row w-full p-3 bg-white"
              style={{
                borderBottom: '1px solid #D3DAE6',
              }}
            >
              <SearchInput onChange={searchOnchange} value={searchValue} id='search' placeholder='Zoeken' />
            </div>
            <div className="px-3 pt-2 pb-5 space-y-5">
              {filteredColumns.map((columnId: string) => {
                const column = table.getColumn(columnId);
                const columnLabel = labelsColumns.find((c) => c.key === column.id)?.label || column.id;
                if (columnId === 'select' || columnId === 'actions') return null;

                return (
                  column && (
                    <Draggable key={column.id} id={column.id}>
                      <SortableItem column={column} columnLabel={columnLabel} />
                    </Draggable>
                  )
                );
              })}
            </div>
          </div>
        </SortableContext>
        <div
          className="py-3 mt-3"
          style={{
            borderTop: '1px solid #D3DAE6',
          }}
        >
          <div className="flex flex-row items-center justify-between px-5 font-inter text-[13px] font-bold text-primary">
            <button onClick={toggleAllColumns}> {t('lib.toonAlle')}</button>
            <button onClick={hideAllColumns}>{t('lib.verbergAlle')}</button>
          </div>
        </div>
      </div>
    </DndContext>
  );
};

export default ColumnsView;
