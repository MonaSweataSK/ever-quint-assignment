import React, { useState, useEffect } from 'react';
import type { Task } from '../../../types/Task.type';
import type { User } from '../../../types/User.type';
import { userRepo } from '../../../db/repositories/UserRepository';
import Input from '../../ui/Input/Input';
import Select from '../../ui/Select/Select';
import TagEditor from '../../ui/TagEditor/TagEditor';
import Form from '../../ui/Form/Form';
import FormField from '../../ui/Form/FormField';
import { TASK_SCHEMA, getInitialTaskState } from '../../../constants/taskSchema';

interface TaskFormProps {
  initialTask?: Partial<Task>;
  onSubmit: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel?: () => void;
  isEditing?: boolean;
  loading?: boolean;
  className?: string;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  initialTask,
  onSubmit,
  onCancel,
  isEditing: initialIsEditing = !initialTask,
  loading = false,
  className = '',
}) => {
  const [isEditing, setIsEditing] = useState(initialIsEditing);
  const [users, setUsers] = useState<User[]>([]);
  
  // Sync with prop if it changes from outside
  useEffect(() => {
    setIsEditing(initialIsEditing);
  }, [initialIsEditing]);

  // Fetch users for the assignee dropdown
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await userRepo.getAll();
        setUsers(allUsers);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      }
    };
    fetchUsers();
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<any>(() => {
    const initialState = getInitialTaskState();
    if (initialTask) {
      return {
        ...initialState,
        ...initialTask,
        dueDate: initialTask.dueDate ? new Date(initialTask.dueDate).toISOString().split('T')[0] : '',
      };
    }
    return initialState;
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev: any) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    TASK_SCHEMA.forEach(field => {
      if (field.required && !formData[field.name]?.toString().trim()) {
        newErrors[field.name] = `${field.label} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const taskData = {
        ...formData,
        dueDate: formData.dueDate ? new Date(formData.dueDate) : undefined,
      };

      await onSubmit(taskData as Omit<Task, 'id' | 'updatedAt' | 'createdAt'>);
    } catch (error) {
      console.error('Failed to save task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field: any) => {
    const commonProps = {
      name: field.name,
      id: field.name,
      value: formData[field.name] || '',
      onChange: handleChange,
      disabled: !isEditing,
      placeholder: field.placeholder,
    };

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            {...commonProps}
            id={field.name}
            rows={4}
            className={`w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm ring-offset-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 ${!isEditing ? 'bg-gray-50 text-gray-500 cursor-not-allowed border-gray-100' : ''}`}
          />
        );
      case 'select':
        return (
          <Select
            {...commonProps}
            onChange={(val) => handleSelectChange(field.name, val)}
            options={field.options || []}
          />
        );
      case 'date':
        return <Input {...commonProps} type="date" />;
      case 'tags':
        return (
          <TagEditor
            tags={formData.tags || []}
            onChange={(tags) => setFormData((prev: any) => ({ ...prev, tags }))}
            disabled={!isEditing}
          />
        );
      default:
        if (field.name === 'assignee') {
          return (
            <Select
              {...commonProps}
              onChange={(val) => handleSelectChange(field.name, val)}
              options={[
                { label: 'Unassigned', value: '' },
                ...users.map(u => ({ label: u.name, value: u.name }))
              ]}
            />
          );
        }
        return <Input {...commonProps} />;
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      onCancel={onCancel}
      submitLabel={initialTask ? 'Update Task' : 'Create Task'}
      loading={isSubmitting || loading}
      isEditing={isEditing}
      onEdit={() => setIsEditing(true)}
      showEditButton={initialTask !== undefined}
      className={className}
    >
      <div className="space-y-6">
        {TASK_SCHEMA.map((field) => (
          <FormField 
            key={field.name} 
            label={field.label} 
            htmlFor={field.name}
            required={field.required}
            error={errors[field.name]}
          >
            {renderField(field)}
          </FormField>
        ))}
      </div>
    </Form>
  );
};

export default TaskForm;
