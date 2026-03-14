import React, { useState } from 'react';
import { DragDropContext, type DropResult } from '@hello-pangea/dnd';
import Column from './Column';
import type { BoardData } from './type';

import type { TaskPriority, TaskStatus } from '../Task/type';

interface BoardProps {
  initialData: BoardData;
  searchQuery: string;
  selectedPriorities: TaskPriority[];
  selectedStatuses: TaskStatus[];
}

export const Board: React.FC<BoardProps> = ({ 
  initialData, 
  searchQuery,
  selectedPriorities,
  selectedStatuses
}) => {
  const [data, setData] = useState<BoardData>(initialData);

  const onDragEnd = (result: DropResult) => {
    // ... same onDragEnd implementation ...
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startColumn = data.columns[source.droppableId];
    const finishColumn = data.columns[destination.droppableId];

    // Moving within the same column
    if (startColumn === finishColumn) {
      const newTaskIds = Array.from(startColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...startColumn,
        taskIds: newTaskIds,
      };

      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };

      setData(newState);
      return;
    }

    // Moving from one column to another
    const startTaskIds = Array.from(startColumn.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...startColumn,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finishColumn.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finishColumn,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setData(newState);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-6 overflow-x-auto pb-8 min-h-[600px] scrollbar-hide">
        {data.columnOrder.map((columnId) => {
          const column = data.columns[columnId];
          const tasks = column.taskIds
            .map((taskId) => data.tasks[taskId])
            .filter((task) => {
              // Search filtering
              const query = searchQuery.toLowerCase().trim();
              const matchesSearch = !query || 
                task.title.toLowerCase().includes(query) ||
                task.description.toLowerCase().includes(query);

              // Priority filtering
              const matchesPriority = selectedPriorities.length === 0 || 
                selectedPriorities.includes(task.priority);

              // Status filtering
              const matchesStatus = selectedStatuses.length === 0 || 
                selectedStatuses.includes(task.status);

              return matchesSearch && matchesPriority && matchesStatus;
            });

          return (
            <Column
              key={column.id}
              columnId={column.id}
              title={column.title}
              tasks={tasks}
            />
          );
        })}
      </div>
    </DragDropContext>
  );
};

export default Board;
