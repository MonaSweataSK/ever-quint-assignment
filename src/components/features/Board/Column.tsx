import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import TaskCard from '../Task/TaskCard';
import type { Task } from '../Task/type';

interface ColumnProps {
  columnId: string;
  title: string;
  tasks: Task[];
}

export const Column: React.FC<ColumnProps> = ({ columnId, title, tasks }) => {
  return (
    <div className="flex flex-col w-80 bg-gray-50/50 rounded-2xl border border-gray-100 min-h-[500px]">
      {/* Column Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">
            {title}
          </h2>
          <span className="bg-gray-200 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
            {tasks.length}
          </span>
        </div>
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
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
            {tasks.map((task, index) => (
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
