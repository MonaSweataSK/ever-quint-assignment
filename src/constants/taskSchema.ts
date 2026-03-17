export type FieldType = 'text' | 'textarea' | 'select' | 'date' | 'tags';

export interface FieldDefinition {
  name: string;
  label: string;
  type: FieldType;
  defaultValue: any;
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
}

export const TASK_SCHEMA: FieldDefinition[] = [
  {
    name: 'title',
    label: 'Task Title',
    type: 'text',
    defaultValue: '',
    placeholder: 'What needs to be done?',
    required: true,
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    defaultValue: '',
    placeholder: 'Add some details...',
  },
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    defaultValue: 'todo',
    options: [
      { label: 'To Do', value: 'todo' },
      { label: 'In Progress', value: 'in-progress' },
      { label: 'Done', value: 'done' },
    ],
  },
  {
    name: 'priority',
    label: 'Priority',
    type: 'select',
    defaultValue: 'medium',
    options: [
      { label: 'Low', value: 'low' },
      { label: 'Medium', value: 'medium' },
      { label: 'High', value: 'high' },
    ],
  },
  {
    name: 'assignee',
    label: 'Assignee',
    type: 'text',
    defaultValue: '',
    placeholder: 'Who is responsible?',
  },
  {
    name: 'category',
    label: 'Category',
    type: 'text',
    defaultValue: 'General',
    placeholder: 'e.g. Work, Personal',
  },
  {
    name: 'dueDate',
    label: 'Due Date',
    type: 'date',
    defaultValue: '',
  },
  {
    name: 'tags',
    label: 'Tags',
    type: 'tags',
    defaultValue: [],
  }
];

export const getInitialTaskState = () => {
  return TASK_SCHEMA.reduce((acc, field) => {
    acc[field.name] = field.defaultValue;
    return acc;
  }, {} as any);
};
