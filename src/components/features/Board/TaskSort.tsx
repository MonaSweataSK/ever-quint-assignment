import React from 'react';
import Sort, { type SortOrder } from '../../ui/Sort/Sort';

import { type SortCriteria, SORT_OPTIONS_CONFIG } from '../../../constants/board';

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
            options={SORT_OPTIONS_CONFIG}
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
