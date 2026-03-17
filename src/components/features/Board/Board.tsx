import React from 'react';
import { DragDropContext, type DropResult } from '@hello-pangea/dnd';
import Column from './Column';
import type { BoardData } from '../../../types/Board.type';

import type { TaskPriority, TaskStatus } from '../../../types/Task.type';
import type { SortCriteria } from '../../../constants/board';
import type { SortOrder } from '../../ui/Sort/Sort';

interface BoardProps {
  data: BoardData;
  onDragEnd: (result: DropResult) => void;
  searchQuery: string;
  selectedPriorities: TaskPriority[];
  selectedStatuses: TaskStatus[];
  onTaskClick?: (taskId: string) => void;
  globalSortCriteria: SortCriteria | null;
  globalSortOrder: SortOrder;
  globalSortVersion: number;
  onColumnSortApplied?: () => void;
}

export const Board: React.FC<BoardProps> = ({ 
  data,
  onDragEnd,
  searchQuery,
  selectedPriorities,
  selectedStatuses,
  onTaskClick,
  globalSortCriteria,
  globalSortOrder,
  globalSortVersion,
  onColumnSortApplied
}) => {

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
              onTaskClick={onTaskClick}
              globalSortCriteria={globalSortCriteria}
              globalSortOrder={globalSortOrder}
              globalSortVersion={globalSortVersion}
              onColumnSortApplied={onColumnSortApplied}
            />
          );
        })}
      </div>
    </DragDropContext>
  );
};

export default Board;
