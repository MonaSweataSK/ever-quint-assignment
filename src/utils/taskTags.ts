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

  // 1. Done status (Mutually exclusive with Overdue/On Time)
  if (task.status === 'done') {
    systemTags.push('Done');
  } else {
    // 2. Overdue logic (Priority #1 for active tasks)
    if (dueDate < now) {
      systemTags.push('Overdue');
    } else {
      // 3. On Time logic (Exclude for 'todo' backlog items)
      if (task.status !== 'todo') {
        systemTags.push('On Time');
      }
    }
  }

  // 4. Not Started logic
  if (task.status === 'todo') {
    systemTags.push('Not Started');
  }

  return systemTags;
}
