export type TaskStatus = 'todo' | 'in-progress' | 'done';
export type TaskPriority = 'high' | 'medium' | 'low';

/**
 * Full Task domain model – represents the complete schema.
 */
export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: Date;
  assignee: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}

/**
 * Props for the TaskCard component.
 * Picks only the fields the card actually renders, plus component-specific props.
 */
export interface TaskCardProps
  extends Pick<Task, 'id' | 'title' | 'status' | 'priority' | 'assignee' | 'tags' | 'dueDate' | 'updatedAt'> {
  /** Additional CSS classes */
  className?: string;
  /** Callback when the card is clicked. Second param is true if editing is requested. */
  onClick?: (id: string, isEditing?: boolean) => void;
}
