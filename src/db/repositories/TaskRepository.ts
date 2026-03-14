import { Repository } from '../core/Repository';
import type { Task, TaskStatus, TaskPriority } from '../../types/Task.type';

export class TaskRepository extends Repository<Task, 'tasks'> {
  constructor() {
    super('tasks');
  }

  async getByStatus(status: TaskStatus): Promise<Task[]> {
    const db = await this.getDB();
    return db.getAllFromIndex('tasks', 'by-status', status);
  }

  async getByPriority(priority: TaskPriority): Promise<Task[]> {
    const db = await this.getDB();
    return db.getAllFromIndex('tasks', 'by-priority', priority);
  }

  async getByAssignee(assigneeId: string): Promise<Task[]> {
    const db = await this.getDB();
    return db.getAllFromIndex('tasks', 'by-assignee', assigneeId);
  }

  /**
   * Advanced query: Get tasks with populated tags and assignee info could be done here
   * but for now, we keep it simple as per standard repository pattern.
   */
}

export const taskRepo = new TaskRepository();
