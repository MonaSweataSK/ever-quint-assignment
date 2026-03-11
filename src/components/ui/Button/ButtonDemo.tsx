import React from 'react';
import Button from './Button';

/**
 * A component to showcase and test all Button variations.
 */
export const ButtonDemo: React.FC = () => {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Button Component Showcase</h2>

      <div className="space-y-8">
        {/* Variants */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Variants</h3>
          <div className="flex flex-wrap gap-4 items-center">
            <Button label="Primary Button" variant="primary" />
            <Button label="Secondary Button" variant="secondary" />
            <Button label="Destructive Button" variant="destructive" />
            <Button label="Disabled Button" variant="primary" disabled />
          </div>
        </div>

        {/* Sizes */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Sizes</h3>
          <div className="flex flex-wrap gap-4 items-end">
            <Button label="Small" size="sm" />
            <Button label="Medium (Default)" size="md" />
            <Button label="Large" size="lg" />
          </div>
        </div>

        {/* Loading States */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Loading States</h3>
          <div className="flex flex-wrap gap-4 items-center">
            <Button label="Processing" variant="primary" loading />
            <Button label="Saving" variant="secondary" loading />
            <Button label="Deleting" variant="destructive" loading />
          </div>
        </div>

        {/* Icon Support */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Icon Support</h3>
          <div className="flex flex-wrap gap-4 items-center">
            <Button
              label="Add Task"
              variant="primary"
              leftIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              }
            />
            <Button
              label="Next Step"
              variant="secondary"
              rightIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              }
            />
            <Button
              label="Delete"
              variant="destructive"
              leftIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ButtonDemo;
