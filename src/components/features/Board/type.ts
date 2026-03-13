import type { Task } from '../Task/type';

export interface BoardColumn {
  id: string;
  title: string;
  taskIds: string[];
}

export interface BoardData {
  tasks: Record<string, Task>;
  columns: Record<string, BoardColumn>;
  columnOrder: string[];
}
