import { taskRepo } from './repositories/TaskRepository';
import type { Task } from '../types/Task.type';
import { TASK_SCHEMA, getInitialTaskState } from '../constants/taskSchema';
import { getDB } from './core/db';

const SCHEMA_HASH_ID = 'automatedSchemaHash';

/**
 * Normalizes a task by merging it with the latest schema defaults.
 */
const normalizeTask = (task: Record<string, unknown>): Task => {
  const defaults = getInitialTaskState();
  return {
    ...defaults,
    ...task,
    dueDate: task.dueDate ? new Date(task.dueDate as string) : undefined,
    tags: Array.isArray(task.tags) ? task.tags : [],
  } as Task;
};

/**
 * Automagically migrates tasks whenever the TASK_SCHEMA constant changes.
 * Stores the hash in IndexedDB for cross-device/sync persistence.
 */
export const checkAndMigrate = async (): Promise<boolean> => {
  const db = await getDB();
  
  // 1. Get current hash
  const currentSchemaHash = btoa(JSON.stringify(TASK_SCHEMA));
  
  // 2. Get stored hash from DB
  const storedSetting = await db.get('settings', SCHEMA_HASH_ID);
  const storedSchemaHash = storedSetting?.value;
  
  // If the schema hasn't changed, no need to migrate
  if (currentSchemaHash === storedSchemaHash) return false;
  
  console.log('Schema change detected. Running automated migration...');
  
  const allTasks = await taskRepo.getAll();
  const migrated: Task[] = [];

  for (const task of allTasks) {
    const normalized = normalizeTask(task as unknown as Record<string, unknown>);
    migrated.push(normalized);
  }

  // write back normalized tasks
  for (const task of migrated) {
    await taskRepo.update(task);
  }

  // update the stored hash in DB
  await db.put('settings', { id: SCHEMA_HASH_ID, value: currentSchemaHash });
  
  // Clean up old localStorage hash if it exists
  localStorage.removeItem('automatedSchemaHash');
  
  return true;
};
