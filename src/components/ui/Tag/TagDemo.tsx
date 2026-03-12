import React from 'react';
import Tag from './Tag';

export const TagDemo: React.FC = () => {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mt-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Tag Component Showcase</h2>

      <div className="space-y-8">
        {/* Semantic Variants */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Semantic Variants</h3>
          <div className="flex flex-wrap gap-3 items-center">
            <Tag label="Primary" variant="primary" />
            <Tag label="Success" variant="success" />
            <Tag label="Warning" variant="warning" />
            <Tag label="Error" variant="error" />
            <Tag label="Info" variant="info" />
            <Tag label="Gray" variant="gray" />
          </div>
        </div>

        {/* With Dots */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">With Status Dot</h3>
          <div className="flex flex-wrap gap-3 items-center">
            <Tag label="Active" variant="success" dot />
            <Tag label="Pending" variant="warning" dot />
            <Tag label="Blocked" variant="error" dot />
            <Tag label="In Progress" variant="primary" dot />
            <Tag label="Archived" variant="gray" dot />
          </div>
        </div>

        {/* Sizes */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Sizes</h3>
          <div className="flex flex-wrap gap-3 items-end">
            <Tag label="Small Tag" size="sm" variant="info" dot />
            <Tag label="Medium Tag" size="md" variant="info" dot />
            <Tag label="Large Tag" size="lg" variant="info" dot />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TagDemo;
