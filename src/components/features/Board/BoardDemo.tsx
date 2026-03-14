import React from 'react';
import Board from './Board';
import type { BoardData } from './type';

const initialBoardData: BoardData = {
  tasks: {
    'task-1': {
      id: 'task-1',
      title: 'Setup Project Boilerplate',
      description: 'Initialize Vite project and install basic dependencies.',
      status: 'todo',
      priority: 'high',
      dueDate: new Date(),
      assignee: 'Ram',
      createdAt: new Date(),
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2h ago
      tags: ['Project', 'Setup'],
    },
    'task-2': {
      id: 'task-2',
      title: 'Design System Documentation',
      description: 'Document the design tokens and components.',
      status: 'todo',
      priority: 'medium',
      dueDate: new Date(),
      assignee: 'Mona',
      createdAt: new Date(),
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1d ago
      tags: ['Design', 'Docs'],
    },
    'task-3': {
      id: 'task-3',
      title: 'Implement Auth Flow',
      description: 'Basic login and register screens.',
      status: 'in-progress',
      priority: 'high',
      dueDate: new Date(),
      assignee: 'Shruthi',
      createdAt: new Date(),
      updatedAt: new Date(Date.now() - 1000 * 60 * 45), // 45m ago
      tags: ['Auth', 'Frontend'],
    },
    'task-4': {
      id: 'task-4',
      title: 'Database Schema Design',
      description: 'Plan the relational structure for the backend.',
      status: 'in-progress',
      priority: 'medium',
      dueDate: new Date(),
      assignee: 'Preetha',
      createdAt: new Date(),
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5h ago
      tags: ['Backend', 'Database'],
    },
    'task-5': {
      id: 'task-5',
      title: 'Finalize Deployment Pipeline',
      description: 'Configure CI/CD workflows and automated runs.',
      status: 'done',
      priority: 'low',
      dueDate: new Date(),
      assignee: 'Ram',
      createdAt: new Date(),
      updatedAt: new Date(Date.now() - 1000 * 60 * 15), // 15m ago
      tags: ['DevOps'],
    },
  },
  columns: {
    'backlog': {
      id: 'backlog',
      title: 'Backlog',
      taskIds: ['task-1', 'task-2'],
    },
    'in-progress': {
      id: 'in-progress',
      title: 'In Progress',
      taskIds: ['task-3', 'task-4'],
    },
    'done': {
      id: 'done',
      title: 'Done',
      taskIds: ['task-5'],
    },
  },
  columnOrder: ['backlog', 'in-progress', 'done'],
};

export const BoardDemo: React.FC = () => {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800">Project Board</h2>
        <p className="text-sm text-gray-500 mt-1">
          Manage your tasks across different stages. Drag and drop to update.
        </p>
      </div>

      <Board 
        data={initialBoardData} 
        onDataChange={() => {}}
        searchQuery="" 
        selectedPriorities={[]}
        selectedStatuses={[]}
      />
    </section>
  );
};

export default BoardDemo;
