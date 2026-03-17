import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Home from '../pages/home';
import { useTaskStore } from '../store/taskStore';
import { userRepo } from '../db/repositories/UserRepository';

import { taskRepo } from '../db/repositories/TaskRepository';

// We need to mock the repositories and migration
vi.mock('../db/migration', () => ({
  checkAndMigrate: vi.fn().mockResolvedValue(false),
}));

vi.mock('../db/repositories/TaskRepository', () => ({
  taskRepo: {
    getAll: vi.fn(),
    create: vi.fn().mockResolvedValue('task-1'),
    update: vi.fn().mockResolvedValue(undefined),
  },
}));

// Mock DragDropContext as it's hard to test in RTL without specific setup
vi.mock('@hello-pangea/dnd', () => ({
  DragDropContext: ({ children }: any) => <div>{children}</div>,
  Droppable: ({ children }: any) => children({ draggableProps: {}, innerRef: vi.fn() }, {}),
  Draggable: ({ children }: any) => children({ draggableProps: {}, dragHandleProps: {}, innerRef: vi.fn() }, {}),
}));

describe('Workflow: Task Creation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (taskRepo.getAll as any).mockResolvedValue([]);
    vi.spyOn(userRepo, 'getAll').mockResolvedValue([
      { id: '1', name: 'Ram', email: 'ram@everquint.com', createdAt: new Date() },
      { id: '2', name: 'Mona', email: 'mona@everquint.com', createdAt: new Date() }
    ]);
    // Reset store before each test
    useTaskStore.setState({
      tasks: {},
      columns: {
        'backlog': { id: 'backlog', title: 'Backlog', taskIds: [] },
        'in-progress': { id: 'in-progress', title: 'In Progress', taskIds: [] },
        'done': { id: 'done', title: 'Done', taskIds: [] },
      },
      columnOrder: ['backlog', 'in-progress', 'done'],
    });
  });

  it('should create a new task and show it on the board', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Wait for board to be ready
    await screen.findByText('Backlog');

    // 1. Click New Task button
    const newTaskBtn = screen.getByRole('button', { name: /New Task/i });
    fireEvent.click(newTaskBtn);

    // 2. Fill the form
    const titleInput = screen.getByLabelText(/Title/i);
    const descInput = screen.getByLabelText(/Description/i);
    const submitBtn = screen.getByRole('button', { name: /Create Task/i });

    fireEvent.change(titleInput, { target: { value: 'Test Workflow Task' } });
    fireEvent.change(descInput, { target: { value: 'Successfully created via RTL' } });

    // 3. Submit
    fireEvent.click(submitBtn);

    // 4. Verify it appears on the board
    await waitFor(() => {
      expect(screen.getByText('Test Workflow Task')).toBeInTheDocument();
    });
  });
});
