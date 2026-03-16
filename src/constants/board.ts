export interface ColumnConfig {
  id: string;
  title: string;
}

export const COLUMNS: ColumnConfig[] = [
  { id: 'backlog', title: 'Backlog' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
];
