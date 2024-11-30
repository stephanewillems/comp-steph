import React from 'react'
import SwitchWithIcon from '../SwitchWithIcon';
import { Column } from '@tanstack/react-table';
import { ArrangeIcon } from '../../icons/arrange';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from "@dnd-kit/utilities";


interface Props {
    column: Column<any, any>;
    columnLabel: string;
}


const SortableItem = ({ column, columnLabel, }: Props) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition,
    } = useSortable({
        id: column.id,
    });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
      };

    return (

        <div className='flex flex-row justify-between gap-2 '
        ref={setNodeRef}
        style={style}
        {...attributes}
        >
            <div className='flex flex-row items-center gap-1'  
            {...listeners}
      ref={setActivatorNodeRef}>
                <SwitchWithIcon checked={column.getIsVisible()} onChange={column.getToggleVisibilityHandler()} />
                <label>{columnLabel}</label>
            </div>
            <ArrangeIcon className='cursor-grab' />
        </div>

    )
}

export default SortableItem