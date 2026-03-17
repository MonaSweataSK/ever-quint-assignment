import type { Task } from '../types/Task.type';

/**
 * Calculates system-computed tags based on a task's state.
 * These tags are NOT stored in the database but generated on the fly.
 */
export function getSystemTags(task: Task): string[] {
  const systemTags: string[] = [];
  const now = new Date();
  now.setHours(0, 0, 0, 0); // Compare dates only, ignoring time

  const dueDate = new Date(task.dueDate);
  dueDate.setHours(0, 0, 0, 0);

  // 1. Overdue logic (Priority #1)
  if (task.status !== 'done' && dueDate < now) {
    systemTags.push('Overdue');
  } else if (task.status !== 'done') {
    // 2. On Time logic
    systemTags.push('On Time');
  }

  // 3. Not Started logic
  if (task.status === 'todo') {
    systemTags.push('Not Started');
  }

  return systemTags;
}
