import React from 'react';
import {useDraggable} from '@dnd-kit/core';


interface Props {
    id: string;
    children: React.ReactNode;
    }


const Draggable = ({id,children}:Props) => {
  const {attributes, listeners, setNodeRef} = useDraggable({
    id: id,
  });
  
  return (
    <div ref={setNodeRef} {...listeners} {...attributes}>
      {children}
    </div>
  );
}

export default Draggable;