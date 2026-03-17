import { create } from 'zustand';
import type { BoardColumn } from '../types/Board.type';
import type { Task, TaskStatus } from '../types/Task.type';
import { COLUMNS } from '../constants/board';
import { taskRepo } from '../db/repositories/TaskRepository';
import { checkAndMigrate } from '../db/migration';
import type { DropResult } from '@hello-pangea/dnd';

interface TaskState {
  tasks: Record<string, Task>;
  columns: Record<string, BoardColumn>;
  columnOrder: string[];
  isLoading: boolean;
  error: string | null;
  migrationRan: boolean;

  // Actions
  loadTasks: () => Promise<void>;
  createTask: (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateTask: (taskId: string, updatedTaskData: Partial<Omit<Task, 'id' | 'createdAt' | 'updatedAt'>>) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  moveTask: (result: DropResult) => Promise<void>;
}

const getColumnIdFromStatus = (status: TaskStatus): string => {
  if (status === 'todo') return 'backlog';
  return status;
};

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: {},
  columns: COLUMNS.reduce((acc, col) => {
    acc[col.id] = { id: col.id, title: col.title, taskIds: [] };
    return acc;
  }, {} as Record<string, BoardColumn>),
  columnOrder: COLUMNS.map(col => col.id),
  isLoading: false,
  error: null,
  migrationRan: false,

  loadTasks: async () => {
    set({ isLoading: true });
    try {
      const migrationRan = await checkAndMigrate();
      const allTasks = await taskRepo.getAll();
      const tasksMap: Record<string, Task> = {};
      const columnsMap: Record<string, BoardColumn> = COLUMNS.reduce((acc, col) => {
        acc[col.id] = { id: col.id, title: col.title, taskIds: [] };
        return acc;
      }, {} as Record<string, BoardColumn>);

      allTasks.forEach(task => {
        tasksMap[task.id] = task;
        const columnId = getColumnIdFromStatus(task.status);
        if (columnsMap[columnId]) {
          columnsMap[columnId].taskIds.push(task.id);
        }
      });

      set({ tasks: tasksMap, columns: columnsMap, isLoading: false, migrationRan });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  createTask: async (taskData) => {
    const taskId = `task-${Date.now()}`;
    const now = new Date();
    const newTask: Task = {
      ...taskData,
      id: taskId,
      createdAt: now,
      updatedAt: now,
    };

    try {
      await taskRepo.create(newTask);
      const columnId = getColumnIdFromStatus(newTask.status);

      set(state => ({
        tasks: { ...state.tasks, [taskId]: newTask },
        columns: {
          ...state.columns,
          [columnId]: {
            ...state.columns[columnId],
            taskIds: [...state.columns[columnId].taskIds, taskId],
          },
        },
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  updateTask: async (taskId, updatedData) => {
    const state = get();
    const oldTask = state.tasks[taskId];
    if (!oldTask) return;

    const now = new Date();
    const updatedTask: Task = {
      ...oldTask,
      ...updatedData,
      updatedAt: now,
    };

    try {
      await taskRepo.update(updatedTask);

      set(state => {
        const newTasks = { ...state.tasks, [taskId]: updatedTask };
        let newColumns = { ...state.columns };

        if (oldTask.status !== updatedTask.status) {
          const oldColumnId = getColumnIdFromStatus(oldTask.status);
          const newColumnId = getColumnIdFromStatus(updatedTask.status);

          if (newColumns[oldColumnId]) {
            newColumns[oldColumnId] = {
              ...newColumns[oldColumnId],
              taskIds: newColumns[oldColumnId].taskIds.filter(id => id !== taskId),
            };
          }

          if (newColumns[newColumnId]) {
            newColumns[newColumnId] = {
              ...newColumns[newColumnId],
              taskIds: [...newColumns[newColumnId].taskIds, taskId],
            };
          }
        }

        return { tasks: newTasks, columns: newColumns };
      });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  deleteTask: async (taskId) => {
    const state = get();
    const task = state.tasks[taskId];
    if (!task) return;

    try {
      await taskRepo.delete(taskId);
      const columnId = getColumnIdFromStatus(task.status);

      set(state => {
        const newTasks = { ...state.tasks };
        delete newTasks[taskId];

        const newColumns = { ...state.columns };
        if (newColumns[columnId]) {
          newColumns[columnId] = {
            ...newColumns[columnId],
            taskIds: newColumns[columnId].taskIds.filter(id => id !== taskId),
          };
        }

        return { tasks: newTasks, columns: newColumns };
      });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  moveTask: async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const state = get();
    const startColumn = state.columns[source.droppableId];
    const finishColumn = state.columns[destination.droppableId];

    if (startColumn === finishColumn) {
      const newTaskIds = Array.from(startColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = { ...startColumn, taskIds: newTaskIds };
      set(state => ({
        columns: { ...state.columns, [newColumn.id]: newColumn }
      }));
      return;
    }

    // Moving between columns
    const startTaskIds = Array.from(startColumn.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = { ...startColumn, taskIds: startTaskIds };

    const finishTaskIds = Array.from(finishColumn.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = { ...finishColumn, taskIds: finishTaskIds };

    // Update status in DB
    const task = state.tasks[draggableId];
    const newStatus: TaskStatus = destination.droppableId === 'backlog' ? 'todo' : (destination.droppableId as TaskStatus);
    const updatedTask = { ...task, status: newStatus, updatedAt: new Date() };

    try {
      await taskRepo.update(updatedTask);
      set(state => ({
        tasks: { ...state.tasks, [draggableId]: updatedTask },
        columns: {
          ...state.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish,
        },
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },
}));
