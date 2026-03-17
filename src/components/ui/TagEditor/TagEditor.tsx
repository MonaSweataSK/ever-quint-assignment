import React, { useState, useRef, type KeyboardEvent } from 'react';
import type { TagEditorProps } from '../../../types/TagEditor.type';

/**
 * A premium Tag Editor component.
 * Allows users to add tags by pressing Enter and remove them with a cross icon.
 */
export const TagEditor: React.FC<TagEditorProps> = ({
  tags,
  onChange,
  placeholder = 'Add a tag...',
  limit,
  label,
  error,
  required,
  disabled,
  className = '',
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    if (e.key === 'Enter') {
      e.preventDefault();
      const val = inputValue.trim();

      if (val && !tags.some(t => t.toLowerCase() === val.toLowerCase())) {
        if (!limit || tags.length < limit) {
          onChange([...tags, val]);
          setInputValue('');
        }
      }
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      // Remove last tag if backspace is pressed on empty input
      const newTags = [...tags];
      newTags.pop();
      onChange(newTags);
    }
  };

  const removeTag = (tagToRemove: string) => {
    if (disabled) return;
    onChange(tags.filter((t) => t !== tagToRemove));
  };

  const handleContainerClick = () => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  };

  // Base container styles mimicking a premium input
  const containerClasses = `
    group flex flex-wrap gap-2 items-center w-full min-h-[44px] 
    rounded-lg border px-3 py-1.5 transition-all duration-200 ease-in-out
    ${disabled ? 'bg-gray-50 cursor-not-allowed' : 'bg-white cursor-text'}
    ${error ? 'border-rose-500' : isFocused ? 'border-blue-500 ring-2 ring-blue-500/10' : 'border-gray-200 hover:border-gray-300'}
    ${className}
  `;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
          {label}
          {required && <span className="text-rose-500 text-xs">*</span>}
        </label>
      )}

      <div
        className={containerClasses}
        onClick={handleContainerClick}
        onFocus={() => !disabled && setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        {/* Render Tags */}
        {tags.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 text-xs font-medium animate-in zoom-in-95 duration-200"
          >
            {tag}
            {!disabled && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(tag);
                }}
                className="hover:bg-blue-100 p-0.5 rounded-full transition-colors"
                aria-label={`Remove ${tag}`}
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </span>
        ))}

        {/* Input Field */}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? placeholder : ''}
          disabled={disabled || (limit ? tags.length >= limit : false)}
          className={`
            flex-1 min-w-[120px] outline-none text-sm bg-transparent
            placeholder:text-gray-400 text-gray-900
            ${disabled ? 'cursor-not-allowed' : ''}
          `}
          autoComplete="off"
        />

        {/* Limit Indicator */}
        {limit && (
          <div className="ml-auto text-[10px] font-bold text-gray-400 uppercase tracking-wider tabular-nums">
            {tags.length} / {limit}
          </div>
        )}
      </div>

      {error && <p className="text-xs font-medium text-rose-500 mt-0.5">{error}</p>}
    </div>
  );
};

export default TagEditor;
