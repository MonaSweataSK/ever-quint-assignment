import React, { useState } from 'react';
import TagEditor from './TagEditor';

export const TagEditorDemo: React.FC = () => {
  const [basicTags, setBasicTags] = useState<string[]>(['React', 'TypeScript']);
  const [limitTags, setLimitTags] = useState<string[]>(['Design', 'Frontend']);
  const [emptyTags, setEmptyTags] = useState<string[]>([]);

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-12 bg-gray-50 min-h-screen">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Tag Editor Demo</h1>
        <p className="text-gray-500 text-lg">
          A premium tagging interface for intuitive categorization.
        </p>
      </header>

      {/* 1. Basic Usage */}
      <section className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-6">
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-gray-900">1. Basic Usage</h2>
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Pre-filled with initial values</p>
        </div>
        <TagEditor
          label="Interests"
          tags={basicTags}
          onChange={setBasicTags}
          placeholder="Add your interests..."
        />
        <div className="pt-2">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Raw State Output</p>
          <code className="block p-3 bg-gray-900 text-blue-300 rounded-lg text-xs font-mono">
            {JSON.stringify(basicTags)}
          </code>
        </div>
      </section>

      {/* 2. With Limit */}
      <section className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-6">
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-gray-900">2. Tag Limit</h2>
          <p className="text-xs text-amber-600 font-medium uppercase tracking-wide">Maximum 5 tags allowed</p>
        </div>
        <TagEditor
          label="Project Stack"
          tags={limitTags}
          onChange={setLimitTags}
          limit={5}
          placeholder="Limit reached..."
        />
      </section>

      {/* 3. Empty & Required */}
      <section className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-6">
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-gray-900">3. Status States</h2>
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Empty, Required, and Error states</p>
        </div>
        <div className="space-y-8">
          <TagEditor
            label="Empty Input"
            tags={emptyTags}
            onChange={setEmptyTags}
            placeholder="Type and hit Enter..."
          />
          
          <TagEditor
            label="Required Field"
            required
            tags={[]}
            onChange={() => {}}
            placeholder="This field shows a red asterisk"
          />

          <TagEditor
            label="Error State"
            tags={['Invalid Tag']}
            onChange={() => {}}
            error="This is an error message"
          />

          <TagEditor
            label="Disabled State"
            tags={['Immutable', 'Static']}
            onChange={() => {}}
            disabled
          />
        </div>
      </section>

      <footer className="pt-8 text-center border-t border-gray-200">
        <p className="text-sm text-gray-400 font-medium">
          Built with premium React design patterns.
        </p>
      </footer>
    </div>
  );
};

export default TagEditorDemo;
