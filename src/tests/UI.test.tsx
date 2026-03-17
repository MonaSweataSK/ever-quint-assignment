import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Home from '../pages/home';
import { useTaskStore } from '../store/taskStore';

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
    'task-1': { id: 'task-1', title: 'High Priority Task', status: 'todo', priority: 'high', description: '', tags: [], createdAt: new Date(), updatedAt: new Date() },
    'task-2': { id: 'task-2', title: 'Low Priority Task', status: 'todo', priority: 'low', description: '', tags: [], createdAt: new Date(), updatedAt: new Date() },
  };

  beforeEach(() => {
    useTaskStore.setState({
      tasks: mockTasks,
      columns: {
        'backlog': { id: 'backlog', title: 'Backlog', taskIds: ['task-1', 'task-2'] },
        'in-progress': { id: 'in-progress', title: 'In Progress', taskIds: [] },
        'done': { id: 'done', title: 'Done', taskIds: [] },
      },
      columnOrder: ['backlog', 'in-progress', 'done'],
    });
  });

  it('should filter tasks by priority', async () => {
    render(<Home />);

    // Initially both tasks are visible
    expect(screen.getByText('High Priority Task')).toBeInTheDocument();
    expect(screen.getByText('Low Priority Task')).toBeInTheDocument();

    // 1. Open Filter
    const filterBtn = screen.getByText('Filter');
    fireEvent.click(filterBtn);

    // 2. Select 'High' priority filter
    // Note: The filter component might render options in a portal or dropdown. 
    // We search for 'High' in the filter popover.
    const highFilter = screen.getByLabelText(/High/i);
    fireEvent.click(highFilter);

    // 3. Verify 'Low Priority Task' is hidden
    expect(screen.getByText('High Priority Task')).toBeInTheDocument();
    expect(screen.queryByText('Low Priority Task')).not.toBeInTheDocument();
  });

  it('should show all tasks when clearing filters', async () => {
    render(<Home />);

    const filterBtn = screen.getByText('Filter');
    fireEvent.click(filterBtn);

    const highFilter = screen.getByLabelText(/High/i);
    fireEvent.click(highFilter);

    expect(screen.queryByText('Low Priority Task')).not.toBeInTheDocument();

    // Clear filters
    const clearBtn = screen.getByText(/Clear All/i);
    fireEvent.click(clearBtn);

    expect(screen.getByText('Low Priority Task')).toBeInTheDocument();
    expect(screen.getByText('High Priority Task')).toBeInTheDocument();
  });
});
