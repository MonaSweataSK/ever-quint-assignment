import React, { useState } from 'react';
import Toast from './Toast';
import Button from '../Button/Button';
import type { ToastVariant, ToastPosition } from './type';

export const ToastDemo: React.FC = () => {
  const [activeToasts, setActiveToasts] = useState<Array<{ id: number; text: string; variant: ToastVariant; position: ToastPosition }>>([]);

  const addToast = (variant: ToastVariant, position: ToastPosition = 'top-right') => {
    const id = Date.now();
    const texts = {
      success: 'Task successfully created!',
      error: 'Failed to delete the item.',
      warning: 'You have unsaved changes.',
      info: 'Your profile was updated.',
    };
    
    setActiveToasts(prev => [...prev, { id, text: texts[variant], variant, position }]);
  };

  const removeToast = (id: number) => {
    setActiveToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mt-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Toast Component Showcase</h2>

      <div className="space-y-8">
        {/* Semantic Variants */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Trigger Semantic Toasts</h3>
          <div className="flex flex-wrap gap-4 items-center">
            <Button 
              label="Show Success" 
              variant="primary" 
              className="bg-emerald-600 hover:bg-emerald-700" 
              onClick={() => addToast('success')} 
            />
            <Button 
              label="Show Error" 
              variant="destructive" 
              onClick={() => addToast('error')} 
            />
            <Button 
              label="Show Warning" 
              variant="secondary" 
              className="bg-amber-100 text-amber-800 border-amber-200"
              onClick={() => addToast('warning')} 
            />
            <Button 
              label="Show Info" 
              variant="secondary" 
              onClick={() => addToast('info')} 
            />
          </div>
        </div>

        {/* Positions */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Test Positions</h3>
          <div className="flex flex-wrap gap-4 items-center">
            <Button label="Bottom Right" variant="secondary" onClick={() => addToast('info', 'bottom-right')} />
            <Button label="Top Center" variant="secondary" onClick={() => addToast('info', 'top-center')} />
            <Button label="Bottom Center" variant="secondary" onClick={() => addToast('info', 'bottom-center')} />
          </div>
        </div>
      </div>

      {/* Render Active Toasts */}
      {activeToasts.map(toast => (
        <Toast 
          key={toast.id}
          text={toast.text}
          variant={toast.variant}
          position={toast.position}
          onClose={() => removeToast(toast.id)}
          leftIcon={
            toast.variant === 'success' ? (
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            ) : toast.variant === 'error' ? (
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            ) : null
          }
        />
      ))}
    </section>
  );
};

export default ToastDemo;
