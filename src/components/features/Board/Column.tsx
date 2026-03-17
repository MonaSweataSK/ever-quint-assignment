import React, { useState, useMemo, useEffect } from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import TaskCard from '../Task/TaskCard';
import type { Task, TaskPriority } from '../../../types/Task.type';
import type { SortCriteria } from '../../../constants/board';
import { TaskSort } from './TaskSort';
import type { SortOrder } from '../../ui/Sort/Sort';

interface ColumnProps {
  columnId: string;
  title: string;
  tasks: Task[];
  onTaskClick?: (taskId: string) => void;
  onTaskDelete?: (taskId: string) => void;
  globalSortCriteria: SortCriteria | null;
  globalSortOrder: SortOrder;
  globalSortVersion: number;
  onColumnSortApplied?: () => void;
}

const PRIORITY_WEIGHT: Record<TaskPriority, number> = {
  high: 3,
  medium: 2,
  low: 1,
};

export const Column: React.FC<ColumnProps> = ({
  columnId, title, tasks, onTaskClick, onTaskDelete,
  globalSortCriteria, globalSortOrder, globalSortVersion,
  onColumnSortApplied
}) => {
  // Local column-level override (null = follow global)
  const [localSort, setLocalSort] = useState<{ criteria: SortCriteria | null; order: SortOrder } | null>(null);

  useEffect(() => {
    // Whenever a new global sort interaction happens, reset local overrides
    setLocalSort(null);
  }, [globalSortVersion]);

  // Effective sort: local override wins, otherwise global
  const effectiveCriteria = localSort ? localSort.criteria : globalSortCriteria;
  const effectiveOrder = localSort ? localSort.order : globalSortOrder;

  const sortedTasks = useMemo(() => {
    if (!effectiveCriteria) return tasks;

    return [...tasks].sort((a, b) => {
      let comparison = 0;
      if (effectiveCriteria === 'dueDate') {
        comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      } else if (effectiveCriteria === 'priority') {
        comparison = PRIORITY_WEIGHT[a.priority] - PRIORITY_WEIGHT[b.priority];
      }

      return effectiveOrder === 'asc' ? comparison : -comparison;
    });
  }, [tasks, effectiveCriteria, effectiveOrder]);

  const handleColumnSort = (criteria: SortCriteria, order: SortOrder) => {
    setLocalSort({ criteria, order });
    onColumnSortApplied?.();
  };

  const handleClearColumnSort = () => {
    setLocalSort(null);
  };

  return (
    <div className="flex flex-col w-80 bg-gray-50/50 rounded-2xl border border-gray-100 min-h-[500px]">
      {/* Column Header */}
      <div className="p-4 flex items-center justify-between relative">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">
            {title}
          </h2>
          <span className="bg-gray-200 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
            {tasks.length}
          </span>
        </div>
        
        <TaskSort 
          currentCriteria={localSort ? localSort.criteria : effectiveCriteria}
          currentOrder={localSort ? localSort.order : effectiveOrder}
          onSort={handleColumnSort}
          onClear={handleClearColumnSort}
          title="Sort By"
          renderTrigger={(isOpen) => (
            <button 
              className={`text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100 ${isOpen ? 'bg-gray-100 text-gray-600' : ''}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          )}
        />
      </div>

      {/* Task List (Droppable area) */}
      <Droppable droppableId={columnId}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`
              flex-1 p-3 flex flex-col gap-3 transition-colors duration-200
              ${snapshot.isDraggingOver ? 'bg-blue-50/30' : ''}
            `}
          >
            {sortedTasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...provided.draggableProps.style,
                      transform: provided.draggableProps.style?.transform,
                    }}
                    className={`${snapshot.isDragging ? 'z-50 shadow-xl scale-[1.02]' : ''}`}
                  >
                    <TaskCard {...task} onClick={onTaskClick} onDelete={onTaskDelete} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
