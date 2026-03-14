import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import TaskCard from '../Task/TaskCard';
import type { Task, TaskPriority } from '../Task/type';

interface ColumnProps {
  columnId: string;
  title: string;
  tasks: Task[];
}

type SortCriteria = 'dueDate' | 'priority' | null;
type SortOrder = 'asc' | 'desc';

const PRIORITY_WEIGHT: Record<TaskPriority, number> = {
  high: 3,
  medium: 2,
  low: 1,
};

export const Column: React.FC<ColumnProps> = ({ columnId, title, tasks }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState<{ criteria: SortCriteria; order: SortOrder }>({
    criteria: null,
    order: 'asc',
  });
  
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const sortedTasks = useMemo(() => {
    if (!sortConfig.criteria) return tasks;

    return [...tasks].sort((a, b) => {
      let comparison = 0;
      if (sortConfig.criteria === 'dueDate') {
        comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      } else if (sortConfig.criteria === 'priority') {
        comparison = PRIORITY_WEIGHT[a.priority] - PRIORITY_WEIGHT[b.priority];
      }

      return sortConfig.order === 'asc' ? comparison : -comparison;
    });
  }, [tasks, sortConfig]);

  const toggleSort = (criteria: SortCriteria) => {
    setSortConfig((prev) => {
      if (prev.criteria === criteria) {
        return {
          criteria,
          order: prev.order === 'asc' ? 'desc' : 'asc',
        };
      }
      return {
        criteria,
        order: criteria === 'priority' ? 'desc' : 'asc',
      };
    });
    setIsMenuOpen(false);
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
        
        <div className="relative" ref={menuRef}>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100 ${isMenuOpen ? 'bg-gray-100 text-gray-600' : ''}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-3 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Sort By
              </div>
              <button
                onClick={() => toggleSort('dueDate')}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-between group"
              >
                <span>Due Date</span>
                {sortConfig.criteria === 'dueDate' && (
                  <span className="text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded font-bold uppercase">
                    {sortConfig.order}
                  </span>
                )}
              </button>
              <button
                onClick={() => toggleSort('priority')}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-between group"
              >
                <span>Priority</span>
                {sortConfig.criteria === 'priority' && (
                  <span className="text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded font-bold uppercase">
                    {sortConfig.order}
                  </span>
                )}
              </button>
              {sortConfig.criteria && (
                <>
                  <div className="h-px bg-gray-100 my-1 mx-2" />
                  <button
                    onClick={() => {
                      setSortConfig({ criteria: null, order: 'asc' });
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                  >
                    Reset Sorting
                  </button>
                </>
              )}
            </div>
          )}
        </div>
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
                    <TaskCard {...task} />
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
