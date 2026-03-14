import React, { useState } from 'react';
import type { Task, TaskStatus, TaskPriority } from './type';
import Input from '../../ui/Input/Input';
import Select from '../../ui/Select/Select';
import Button from '../../ui/Button/Button';
import TagEditor from '../../ui/TagEditor/TagEditor';

interface TaskFormProps {
  /** Existing task to edit, if any */
  initialTask?: Partial<Task>;
  /** Whether the form is in editing mode */
  isEditing?: boolean;
  /** Callback when the form is submitted */
  onSubmit: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  /** Callback when the form is cancelled */
  onCancel?: () => void;
  /** Whether the form is in a loading state */
  loading?: boolean;
  /** Optional CSS classes */
  className?: string;
}

const statusOptions = [
  { label: 'To Do', value: 'todo' },
  { label: 'In Progress', value: 'in-progress' },
  { label: 'Done', value: 'done' },
];

const priorityOptions = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
];

export const TaskForm: React.FC<TaskFormProps> = ({
  initialTask,
  isEditing = !initialTask,
  onSubmit,
  onCancel,
  loading = false,
  className = '',
}) => {
  const [formData, setFormData] = useState({
    title: initialTask?.title || '',
    description: initialTask?.description || '',
    status: (initialTask?.status || 'todo') as TaskStatus,
    priority: (initialTask?.priority || 'medium') as TaskPriority,
    assignee: initialTask?.assignee || '',
    dueDate: initialTask?.dueDate ? new Date(initialTask.dueDate).toISOString().split('T')[0] : '',
    tags: initialTask?.tags || [] as string[],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagsChange = (tags: string[]) => {
    setFormData((prev) => ({ ...prev, tags }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        title: formData.title,
        description: formData.description,
        status: formData.status,
        priority: formData.priority,
        assignee: formData.assignee,
        dueDate: new Date(formData.dueDate),
        tags: formData.tags,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`p-6 space-y-8 ${className}`}>
      <div className="space-y-6">
        <Input
          label="Task Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="What needs to be done?"
          required
          error={errors.title}
          disabled={!isEditing}
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Add some details..."
            rows={6}
            disabled={!isEditing}
            className={`w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm ring-offset-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 ${!isEditing ? 'bg-gray-50 text-gray-500 cursor-not-allowed border-gray-100' : ''}`}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Status"
            options={statusOptions}
            value={formData.status}
            onChange={(val) => handleSelectChange('status', val)}
            disabled={!isEditing}
          />
          <Select
            label="Priority"
            options={priorityOptions}
            value={formData.priority}
            onChange={(val) => handleSelectChange('priority', val)}
            disabled={!isEditing}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Assignee"
            name="assignee"
            value={formData.assignee}
            onChange={handleChange}
            placeholder="Who is responsible?"
            disabled={!isEditing}
          />
          <Input
            label="Due Date"
            name="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        <TagEditor
          label="Tags"
          tags={formData.tags}
          onChange={handleTagsChange}
          placeholder="Add tags..."
          disabled={!isEditing}
        />
      </div>

      {isEditing && (
        <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-100">
          {(onCancel || initialTask) && (
            <Button
              label="Cancel"
              variant="secondary"
              onClick={onCancel}
              disabled={loading}
            />
          )}
          <Button
            label={initialTask ? 'Update Task' : 'Create Task'}
            variant="primary"
            onClick={() => {}} // Form submit handles this
            loading={loading}
            disabled={loading}
            className="px-8"
          />
        </div>
      )}
    </form>
  );
};

export default TaskForm;
