import React, { useState, useEffect } from 'react';
import { taskRepo } from '../../../db/repositories/TaskRepository';
import { userRepo } from '../../../db/repositories/UserRepository';
import { tagRepo } from '../../../db/repositories/TagRepository';
import type { Task } from '../../../types/Task.type';
import type { User } from '../../../types/User.type';
import type { Tag } from '../../../types/Tag.type';
import Button from '../../ui/Button/Button';

/**
 * A playground for testing the IndexedDB ORM and repository layer.
 * Allows running automated tests and manual database clearing.
 */
export const Playground: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [stats, setStats] = useState({ tasks: 0, users: 0, tags: 0 });

  const log = (msg: string) => {
    setLogs((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev]);
  };

  const updateStats = async () => {
    const tCount = await taskRepo.count();
    const uCount = await userRepo.count();
    const tagCount = await tagRepo.count();
    setStats({ tasks: tCount, users: uCount, tags: tagCount });
  };

  useEffect(() => {
    updateStats();
  }, []);

  const runTest = async () => {
    try {
      log('Starting IDB ORM Test...');

      const priorities: Task['priority'][] = ['low', 'medium', 'high'];
      const statuses: Task['status'][] = ['todo', 'in-progress', 'done'];
      const randomNames = ['Alice', 'Bob', 'Charlie', 'Diana', 'Ethan', 'Fiona'];
      const randomTasks = [
        'Research new UI trends',
        'Fix production bug #102',
        'Update documentation',
        'Internal meeting preparation',
        'Optimize database queries',
        'Design new landing page',
        'Review pull requests',
        'Implement security patches'
      ];
      const randomTags = ['Urgent', 'Low Priority', 'Feature', 'Bug', 'Internal', 'Client', 'Refactor'];

      // 1. Create User
      const userId = `user-${Date.now()}`;
      const randomName = randomNames[Math.floor(Math.random() * randomNames.length)];
      const user: User = {
        id: userId,
        name: randomName,
        email: `${randomName.toLowerCase()}-${Date.now()}@example.com`,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await userRepo.create(user);
      log(`User created: ${user.name}`);

      // 2. Create Tag
      const tagId = `tag-${Date.now()}`;
      const randomTagName = randomTags[Math.floor(Math.random() * randomTags.length)];
      const tag: Tag = {
        id: tagId,
        name: `${randomTagName}-${Math.floor(Math.random() * 1000)}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await tagRepo.create(tag);
      log(`Tag created: ${tag.name}`);

      // 3. Create Task
      const randomTitle = randomTasks[Math.floor(Math.random() * randomTasks.length)];
      const task: Task = {
        id: `task-${Date.now()}`,
        title: randomTitle,
        description: `Description for ${randomTitle.toLowerCase()}`,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        priority: priorities[Math.floor(Math.random() * priorities.length)],
        dueDate: new Date(Date.now() + Math.random() * 86400000 * 7), // within 7 days
        assignee: userId,
        category: 'Testing',
        tags: [tagId],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await taskRepo.create(task);
      log(`Task created: ${task.title} (${task.priority})`);

      await updateStats();
      log('Test completed successfully!');
    } catch (err) {
      log(`ERR: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const clearDB = async () => {
    await taskRepo.clear();
    await userRepo.clear();
    await tagRepo.clear();
    log('Database cleared.');
    await updateStats();
  };

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 leading-tight tracking-tight italic">Storage Playground</h2>
        <div className="flex gap-2">
          <Button onClick={runTest} variant="primary" label="Run Test" />
          <Button onClick={clearDB} variant="secondary" label="Clear Data" className="text-red-600 border-red-100 hover:bg-red-50" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Tasks', count: stats.tasks },
          { label: 'Users', count: stats.users },
          { label: 'Tags', count: stats.tags },
        ].map((s) => (
          <div key={s.label} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-center">
            <div className="text-2xl font-black text-indigo-600">{s.count}</div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-gray-900 rounded-2xl p-6 font-mono text-sm overflow-hidden border border-gray-800 shadow-2xl">
        <div className="flex items-center justify-between mb-4 border-b border-gray-800 pb-4">
            <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/30"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/30"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/30"></div>
            </div>
            <span className="text-gray-500 text-[10px] uppercase font-black tracking-widest">Repository Logs</span>
        </div>
        <div className="space-y-2 h-[300px] overflow-y-auto custom-scrollbar">
          {logs.map((l, i) => (
            <div key={i} className="text-indigo-300 flex gap-2">
              <span className="text-gray-600 shrink-0">{'>'}</span>
              <span className="break-all">{l}</span>
            </div>
          ))}
          {logs.length === 0 && <div className="text-gray-600 italic">No activity yet. Click 'Run Test' to begin.</div>}
        </div>
      </div>
    </div>
  );
};

export default Playground;
