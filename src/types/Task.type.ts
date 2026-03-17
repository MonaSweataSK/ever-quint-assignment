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
  extends Pick<Task, 'id' | 'title' | 'priority' | 'assignee' | 'tags' | 'updatedAt'> {
  /** Additional CSS classes */
  className?: string;
  /** Callback when the card is clicked. Second param is true if editing is requested. */
  onClick?: (id: string, isEditing?: boolean) => void;
  /** Callback when the delete button is clicked */
  onDelete?: (id: string) => void;
}
