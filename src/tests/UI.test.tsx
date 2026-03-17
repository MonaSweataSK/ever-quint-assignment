import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Home from '../pages/home';
import { taskRepo } from '../db/repositories/TaskRepository';

// Mocks
vi.mock('../db/migration', () => ({
  checkAndMigrate: vi.fn().mockResolvedValue(false),
}));

vi.mock('../db/repositories/TaskRepository', () => ({
  taskRepo: {
    getAll: vi.fn(),
  },
}));

vi.mock('@hello-pangea/dnd', () => ({
  DragDropContext: ({ children }: any) => <div>{children}</div>,
  Droppable: ({ children }: any) => children({ draggableProps: {}, innerRef: vi.fn() }, {}),
  Draggable: ({ children }: any) => children({ draggableProps: {}, dragHandleProps: {}, innerRef: vi.fn() }, {}),
}));

describe('UI Behavior: Task Filtering', () => {
  const mockTasks = {
    'task-1': { id: 'task-1', title: 'High Priority Task', status: 'todo' as const, priority: 'high' as const, description: '', tags: [], category: 'Work', assignee: 'User 1', dueDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
    'task-2': { id: 'task-2', title: 'Low Priority Task', status: 'todo' as const, priority: 'low' as const, description: '', tags: [], category: 'Personal', assignee: 'User 2', dueDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (taskRepo.getAll as any).mockResolvedValue(Object.values(mockTasks));
  });

  it('should filter tasks by priority', async () => {
    render(<Home />);

    // Wait for tasks to load
    await screen.findByText('High Priority Task');
    expect(screen.getByText('Low Priority Task')).toBeInTheDocument();

    // 1. Open Filter
    const filterBtn = screen.getByRole('button', { name: /Filter/i });
    fireEvent.click(filterBtn);

    // 2. Select 'High' priority filter button
    const highFilter = screen.getByRole('button', { name: /^High$/i });
    fireEvent.click(highFilter);

    // 3. Verify 'Low Priority Task' is hidden
    await waitFor(() => {
      expect(screen.queryByText('Low Priority Task')).not.toBeInTheDocument();
    });
    expect(screen.getByText('High Priority Task')).toBeInTheDocument();
  });

  it('should show all tasks when clearing filters', async () => {
    render(<Home />);

    await screen.findByText('High Priority Task');

    const filterBtn = screen.getByRole('button', { name: /Filter/i });
    fireEvent.click(filterBtn);

    const highFilter = screen.getByRole('button', { name: /^High$/i });
    fireEvent.click(highFilter);

    await waitFor(() => {
      expect(screen.queryByText('Low Priority Task')).not.toBeInTheDocument();
    });

    // Clear filters
    const clearBtn = screen.getByRole('button', { name: /Clear All/i });
    fireEvent.click(clearBtn);

    await waitFor(() => {
      expect(screen.getByText('Low Priority Task')).toBeInTheDocument();
    });
    expect(screen.getByText('High Priority Task')).toBeInTheDocument();
  });
});
