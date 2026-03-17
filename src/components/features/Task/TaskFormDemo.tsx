import React, { useState } from 'react';
import TaskForm from './TaskForm';
import Modal from '../../ui/Modal/Modal';
import Button from '../../ui/Button/Button';
import type { Task } from '../../../types/Task.type';

const TaskFormDemo: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTask, setActiveTask] = useState<Partial<Task> | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [submittedData, setSubmittedData] = useState<{ mode: string; data: Omit<Task, 'id' | 'updatedAt' | 'createdAt'> } | null>(null);

  const handleOpenCreate = () => {
    setActiveTask(null);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleOpenEdit = () => {
    setActiveTask(sampleTask);
    setIsEditing(false); // Start in view mode
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (data: Omit<Task, 'id' | 'updatedAt' | 'createdAt'>) => {
    console.log('Task Submitted:', data);
    setSubmittedData({ mode: activeTask ? 'Edit' : 'Create', data });
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    console.log('Task Deleted');
    setIsModalOpen(false);
    setSubmittedData(null);
  };

  const sampleTask: Partial<Task> = {
    title: 'Implement Authentication',
    description: 'Set up JWT authentication for the backend and frontend.',
    status: 'in-progress',
    priority: 'high',
    assignee: 'Senthil Kumar',
    dueDate: new Date(),
    tags: ['backend', 'security'],
  };

  const headerActions = (
    <div className="flex items-center gap-1">
      {activeTask && !isEditing && (
        <button
          onClick={() => setIsEditing(true)}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          title="Edit Task"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>
      )}
      {activeTask && (
        <button
          onClick={handleDelete}
          disabled={isEditing}
          className={`p-2 transition-colors rounded-lg ${
            isEditing 
              ? 'text-gray-300 cursor-not-allowed' 
              : 'text-red-600 hover:bg-red-50'
          }`}
          title={isEditing ? "Cannot delete while editing" : "Delete Task"}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      )}
    </div>
  );

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-12 bg-gray-50 min-h-screen">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Task Form Demo</h1>
        <p className="text-gray-500 text-lg">
          The task form is now seamlessly integrated into the right-slider modal.
        </p>
      </header>

      <section className="flex flex-wrap gap-4 p-8 bg-white rounded-2xl border border-gray-100 shadow-sm justify-center">
        <Button
          label="Create New Task"
          variant="primary"
          onClick={handleOpenCreate}
          size="lg"
          leftIcon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          }
        />
        <Button
          label="View/Edit Sample Task"
          variant="secondary"
          onClick={handleOpenEdit}
          size="lg"
          leftIcon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          }
        />
      </section>

      {submittedData && (
        <section className="mt-8 p-6 bg-white rounded-xl border-l-4 border-green-500 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900">Last Submission: {submittedData.mode}</h3>
          </div>
          <pre className="bg-gray-900 text-blue-300 p-4 rounded-lg overflow-auto text-sm font-mono max-h-[400px]">
            {JSON.stringify(submittedData.data, null, 2)}
          </pre>
        </section>
      )}

      {/* Right Slider Modal containing the TaskForm */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleClose}
        position="right"
        dimensions="md"
        title={!activeTask ? 'Create Task' : isEditing ? 'Edit Task' : 'Task Details'}
        headerActions={headerActions}
        noPadding
      >
        <TaskForm
          initialTask={activeTask || undefined}
          isEditing={isEditing}
          onSubmit={handleSubmit}
          onCancel={activeTask ? () => setIsEditing(false) : handleClose}
          className="border-none shadow-none rounded-none"
        />
      </Modal>
    </div>
  );
};

export default TaskFormDemo;
