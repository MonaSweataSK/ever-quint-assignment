import React, { useState } from 'react';
import Select from './Select';

const priorityOptions = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
];

const statusOptions = [
  { label: 'Backlog', value: 'backlog' },
  { label: 'In Progress', value: 'in_progress' },
  { label: 'Done', value: 'done' },
];

const assigneeOptions = [
  { label: 'Senthi Kumar', value: 'senthi' },
  { label: 'Antigravity AI', value: 'antigravity' },
  { label: 'Jane Doe', value: 'jane' },
  { label: 'John Smith', value: 'john' },
  { label: 'Alice Williams', value: 'alice' },
  { label: 'Bob Johnson', value: 'bob' },
];

export const SelectDemo: React.FC = () => {
  const [priority, setPriority] = useState('medium');

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mt-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Select Component Showcase</h2>

      <div className="space-y-8">
        {/* Basic and States */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Basics & States</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select 
              label="Priority" 
              options={priorityOptions} 
              value={priority} 
              onChange={setPriority} 
            />
            <Select 
              label="Task Status" 
              options={statusOptions} 
              required 
              placeholder="Set current status"
            />
            <Select 
              label="Disabled Select" 
              options={statusOptions} 
              disabled 
              defaultValue="backlog"
            />
            <Select 
              label="Error State" 
              options={priorityOptions} 
              error="Please select a priority for this task"
            />
          </div>
        </div>

        {/* Searchable and Icons */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Advanced Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select 
              label="Assignee (Searchable)" 
              options={assigneeOptions} 
              searchable 
              placeholder="Search members..."
              leftIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              }
            />
            <Select 
              label="Custom Icon" 
              options={priorityOptions} 
              leftIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SelectDemo;
