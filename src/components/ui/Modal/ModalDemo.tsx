import React, { useState } from 'react';
import Modal from './Modal';
import Button from '../Button/Button';
import type { ModalDimensions, ModalPosition } from './type';

export const ModalDemo: React.FC = () => {
  const [activeModal, setActiveModal] = useState<{ isOpen: boolean; dimensions: ModalDimensions; position: ModalPosition } | null>(null);

  const openModal = (dimensions: ModalDimensions = 'md', position: ModalPosition = 'center') => {
    setActiveModal({ isOpen: true, dimensions, position });
  };

  const closeModal = () => {
    setActiveModal(null);
  };

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
      </div>

      {/* Actual Modal Instance */}
      {activeModal && (
        <Modal
          isOpen={activeModal.isOpen}
          onClose={closeModal}
          dimensions={activeModal.dimensions}
          position={activeModal.position}
          title={`${activeModal.dimensions.toUpperCase()} Modal at ${activeModal.position.toUpperCase()}`}
        >
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
        </Modal>
      )}
    </section>
  );
};

export default ModalDemo;
