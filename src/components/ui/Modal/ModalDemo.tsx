import React, { useState } from 'react';
import Modal from './Modal';
import Button from '../Button/Button';
import Select from '../Select/Select';
import Input from '../Input/Input';
import type { ModalDimensions, ModalPosition } from '../../../types/Modal.type';

type ModalContent = 'default' | 'task';

export const ModalDemo: React.FC = () => {
  const [activeModal, setActiveModal] = useState<{
    isOpen: boolean;
    dimensions: ModalDimensions;
    position: ModalPosition;
    content: ModalContent;
    title: string;
  } | null>(null);

  const openModal = (
    dimensions: ModalDimensions = 'md',
    position: ModalPosition = 'center',
    content: ModalContent = 'default',
    title?: string,
  ) => {
    setActiveModal({
      isOpen: true,
      dimensions,
      position,
      content,
      title: title || `${dimensions.toUpperCase()} Modal at ${position.toUpperCase()}`,
    });
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  // Sample data for the New Task form
  const projectOptions = [
    { label: 'Freshdesk', value: 'freshdesk' },
    { label: 'Freshsales', value: 'freshsales' },
    { label: 'Freshservice', value: 'freshservice' },
  ];

  const taskTypeOptions = [
    { label: 'Task', value: 'task' },
    { label: 'Bug', value: 'bug' },
    { label: 'Story', value: 'story' },
    { label: 'Epic', value: 'epic' },
  ];

  const priorityOptions = [
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' },
    { label: 'Critical', value: 'critical' },
  ];

  const assigneeOptions = [
    { label: 'Alice Johnson', value: 'alice' },
    { label: 'Bob Smith', value: 'bob' },
    { label: 'Charlie Davis', value: 'charlie' },
  ];

  const storyPointOptions = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '5', value: '5' },
    { label: '8', value: '8' },
    { label: '13', value: '13' },
  ];

  const epicOptions = [
    { label: 'Lookup API is not returning...', value: 'epic-1' },
    { label: 'Contacts total count is mism...', value: 'epic-2' },
    { label: 'Availability API Returning wr...', value: 'epic-3' },
    { label: 'Kryptonians API fix 4 - feb 25', value: 'epic-4' },
    { label: 'Company create and validati...', value: 'epic-5' },
    { label: 'Automatic ticket assignment...', value: 'epic-6' },
  ];

  const subprojectOptions = [
    { label: 'Frontend', value: 'frontend' },
    { label: 'Backend', value: 'backend' },
    { label: 'Infrastructure', value: 'infra' },
  ];

  const sprintOptions = [
    { label: 'Sprint 1 - March', value: 'sprint-1' },
    { label: 'Sprint 2 - April', value: 'sprint-2' },
    { label: 'Sprint 3 - May', value: 'sprint-3' },
  ];

  // Default modal content
  const renderDefaultContent = () => (
    <div className="space-y-4">
      <p className="text-gray-600">
        This is a standard modal component. It supports focus trapping, backdrop dismissal, 
        and smooth animations built with Tailwind CSS.
      </p>
      <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 italic text-sm text-gray-500">
        "Design is not just what it looks like and feels like. Design is how it works." — Steve Jobs
      </div>
      <div className="pt-4 flex justify-end gap-3">
        <Button label="Cancel" variant="secondary" size="sm" onClick={closeModal} />
        <Button label="Confirm Action" variant="primary" size="sm" onClick={closeModal} />
      </div>
    </div>
  );

  // New Task form content
  const renderTaskContent = () => (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      <div className="grid grid-cols-2 gap-4">
        <Select label="Project" options={projectOptions} defaultValue="freshdesk" placeholder="Select project" />
        <Select label="Task Type" options={taskTypeOptions} defaultValue="task" placeholder="Select type" />
      </div>

      <Input label="Title" required placeholder="" />

      <div className="flex flex-col gap-1.5 w-full">
        <label className="text-sm font-semibold text-gray-700">Description</label>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="flex items-center gap-1 px-3 py-2 border-b border-gray-100 bg-gray-50">
            <button type="button" className="p-1.5 rounded hover:bg-gray-200 text-gray-600 font-bold text-sm transition-colors" title="Bold">B</button>
            <button type="button" className="p-1.5 rounded hover:bg-gray-200 text-gray-600 italic text-sm transition-colors" title="Italic">I</button>
            <button type="button" className="p-1.5 rounded hover:bg-gray-200 text-gray-600 underline text-sm transition-colors" title="Underline">U</button>
            <div className="w-px h-4 bg-gray-300 mx-1" />
            <button type="button" className="p-1.5 rounded hover:bg-gray-200 text-gray-600 text-sm transition-colors" title="Attach">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </button>
          </div>
          <textarea
            className="w-full px-3 py-2.5 text-sm resize-none focus:outline-none placeholder:text-gray-400 min-h-[80px]"
            placeholder="Type something..."
          />
        </div>
      </div>

      <Select label="Priority" options={priorityOptions} placeholder="Select priority" />
      <Select label="Assignee" options={assigneeOptions} placeholder="Select assignee" searchable />
      <Select label="Story points" options={storyPointOptions} placeholder="Select points" />
      <Input label="Start date" type="date" />
      <Select label="Epic" options={epicOptions} placeholder="Select epic" searchable />
      <Input label="End date" type="date" />
      <Select label="Subproject" options={subprojectOptions} placeholder="Select subproject" />
      <Select label="Sprint" options={sprintOptions} placeholder="Select sprint" />

      <div className="pt-2 flex justify-end gap-3 border-t border-gray-100 mt-6">
        <Button label="Cancel" variant="secondary" size="sm" onClick={closeModal} />
        <Button label="Create Task" variant="primary" size="sm" onClick={closeModal} />
      </div>
    </form>
  );

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mt-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Modal Component Showcase</h2>

      <div className="space-y-8">
        {/* Sizes */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Responsive Sizes</h3>
          <div className="flex flex-wrap gap-4 items-center">
            <Button label="Small Modal" variant="secondary" onClick={() => openModal('sm')} />
            <Button label="Medium Modal" variant="secondary" onClick={() => openModal('md')} />
            <Button label="Large Modal" variant="secondary" onClick={() => openModal('lg')} />
            <Button label="Full Screenish" variant="secondary" onClick={() => openModal('full')} />
          </div>
        </div>

        {/* Positions */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Flexible Positioning</h3>
          <div className="flex flex-wrap gap-4 items-center">
            <Button label="Center Positioned" variant="primary" onClick={() => openModal('md', 'center')} />
            <Button label="Top Positioned" variant="primary" onClick={() => openModal('md', 'top')} />
            <Button label="Left Side" variant="primary" onClick={() => openModal('md', 'left')} />
            <Button label="Right Side" variant="primary" onClick={() => openModal('md', 'right')} />
            <Button label="Full Screen (Left)" variant="primary" onClick={() => openModal('full', 'left')} />
          </div>
        </div>

        {/* Side-sticking New Task Modal */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Side Panel — Form Modal</h3>
          <div className="flex flex-wrap gap-4 items-center">
            <Button label="New Task (Side Panel)" variant="primary" onClick={() => openModal('lg', 'right', 'task', 'New Task')} />
          </div>
        </div>
      </div>

      {/* Single reusable Modal instance */}
      {activeModal && (
        <Modal
          isOpen={activeModal.isOpen}
          onClose={closeModal}
          dimensions={activeModal.dimensions}
          position={activeModal.position}
          title={activeModal.title}
        >
          {activeModal.content === 'task' ? renderTaskContent() : renderDefaultContent()}
        </Modal>
      )}
    </section>
  );
};

export default ModalDemo;
