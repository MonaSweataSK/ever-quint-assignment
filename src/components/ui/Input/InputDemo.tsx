import React from 'react';
import Input from './Input';

/**
 * A component to showcase and test all Input variations.
 */
export const InputDemo: React.FC = () => {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mt-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Input Component Showcase</h2>

      <div className="space-y-8">
        {/* Basic Types */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Core Types</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Email Address" type="email" placeholder="e.g. hello@example.com" />
            <Input label="Password" type="password" placeholder="Enter your password" />
            <Input label="Due Date" type="date" />
            <Input label="Task Priority Number" type="number" min="1" max="5" placeholder="1-5" />
          </div>
        </div>

        {/* Status States */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Status & Logic</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              label="Username" 
              required 
              placeholder="Pick a unique handle" 
            />
            <Input 
              label="Project Title" 
              error="Title is required to create a task" 
              defaultValue="Invalid project name"
            />
            <Input 
              label="Static Field" 
              disabled 
              defaultValue="This field is readonly"
            />
          </div>
        </div>

        {/* Icon Support */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Icon Support</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              label="Search" 
              placeholder="Search tasks..." 
              leftIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              } 
            />
            <Input 
              label="Your Profile" 
              defaultValue="senthi.kumar@example.com"
              rightIcon={
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              } 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default InputDemo;
