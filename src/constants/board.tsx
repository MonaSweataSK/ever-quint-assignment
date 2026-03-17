import type { TaskPriority, TaskStatus } from '../types/Task.type';
import type { SortOption } from '../components/ui/Sort/Sort';
export interface ColumnConfig {
  id: string;
  title: string;
}

export const COLUMNS: ColumnConfig[] = [
  { id: 'backlog', title: 'Backlog' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
];

export const FILTER_PRIORITY_OPTIONS: TaskPriority[] = ['high', 'medium', 'low'];
export const FILTER_STATUS_OPTIONS: TaskStatus[] = ['todo', 'in-progress', 'done'];

export type SortCriteria = 'dueDate' | 'priority';

export const SORT_OPTIONS_CONFIG: SortOption<SortCriteria>[] = [
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
