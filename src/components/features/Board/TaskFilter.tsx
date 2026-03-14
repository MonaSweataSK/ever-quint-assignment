import React, { useState, useRef, useEffect } from 'react';

import type { TaskPriority, TaskStatus } from '../../../types/Task.type';

interface TaskFilterProps {
  selectedPriorities: TaskPriority[];
  selectedStatuses: TaskStatus[];
  onPriorityChange: (priorities: TaskPriority[]) => void;
  onStatusChange: (statuses: TaskStatus[]) => void;
  onClearAll: () => void;
  className?: string;
}

const PRIORITY_OPTIONS = ['high', 'medium', 'low'] as const;
const STATUS_OPTIONS = ['todo', 'in-progress', 'done'] as const;

export const TaskFilter: React.FC<TaskFilterProps> = ({
  selectedPriorities,
  selectedStatuses,
  onPriorityChange,
  onStatusChange,
  onClearAll,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const hasFilters = selectedPriorities.length > 0 || selectedStatuses.length > 0;

  return (
    <div className={`relative ${className}`} ref={popoverRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all border
          ${isOpen || hasFilters 
            ? 'bg-indigo-50 border-indigo-200 text-indigo-700' 
            : 'bg-white border-gray-100 text-gray-600 hover:bg-gray-50 hover:border-gray-200'}
        `}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4.5h18m-18 5h18m-18 5h18m-18 5h18" />
        </svg>
        <span>Filter</span>
        {hasFilters && (
          <span className="bg-indigo-600 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
            {selectedPriorities.length + selectedStatuses.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Filters</h3>
            {hasFilters && (
              <button
                onClick={onClearAll}
                className="text-[10px] font-bold text-indigo-600 hover:text-indigo-700 uppercase tracking-widest"
              >
                Clear All
              </button>
            )}
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Priority</label>
              <div className="flex flex-wrap gap-2">
                {PRIORITY_OPTIONS.map((p) => (
                  <button
                    key={p}
                    onClick={() => {
                      if (selectedPriorities.includes(p)) {
                        onPriorityChange(selectedPriorities.filter((item) => item !== p));
                      } else {
                        onPriorityChange([...selectedPriorities, p]);
                      }
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                      selectedPriorities.includes(p)
                        ? 'bg-indigo-600 border-indigo-600 text-white'
                        : 'bg-gray-50 border-transparent text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Status</label>
              <div className="flex flex-wrap gap-2">
                {STATUS_OPTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      if (selectedStatuses.includes(s)) {
                        onStatusChange(selectedStatuses.filter((item) => item !== s));
                      } else {
                        onStatusChange([...selectedStatuses, s]);
                      }
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                      selectedStatuses.includes(s)
                        ? 'bg-indigo-600 border-indigo-600 text-white'
                        : 'bg-gray-50 border-transparent text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskFilter;
