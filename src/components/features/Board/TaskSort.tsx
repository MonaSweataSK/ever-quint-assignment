import React from 'react';
import Sort, { type SortOption, type SortOrder } from '../../ui/Sort/Sort';

export type SortCriteria = 'dueDate' | 'priority';

const SORT_OPTIONS: SortOption<SortCriteria>[] = [
    {
        id: 'dueDate',
        label: 'Due Date',
        icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        ),
        defaultOrder: 'asc'
    },
    {
        id: 'priority',
        label: 'Priority',
        icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
        defaultOrder: 'desc'
    }
];

interface TaskSortProps {
    currentCriteria: SortCriteria | null;
    currentOrder: SortOrder;
    onSort: (criteria: SortCriteria, order: SortOrder) => void;
    onClear: () => void;
    renderTrigger: (isOpen: boolean) => React.ReactNode;
    title?: string;
    align?: 'left' | 'right';
    className?: string;
}

export const TaskSort: React.FC<TaskSortProps> = ({
    currentCriteria,
    currentOrder,
    onSort,
    onClear,
    renderTrigger,
    title = 'Sort Tasks',
    align = 'right',
    className = ''
}) => {
    return (
        <Sort
            options={SORT_OPTIONS}
            currentCriteria={currentCriteria}
            currentOrder={currentOrder}
            onSort={onSort}
            onClear={onClear}
            renderTrigger={renderTrigger}
            title={title}
            align={align}
            className={className}
        />
    );
};

export default TaskSort;
