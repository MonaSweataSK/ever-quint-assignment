import React from 'react';
import TaskCard from './TaskCard';
import type { TaskPriority } from './type';

/** Sample task data for the demo */
const sampleTasks: {
  id: string;
  title: string;
  priority: TaskPriority;
  assignee: string;
  tags: string[];
  updatedAt: Date;
}[] = [
  {
    id: 'TASK-101',
    title: 'Design the new onboarding flow for mobile users',
    priority: 'high',
    assignee: 'Ram',
    tags: ['Design', 'Mobile', 'UX'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 35), // 35 minutes ago
  },
  {
    id: 'TASK-102',
    title: 'Set up CI/CD pipeline with GitHub Actions',
    priority: 'medium',
    assignee: 'Mona',
    tags: ['DevOps', 'Infra'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
  },
  {
    id: 'TASK-103',
    title: 'Write unit tests for the authentication service',
    priority: 'low',
    assignee: 'Shruthi',
    tags: ['Testing', 'Backend'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
  },
  {
    id: 'TASK-104',
    title: 'Migrate legacy API endpoints to v2',
    priority: 'high',
    assignee: 'Preetha',
    tags: ['API', 'Migration'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12), // 12 days ago
  },
];

export const TaskCardDemo: React.FC = () => {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Task Card Component Showcase
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sampleTasks.map((task) => (
          <TaskCard key={task.id} {...task} />
        ))}
      </div>
    </section>
  );
};

export default TaskCardDemo;
